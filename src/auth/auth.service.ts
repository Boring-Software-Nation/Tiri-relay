import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import { getAddress, isAddress, verifyMessage } from 'viem';
import { AuthChallenge } from './auth-challenge.entity';
import { User } from '../user/user.entity';
import { AUTH_SECRET, CHALLENGE_TTL_SECONDS, RELAY_DOMAIN, SESSION_TTL_SECONDS } from '../config';
import { ChainService } from '../chain/chain.service';

export interface SessionClaims {
  /** User id */
  id: number;
  /** Checksummed wallet address */
  address: string;
}

/**
 * Wallet sign-in, following the "Sign-In with Ethereum" message format (EIP-4361).
 *
 * 1. The app asks for a challenge for its wallet address.
 * 2. The wallet signs the challenge text (personal_sign, EIP-191). No transaction, no fee.
 * 3. The relay checks the signature locally (no network call) and issues a session token.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private readonly chain: ChainService,
  ) {}

  async createChallenge(rawAddress: string): Promise<{ message: string; nonce: string; expiresAt: string }> {
    const address = this.normalizeAddress(rawAddress);
    const nonce = randomBytes(16).toString('hex');
    const issuedAt = new Date();
    const expiresAt = new Date(issuedAt.getTime() + CHALLENGE_TTL_SECONDS * 1000);

    const message = [
      `${RELAY_DOMAIN} wants you to sign in with your Ethereum account:`,
      address,
      '',
      'Sign in to Tiri Vault. This only proves you own this wallet: it sends no transaction and costs nothing.',
      '',
      `URI: tiri://${RELAY_DOMAIN}`,
      'Version: 1',
      `Chain ID: ${this.chain.chainId}`,
      `Nonce: ${nonce}`,
      `Issued At: ${issuedAt.toISOString()}`,
      `Expiration Time: ${expiresAt.toISOString()}`,
    ].join('\n');

    const challenge = new AuthChallenge();
    challenge.nonce = nonce;
    challenge.address = address;
    challenge.message = message;
    challenge.expiresAt = expiresAt;
    await this.em.persistAndFlush(challenge);

    return { message, nonce, expiresAt: expiresAt.toISOString() };
  }

  async verify(
    rawAddress: string,
    nonce: string,
    signature: string,
  ): Promise<{ token: string; expiresAt: string; user: { id: number; address: string } }> {
    const address = this.normalizeAddress(rawAddress);
    if (typeof nonce !== 'string' || typeof signature !== 'string' || !/^0x[0-9a-fA-F]+$/.test(signature)) {
      throw new BadRequestException('nonce and signature are required');
    }

    const em = this.em.fork();
    const challenge = await em.findOne(AuthChallenge, { nonce });
    const now = new Date();
    if (!challenge || challenge.address !== address) {
      throw new UnauthorizedException('Unknown sign-in challenge');
    }
    if (challenge.usedAt) {
      throw new UnauthorizedException('This sign-in challenge was already used');
    }
    if (challenge.expiresAt.getTime() < now.getTime()) {
      throw new UnauthorizedException('This sign-in challenge has expired');
    }

    let valid = false;
    try {
      // Pure cryptography (ecrecover); no network call.
      valid = await verifyMessage({ address, message: challenge.message, signature: signature as `0x${string}` });
    } catch {
      valid = false;
    }
    if (!valid) {
      throw new UnauthorizedException('Signature does not match this wallet');
    }

    // Mark the challenge used. The conditional update makes a replay race impossible.
    const marked = await em.nativeUpdate(AuthChallenge, { id: challenge.id, usedAt: null }, { usedAt: now });
    if (marked !== 1) {
      throw new UnauthorizedException('This sign-in challenge was already used');
    }

    let user = await em.findOne(User, { address });
    if (!user) {
      user = new User(address);
      em.persist(user);
    }
    user.lastLoginAt = now;
    await em.flush();

    const claims: SessionClaims = { id: user.id, address: user.address };
    const token = jwt.sign(claims, AUTH_SECRET, { algorithm: 'HS256', expiresIn: SESSION_TTL_SECONDS });
    const expiresAt = new Date(now.getTime() + SESSION_TTL_SECONDS * 1000).toISOString();

    // Housekeeping: drop challenges that expired more than a day ago.
    await em.nativeDelete(AuthChallenge, { expiresAt: { $lt: new Date(now.getTime() - 24 * 3600 * 1000) } });

    return { token, expiresAt, user: { id: user.id, address: user.address } };
  }

  /** Verifies a session token and returns its claims, or throws. */
  static verifyToken(token: string): SessionClaims {
    const decoded = jwt.verify(token, AUTH_SECRET, { algorithms: ['HS256'] }) as jwt.JwtPayload & SessionClaims;
    if (typeof decoded.id !== 'number' || typeof decoded.address !== 'string') {
      throw new Error('Malformed session token');
    }
    return { id: decoded.id, address: decoded.address };
  }

  private normalizeAddress(raw: string): `0x${string}` {
    if (typeof raw !== 'string' || !isAddress(raw, { strict: false })) {
      throw new BadRequestException('A valid wallet address (0x…) is required');
    }
    return getAddress(raw);
  }
}
