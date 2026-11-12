![image](https://github.com/user-attachments/assets/023f10dc-3d8e-4f63-b492-873fd884b3af)

# About Tiri Vault

Tiri Vault is a next-generation Web3 storage platform designed to merge decentralization, privacy, and usability into a seamless and intuitive experience. Built for modern workflows, Tiri Vault enables real-time syncing, private collaboration, and smart contract integration, all while ensuring user sovereignty over their data.

Decentralized file storage solutions have emerged as a promising alternative to traditional cloud platforms, offering stronger privacy, security, and cost-efficiency. Unlike centralized storage, Web3 solutions distribute data across a global network, preventing single points of failure and enhancing data resilience. However, despite these advantages, most decentralized storage networks are designed primarily for infrastructure providers (IaaS) and corporate users, rather than private individuals. As a result, retail adoption remains low due to several usability challenges.

Tiri Vault was conceived as a solution that preserves decentralization and privacy while introducing familiar workflows and use cases that users expect. Our goal is to transform decentralized storage into a true workspace, simplifying onboarding and UX, unifying storage management across multiple Web3 platforms, and enabling privacy-first collaboration services. By bridging the gap between decentralized security and traditional usability, Tiri Vault redefines how Web3 storage can be used seamlessly and efficiently.

Tiri Vault offers a solution to integrate a hybrid architecture that combines decentralized blockchain-based storage with off-chain real-time synchronization mechanisms.

## How Tiri Vault implements real-time file access in decentralized networks

<b>Zero-Knowledge Change Tracking:</b> Tiri Relay maintains a user’s hierarchical file/folder tree structure, ensuring efficient navigation and organization of stored data. This tree structure is fully encrypted on the front-end side with a user’s public key, meaning that even Tiri Relay can not see filenames, paths, file structures, or contents. Changes to files or folders modify the Merkle tree hash, which serves as a cryptographic fingerprint of the entire file system. Zero-knowledge proofs allow user devices to verify that a change has occurred (e.g., a file was updated, renamed, or moved) without revealing the actual modifications and enable synchronization while maintaining full privacy.

<b>WebSockets for Instant Synchronization:</b> Tiri Vault employs an off-chain caching layer on a local user device that allows instant updates to files and uses Tiri Relay to commit the latest file versions to the decentralized storage network. Tiri Relay utilizes WebSockets to ensure real-time synchronization across multiple devices. Users see changes reflected instantly.

<b>Hash Commitments for Integrity Checks:</b> To maintain trust and verify file authenticity without storing every update on-chain, Tiri Vault uses hash commitments. This means that while the files remain mutable in the short term, their integrity is cryptographically verified before finalizing on decentralized storage.

Below is an overview of how a file is processed when added to a Tiri-synced local folder:

![image](https://github.com/user-attachments/assets/4fecc124-a521-44fd-b7e9-d3821891dfde)

1. Detecting File Changes & Updating the FileTreeModel: when a user adds a new file to their Tiri-synced local folder, the Tiri Vault LocalFilesWatcher detects the change and updates the FileTreeModel, a structured representation of the user's files and folders.
2. Requesting the Last Saved FileTreeModel Hash from Tiri Relay: the Tiri App queries the Tiri Relay for the latest saved FileTreeModel hash to check for any changes. If this is the first synchronization, there is no stored FileTreeModel, so the newly generated model is set as the actual one. If a hash exists, the Tiri App compares the retrieved hash with the hash of the new FileTreeModel.
3. Resolving Differences Between Local and Stored File Trees: if the hashes don’t match, this means changes have occurred. The Tiri App then downloads the last stored FileTreeModel from Tiri Relay, decrypts it using the user’s private key, compares it to the new FileTreeModel and identifies four key differences (diffs):
- Upload → Files that need to be uploaded to storage.
- Remove → Files that need to be deleted from storage.
- Download → Files that need to be downloaded to the local device.
- LocalRemove → Files that need to be deleted from the local device.  
Then it merges the changes and writes a new, updated FileTreeModel.
4. Processing File Synchronization: to ensure consistency and avoid conflicts, the Tiri App applies changes in a strict sequence: Remove → Upload → LocalRemove → Download.
5. Updating FileTreeModel on Tiri Relay: once all file operations are successfully completed, the merged FileTreeModel is encrypted with the user’s public keyand uploaded to the Tiri Relay, replacing the previous version.
6. Notifying All Devices for Synchronization: Tiri Relay operates a WebSocket server that actively notifies all connected user devices whenever a new FileTreeModel hash is saved. When a device receives this notification, it requests the updated FileTreeModel, decrypts it, and applies the necessary changes.
 
This ensures that all user devices remain in sync, providing a seamless and decentralized file collaboration experience.

# Tiri Relay

This repository contains the Tiri Relay server.
Related repo: [Tiri Vault Desktop](https://github.com/Boring-Software-Nation/Tiri-vault-desktop)

> **Status:** Tiri Vault is moving from Sia to [Filecoin Onchain Cloud](https://docs.filecoin.cloud/). The relay no longer handles any file data: devices store encrypted files directly with Filecoin storage providers, paid from the user's own wallet.

## What the relay does

| | |
|---|---|
| **Wallet sign-in** | Users are identified by their wallet address. The app signs a one-time challenge ([EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) format, no transaction, no fee); the relay checks the signature locally and issues a session token. No passwords or emails. |
| **Encrypted file tree** | Stores each user's encrypted file tree with a **version number**. An update is accepted only if it is based on the current version (compare-and-swap); otherwise `409` with `currentVersion`, and the device merges and retries. The relay can't read the tree. |
| **Change notifications** | Socket.IO: a device connects with its session token and receives `treeUpdated { clientId, version }` when another device stores a new version. |
| **Filecoin network** | Read-only connection (Calibration testnet or mainnet), checked by `/api/health`. Used by billing (coming next); sign-in and sync don't need it. |

## Requirements

- Node.js 20 or newer
- MySQL 8 or MariaDB 10.6+ (`docker compose up -d` starts one with the right databases)

## Run locally

```bash
docker compose up -d          # MySQL on 127.0.0.1:3306, databases tiri_relay and tiri_relay_test
cp .env.example .env          # then set AUTH_SECRET (the file says how to generate one)
npm install
npm run build
npm run start:prod            # or: npm run start:dev  (watch mode)
```

The relay applies database migrations on start. Then:

- API: `http://localhost:3003/api`
- API docs (Swagger): `http://localhost:3003/docs`
- Health: `curl http://localhost:3003/api/health`

For HTTPS on port 443 set `USE_SSL=true` and provide `test.key` / `test.crt`:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -keyout test.key -out test.crt
```

## API

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `POST` | `/api/auth/challenge` | – | `{ address }` → `{ message, nonce, expiresAt }`; the wallet signs `message` |
| `POST` | `/api/auth/verify` | – | `{ address, nonce, signature }` → `{ token, expiresAt, user }` |
| `GET` | `/api/auth/me` | Bearer | The signed-in wallet |
| `GET` | `/api/sync/tree` | Bearer | `{ tree (base64) \| null, version, updatedAt }`; version 0 = no tree yet |
| `PUT` | `/api/sync/tree` | Bearer | `{ tree, baseVersion, clientId }` → `{ version }`, or `409 { currentVersion }` |
| `GET` | `/api/health` | – | Database and Filecoin network status |
| `GET` | `/api/settings/version` | – | Latest desktop app version |
| `POST` | `/api/mail/feedback` | – | In-app feedback by email |

Socket.IO: connect with `auth: { token }`; event `treeUpdated { clientId, version }`.

### Signing in from a client (viem)

```ts
const { message, nonce } = await post('/api/auth/challenge', { address: account.address })
const signature = await account.signMessage({ message })
const { token } = await post('/api/auth/verify', { address: account.address, nonce, signature })
// then: Authorization: Bearer <token>
```

## Tests

The tests run against a real database that they wipe: by default `tiri:tiri@127.0.0.1:3306/tiri_relay_test` (override with `TEST_DB_HOST`, `TEST_DB_PORT`, `TEST_DB_USER`, `TEST_DB_PASSWORD`, `TEST_DB_NAME`).

```bash
docker compose up -d
npm test
```

## Upgrading an existing Sia-era database

The migration `Migration20261112000000` renames the old `user` and `sync` tables to `legacy_user` and `legacy_sync` instead of deleting them, because old accounts (a hash of a Sia seed) can't be mapped to wallet addresses. **`legacy_user.pay_wallet_seed` contains Sia seeds in plain text**: recover anything you need from it, then drop both legacy tables. `npm run migration:down` restores the old tables.
