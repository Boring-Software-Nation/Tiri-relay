import { config } from 'dotenv';
import { defineConfig } from '@mikro-orm/mysql';
import { Migrator } from '@mikro-orm/migrations';
import { User } from './user/user.entity';
import { Sync } from './sync/sync.entity';
import { AuthChallenge } from './auth/auth-challenge.entity';
import { Settings } from './settings/settings.entity';

config();

// Connection settings come from the environment: MIKRO_ORM_HOST, MIKRO_ORM_PORT,
// MIKRO_ORM_USER, MIKRO_ORM_PASSWORD, MIKRO_ORM_DB_NAME (see .env.example).
export default defineConfig({
  entities: [User, Sync, AuthChallenge, Settings],
  debug: process.env.MIKRO_ORM_DEBUG === 'true',
  // @ts-expect-error nestjs adapter option
  registerRequestContext: false,
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    snapshot: false,
  },
  extensions: [Migrator],
});
