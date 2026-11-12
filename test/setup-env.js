// Test environment. Runs before any module is loaded, so src/config.ts picks these up.
// Needs a MySQL/MariaDB database the tests may wipe (see README, "Tests").
process.env.AUTH_SECRET = process.env.TEST_AUTH_SECRET || 'test-secret-not-for-production';
process.env.MIKRO_ORM_HOST = process.env.TEST_DB_HOST || '127.0.0.1';
process.env.MIKRO_ORM_PORT = process.env.TEST_DB_PORT || '3306';
process.env.MIKRO_ORM_USER = process.env.TEST_DB_USER || 'tiri';
process.env.MIKRO_ORM_PASSWORD = process.env.TEST_DB_PASSWORD || 'tiri';
process.env.MIKRO_ORM_DB_NAME = process.env.TEST_DB_NAME || 'tiri_relay_test';
process.env.MAX_TREE_BYTES = '4096';
process.env.FILECOIN_NETWORK = 'calibration';
process.env.RELAY_DOMAIN = 'relay.test';
