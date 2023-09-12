<h1 align="center">
     ✨ ARC Data Wallet 👛
</h1>
 
ARC Data Wallet is an easy way to use the SIA network for on-chain file storage with a ligt "wallet-like" browser extension. This solution enables private users to use the SIA storage network independently on any device without the need to download and sync the local SIA node. This project is developed under the SIA Foundation grant.

![siaDataWallet final](https://github.com/bsn-si/sia-datawallet-gateway/assets/98888366/6124bd98-29b4-482b-9001-bbfccb1687ba)

This repository contains the ARC Gateway, that receives chunked and encrypted files from a user’s ARC Data Wallet extension, collects them into a single file and sends to the remote RenterD node for storage in the SIA network.

## Disclaimer
Thу work is in progress. You can see progress reports [here](https://github.com/bsn-si/sia-datawallet-extension/tree/develop/grant_reports).

## How To & Dependencies

```bash
nvm use 19.2
npm run start:dev
```

```bash
npx swagger-typescript-api -p ./src/services/openapi.yml -o ./src/services -n api.ts --axios --extract-response-error --extract-request-body --extract-request-params
```

- test.key
- test.crt

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -keyout test.key -out test.crt

curl -I -k https://localhost:443/
```

## .env file

```bash
AUTH_SECRET=
API_PASSWORD=
API_HOST=http://127.0.0.1:9880
MIKRO_ORM_HOST=127.0.0.1
MIKRO_ORM_PORT=3306
MIKRO_ORM_USER=
MIKRO_ORM_PASSWORD=
MIKRO_ORM_DB_NAME=
```
## related repos
[The ARC data wallet browser extension](https://github.com/bsn-si/sia-datawallet-extension)
