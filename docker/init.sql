-- Creates the test database next to the main one (docker-compose runs this once).
CREATE DATABASE IF NOT EXISTS tiri_relay_test;
GRANT ALL ON tiri_relay_test.* TO 'tiri'@'%';
FLUSH PRIVILEGES;
