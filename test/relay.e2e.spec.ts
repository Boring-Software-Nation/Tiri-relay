/**
 * End-to-end tests against a real MySQL/MariaDB database (TEST_DB_* env, default
 * tiri:tiri@127.0.0.1:3306/tiri_relay_test). The database is wiped before the run.
 */
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { MikroORM } from '@mikro-orm/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { io as ioClient, Socket } from 'socket.io-client';
import { privateKeyToAccount, generatePrivateKey, PrivateKeyAccount } from 'viem/accounts';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/main';
import { WebsocketServer } from '../src/ws.server';

// Well-known public test key (Hardhat/Foundry account #0). Never holds real funds.
const ALICE = privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80');

let app: INestApplication;
let http: any;
let baseUrl: string;

async function wipeDatabase() {
  const orm = await MikroORM.init((await import('../src/mikro-orm.config')).default);
  const conn = orm.em.getConnection();
  await conn.execute('set foreign_key_checks = 0');
  const tables: { t: string }[] = await conn.execute(
    'select table_name as t from information_schema.tables where table_schema = database()',
  );
  for (const { t } of tables) await conn.execute(`drop table if exists \`${t}\``);
  await conn.execute('set foreign_key_checks = 1');
  await orm.close(true);
}

beforeAll(async () => {
  await wipeDatabase();
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication<NestExpressApplication>({ bodyParser: false });
  configureApp(app);
  await app.init(); // runs the migrations
  await app.listen(0);
  http = app.getHttpServer();
  WebsocketServer.init(http);
  baseUrl = `http://127.0.0.1:${http.address().port}`;
});

afterAll(async () => {
  WebsocketServer.tryGetInstance()?.close();
  await app?.close();
});

async function signIn(account: PrivateKeyAccount, addressAsTyped: string = account.address) {
  const ch = await request(http).post('/api/auth/challenge').send({ address: addressAsTyped }).expect(200);
  const signature = await account.signMessage({ message: ch.body.message });
  const res = await request(http)
    .post('/api/auth/verify')
    .send({ address: addressAsTyped, nonce: ch.body.nonce, signature })
    .expect(200);
  return res.body as { token: string; expiresAt: string; user: { id: number; address: string } };
}

const b64 = (s: string) => Buffer.from(s).toString('base64');

describe('health', () => {
  it('reports the database and the configured Filecoin network', async () => {
    const res = await request(http).get('/api/health').expect(200);
    expect(res.body.database).toEqual({ ok: true });
    expect(res.body.filecoin).toMatchObject({ network: 'calibration', chainId: 314159 });
    // The network may be unreachable from the test machine: then the relay is "degraded", not "down".
    expect(['ok', 'degraded']).toContain(res.body.status);
  });
});

