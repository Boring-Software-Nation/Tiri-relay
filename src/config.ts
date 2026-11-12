import { config } from 'dotenv';

config();

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable ${name}. See .env.example.`);
  }
  return value;
}

/** Secret used to sign session tokens (JWT, HS256). Long random string. */
export const AUTH_SECRET = required('AUTH_SECRET');

/** How long a session token stays valid. */
export const SESSION_TTL_SECONDS = Number(process.env.SESSION_TTL_SECONDS ?? 30 * 24 * 3600);

/** How long a sign-in challenge can be used. */
export const CHALLENGE_TTL_SECONDS = Number(process.env.CHALLENGE_TTL_SECONDS ?? 5 * 60);

/** Name shown in the sign-in message the wallet signs (EIP-4361 "domain"). */
export const RELAY_DOMAIN = process.env.RELAY_DOMAIN ?? 'relay.tiri.local';

/** HTTP port when USE_SSL is false. */
export const PORT = Number(process.env.PORT ?? 3003);

export const USE_SSL = process.env.USE_SSL ?? 'false';

/** Largest encrypted file tree accepted, in bytes (the column is MEDIUMBLOB, 16 MiB). */
export const MAX_TREE_BYTES = Number(process.env.MAX_TREE_BYTES ?? 8 * 1024 * 1024);

/** Filecoin network the relay reads from: calibration (testnet) or mainnet. */
export const FILECOIN_NETWORK = (process.env.FILECOIN_NETWORK ?? 'calibration') as 'calibration' | 'mainnet';

/** JSON-RPC endpoint. Defaults to the public Glif endpoint of the chosen network. */
export const FILECOIN_RPC_URL =
  process.env.FILECOIN_RPC_URL ??
  (FILECOIN_NETWORK === 'mainnet' ? 'https://api.node.glif.io/rpc/v1' : 'https://api.calibration.node.glif.io/rpc/v1');

export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_PORT;
export const MAIL_ADDRESS = process.env.MAIL_ADDRESS;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
export const MAIL_TO = process.env.MAIL_TO;
