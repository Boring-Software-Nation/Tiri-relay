```bash
nvm use 19.2
npm run start:dev
```

```bash
npx swagger-typescript-api -p ./src/services/openapi.yml -o ./src/services -n api.ts --axios --extract-response-error --extract-request-body --extract-request-params
```

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -keyout test.key -out test.crt

curl -I -k https://localhost:443/
```