describe('wallet sign-in', () => {
  it('issues an EIP-4361 style challenge for a valid address', async () => {
    const res = await request(http).post('/api/auth/challenge').send({ address: ALICE.address }).expect(200);
    expect(res.body.message).toContain('relay.test wants you to sign in with your Ethereum account:');
    expect(res.body.message).toContain(ALICE.address);
    expect(res.body.message).toContain('Chain ID: 314159');
    expect(res.body.message).toContain(`Nonce: ${res.body.nonce}`);
    expect(new Date(res.body.expiresAt).getTime()).toBeGreaterThan(Date.now());
  });

  it('rejects an invalid address', async () => {
    await request(http).post('/api/auth/challenge').send({ address: '0x1234' }).expect(400);
    await request(http).post('/api/auth/challenge').send({}).expect(400);
  });

  it('signs in with a valid signature and creates the user once', async () => {
    const first = await signIn(ALICE);
    expect(first.user.address).toBe(ALICE.address);
    expect(first.token).toMatch(/^ey/);
    const second = await signIn(ALICE);
    expect(second.user.id).toBe(first.user.id);

    const me = await request(http).get('/api/auth/me').set('Authorization', `Bearer ${first.token}`).expect(200);
    expect(me.body).toEqual({ id: first.user.id, address: ALICE.address });
  });

  it('accepts a lowercase address and stores the checksummed form', async () => {
    const s = await signIn(ALICE, ALICE.address.toLowerCase());
    expect(s.user.address).toBe(ALICE.address);
  });

  it('rejects a signature from a different wallet', async () => {
    const mallory = privateKeyToAccount(generatePrivateKey());
    const ch = await request(http).post('/api/auth/challenge').send({ address: ALICE.address }).expect(200);
    const signature = await mallory.signMessage({ message: ch.body.message });
    const res = await request(http)
      .post('/api/auth/verify')
      .send({ address: ALICE.address, nonce: ch.body.nonce, signature })
      .expect(401);
    expect(res.body.message).toMatch(/does not match/);
  });

  it('rejects a signature over a different message', async () => {
    const ch = await request(http).post('/api/auth/challenge').send({ address: ALICE.address }).expect(200);
    const signature = await ALICE.signMessage({ message: ch.body.message + ' tampered' });
    await request(http).post('/api/auth/verify').send({ address: ALICE.address, nonce: ch.body.nonce, signature }).expect(401);
  });

  it('does not let a challenge be used twice', async () => {
    const ch = await request(http).post('/api/auth/challenge').send({ address: ALICE.address }).expect(200);
    const signature = await ALICE.signMessage({ message: ch.body.message });
    const body = { address: ALICE.address, nonce: ch.body.nonce, signature };
    await request(http).post('/api/auth/verify').send(body).expect(200);
    const again = await request(http).post('/api/auth/verify').send(body).expect(401);
    expect(again.body.message).toMatch(/already used/);
  });

  it("does not accept a challenge issued for another address", async () => {
    const bob = privateKeyToAccount(generatePrivateKey());
    const ch = await request(http).post('/api/auth/challenge').send({ address: ALICE.address }).expect(200);
    const signature = await bob.signMessage({ message: ch.body.message });
    await request(http).post('/api/auth/verify').send({ address: bob.address, nonce: ch.body.nonce, signature }).expect(401);
  });

  it('rejects an expired challenge', async () => {
    const ch = await request(http).post('/api/auth/challenge').send({ address: ALICE.address }).expect(200);
    const orm = app.get(MikroORM);
    await orm.em.getConnection().execute('update auth_challenge set expires_at = ? where nonce = ?', [
      new Date(Date.now() - 1000),
      ch.body.nonce,
    ]);
    const signature = await ALICE.signMessage({ message: ch.body.message });
    const res = await request(http)
      .post('/api/auth/verify')
      .send({ address: ALICE.address, nonce: ch.body.nonce, signature })
      .expect(401);
    expect(res.body.message).toMatch(/expired/);
  });

  it('rejects missing, malformed and forged session tokens', async () => {
    await request(http).get('/api/auth/me').expect(401);
    await request(http).get('/api/auth/me').set('Authorization', 'Bearer not-a-token').expect(401);
    const jwt = await import('jsonwebtoken');
    const forged = jwt.sign({ id: 1, address: ALICE.address }, 'some-other-secret');
    await request(http).get('/api/auth/me').set('Authorization', `Bearer ${forged}`).expect(401);
  });
});

