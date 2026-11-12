# Deploying Tiri Relay

One small Linux server runs three containers with Docker Compose:

| Container | Role |
|---|---|
| `caddy` | HTTPS on 443 with an automatic Let's Encrypt certificate; proxies the API and WebSocket |
| `relay` | This app (image `ghcr.io/boring-software-nation/tiri-relay`) |
| `mysql` | MySQL 8.4, data in a Docker volume |

GitHub Actions (`.github/workflows/relay.yml`) tests every pull request. On every push to `main` it builds and publishes the image and, once the deploy secrets are set, updates the server over SSH.

## 1. Server (Scaleway)

| | |
|---|---|
| Instance | **DEV1-S** (2 vCPU, 2 GB RAM), enough for the testnet phase. Move to PLAY2-NANO (4 GB) or PRO2 when real users arrive |
| Image | Ubuntu 24.04 LTS |
| Disk | 20 GB block volume (OS + Docker images + MySQL) |
| Region | fr-par (or nl-ams) |
| IP | Flexible IPv4 (so the address survives server replacement) |
| Security group | Inbound 22/tcp (only from your office/VPN IPs), 80/tcp, 443/tcp, 443/udp. Everything else closed |
| Backups | Daily snapshot of the volume (Scaleway snapshots), keep 7 |

DNS: an `A` record for the relay's host name (e.g. `relay.tiri.app`) pointing at the flexible IP. It must exist before the first start, or the certificate can't be issued.

## 2. One-time server setup

```bash
# As root on the new server
apt-get update && apt-get -y upgrade
curl -fsSL https://get.docker.com | sh          # Docker Engine + Compose plugin
adduser --disabled-password --gecos "" deploy
usermod -aG docker deploy
mkdir -p /opt/tiri && chown deploy:deploy /opt/tiri
```

Copy `deploy/docker-compose.yml`, `deploy/Caddyfile` and `deploy/relay.env.example` from this repo to `/opt/tiri/`, then:

```bash
cd /opt/tiri
mv relay.env.example relay.env && chmod 600 relay.env
nano relay.env          # set RELAY_DOMAIN and generate every secret: openssl rand -base64 48
docker compose up -d
docker compose logs -f relay     # wait for "Tiri Relay listening"
curl https://<RELAY_DOMAIN>/api/health
```

`/api/health` should answer `"status":"ok"`. `"degraded"` means the database works but the Filecoin network can't be reached; sign-in and sync still work.

## 3. Automatic deploys from GitHub

1. Create an SSH key pair just for deploys (on any machine): `ssh-keygen -t ed25519 -f tiri_deploy -N ""`. Append `tiri_deploy.pub` to `/home/deploy/.ssh/authorized_keys` on the server.
2. Get the server's host key: `ssh-keyscan <server-ip>`.
3. In GitHub → `Tiri-relay` → Settings → Environments → **New environment `production`** and add:

   | Kind | Name | Value |
   |---|---|---|
   | Secret | `DEPLOY_HOST` | server IP or host name |
   | Secret | `DEPLOY_USER` | `deploy` |
   | Secret | `DEPLOY_SSH_KEY` | contents of `tiri_deploy` (private key) |
   | Secret | `DEPLOY_KNOWN_HOSTS` | output of `ssh-keyscan` |
   | Variable | `RELAY_URL` | `https://<RELAY_DOMAIN>` (checked after each deploy) |

   Optionally require a reviewer on the environment, so each deploy waits for approval.
4. The image is published to `ghcr.io/boring-software-nation/tiri-relay`. If the package is private (GitHub → Packages → tiri-relay → settings), log the server in once: `docker login ghcr.io -u <github-user>` with a token that has `read:packages`.

From then on, merging to `main` runs the tests, publishes `:latest` and `:sha-<commit>`, and runs on the server:

```bash
cd /opt/tiri && docker compose pull relay && docker compose up -d
```

Database migrations run automatically when the relay starts.

## Rolling back

```bash
cd /opt/tiri
RELAY_IMAGE=ghcr.io/boring-software-nation/tiri-relay:sha-<previous-commit> docker compose up -d relay
```

## Operations

| Task | Command |
|---|---|
| Logs | `docker compose logs -f relay` |
| Restart | `docker compose restart relay` |
| Database shell | `docker compose exec mysql mysql -u root -p` |
| Database dump | `docker compose exec mysql sh -c 'mysqldump -u root -p"$MYSQL_ROOT_PASSWORD" tiri_relay' > backup.sql` |
| Change settings | edit `relay.env`, then `docker compose up -d` |

The relay stores only wallet addresses, encrypted file trees and sign-in challenges. It never holds file contents or keys, so nothing can be decrypted from the database, and losing it loses no files; still, back it up, because the trees are what keeps devices in sync.
