import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';
import * as fs from 'fs';
import spdy from 'spdy';
import { AppModule } from './app.module';
import { MAX_TREE_BYTES, PORT, USE_SSL } from './config';
import { WebsocketServer } from './ws.server';

/** Shared setup for the HTTP app; also used by the tests. */
export function configureApp(app: INestApplication) {
  app.setGlobalPrefix('api');
  // The encrypted tree is sent as base64 (≈4/3 of its size) inside JSON.
  (app as NestExpressApplication).useBodyParser('json', { limit: Math.ceil(MAX_TREE_BYTES * 1.4) + 1024 });

  const options = new DocumentBuilder()
    .setTitle('Tiri Relay API')
    .setDescription('Wallet sign-in, encrypted sync tree and change notifications for Tiri Vault')
    .setVersion('2.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('/docs', app, SwaggerModule.createDocument(app, options));
}

async function bootstrap() {
  if (USE_SSL === 'false') {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true, bodyParser: false });
    configureApp(app);
    WebsocketServer.init(app.getHttpServer());
    await app.listen(PORT);
    console.log(`Tiri Relay listening on http://localhost:${PORT} (API docs at /docs)`);
  } else {
    const expressApp = express();
    const server = spdy.createServer(
      { key: fs.readFileSync('./test.key'), cert: fs.readFileSync('./test.crt') },
      expressApp,
    );
    server.setTimeout(1000 * 60 * 30);

    const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(expressApp), {
      cors: true,
      bodyParser: false,
    });
    configureApp(app);
    WebsocketServer.init(server as any);
    await app.init();
    server.listen(443);
    console.log('Tiri Relay listening on https://localhost:443 (API docs at /docs)');
  }
}

if (require.main === module) {
  bootstrap().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