describe('versioned sync tree', () => {
  let token: string;
  const auth = () => ({ Authorization: `Bearer ${token}` });

  beforeAll(async () => {
    token = (await signIn(privateKeyToAccount(generatePrivateKey()))).token;
  });

  it('requires sign-in', async () => {
    await request(http).get('/api/sync/tree').expect(401);
    await request(http).put('/api/sync/tree').send({ tree: b64('x'), baseVersion: 0, clientId: 'a' }).expect(401);
  });

  it('starts empty at version 0', async () => {
    const res = await request(http).get('/api/sync/tree').set(auth()).expect(200);
    expect(res.body).toEqual({ tree: null, version: 0, updatedAt: null });
  });

  it('stores the first tree as version 1, then accepts updates based on the current version', async () => {
    const v1 = await request(http).put('/api/sync/tree').set(auth()).send({ tree: b64('tree-1'), baseVersion: 0, clientId: 'laptop' }).expect(200);
    expect(v1.body).toEqual({ version: 1 });
    const v2 = await request(http).put('/api/sync/tree').set(auth()).send({ tree: b64('tree-2'), baseVersion: 1, clientId: 'laptop' }).expect(200);
    expect(v2.body).toEqual({ version: 2 });
    const got = await request(http).get('/api/sync/tree').set(auth()).expect(200);
    expect(got.body.version).toBe(2);
    expect(Buffer.from(got.body.tree, 'base64').toString()).toBe('tree-2');
  });

  it('rejects an update based on an outdated version with 409 and the current version', async () => {
    const res = await request(http).put('/api/sync/tree').set(auth()).send({ tree: b64('stale'), baseVersion: 1, clientId: 'desktop' }).expect(409);
    expect(res.body.currentVersion).toBe(2);
    const first = await request(http).put('/api/sync/tree').set(auth()).send({ tree: b64('again'), baseVersion: 0, clientId: 'desktop' }).expect(409);
    expect(first.body.currentVersion).toBe(2);
    const got = await request(http).get('/api/sync/tree').set(auth()).expect(200);
    expect(Buffer.from(got.body.tree, 'base64').toString()).toBe('tree-2');
  });

  it('lets exactly one of several simultaneous updates win', async () => {
    const attempts = await Promise.all(
      ['a', 'b', 'c', 'd', 'e'].map((c) =>
        request(http).put('/api/sync/tree').set(auth()).send({ tree: b64(`from-${c}`), baseVersion: 2, clientId: c }),
      ),
    );
    const statuses = attempts.map((r) => r.status).sort();
    expect(statuses).toEqual([200, 409, 409, 409, 409]);
    const got = await request(http).get('/api/sync/tree').set(auth()).expect(200);
    expect(got.body.version).toBe(3);
  });

  it("keeps each user's tree separate", async () => {
    const other = (await signIn(privateKeyToAccount(generatePrivateKey()))).token;
    const res = await request(http).get('/api/sync/tree').set({ Authorization: `Bearer ${other}` }).expect(200);
    expect(res.body.version).toBe(0);
  });

  it('validates the request', async () => {
    await request(http).put('/api/sync/tree').set(auth()).send({ tree: b64('x'), clientId: 'a' }).expect(400);
    await request(http).put('/api/sync/tree').set(auth()).send({ tree: b64('x'), baseVersion: -1, clientId: 'a' }).expect(400);
    await request(http).put('/api/sync/tree').set(auth()).send({ tree: b64('x'), baseVersion: 3 }).expect(400);
    await request(http).put('/api/sync/tree').set(auth()).send({ tree: '', baseVersion: 3, clientId: 'a' }).expect(400);
  });

  it('rejects a tree over the size limit with 413', async () => {
    const big = Buffer.alloc(5000, 1).toString('base64'); // limit is 4096 in tests
    await request(http).put('/api/sync/tree').set(auth()).send({ tree: big, baseVersion: 3, clientId: 'a' }).expect(413);
  });
});

describe('change notifications (WebSocket)', () => {
  const sockets: Socket[] = [];
  afterAll(() => sockets.forEach((s) => s.close()));

  function connect(token?: string): Promise<Socket> {
    return new Promise((resolve, reject) => {
      const s = ioClient(baseUrl, { auth: token ? { token } : {}, transports: ['websocket'], reconnection: false });
      sockets.push(s);
      s.on('connect', () => resolve(s));
      s.on('connect_error', (e) => reject(e));
    });
  }

  it('refuses connections without a valid session token', async () => {
    await expect(connect()).rejects.toThrow(/unauthorized/);
    await expect(connect('garbage')).rejects.toThrow(/unauthorized/);
  });

  it("notifies only the same user's devices when a new tree version is stored", async () => {
    const user = await signIn(privateKeyToAccount(generatePrivateKey()));
    const stranger = await signIn(privateKeyToAccount(generatePrivateKey()));
    const desktop = await connect(user.token);
    const strangerSocket = await connect(stranger.token);

    const strangerEvents: unknown[] = [];
    strangerSocket.on('treeUpdated', (e) => strangerEvents.push(e));
    const received = new Promise((resolve) => desktop.once('treeUpdated', resolve));

    await request(http)
      .put('/api/sync/tree')
      .set({ Authorization: `Bearer ${user.token}` })
      .send({ tree: b64('t'), baseVersion: 0, clientId: 'laptop-1' })
      .expect(200);

    await expect(received).resolves.toEqual({ clientId: 'laptop-1', version: 1 });
    await new Promise((r) => setTimeout(r, 200));
    expect(strangerEvents).toEqual([]);
  });
});
