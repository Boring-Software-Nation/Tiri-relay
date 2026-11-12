# Tiri Vault: Deployment and Build Guide

Nov 12, 2026 · @Alexey Vexin

One small Scaleway server (about €6/month) runs the Tiri relay; GitHub tests and deploys it on every merge to `main`, and builds the Windows installer on every change. The deployment files are in the repos: `Tiri-relay` PR #5 and `Tiri-vault-desktop` PR #7.

## At a glance

&#91;embedded content: deployment and build paths · relay and desktop app\]

The relay ships through the top path on every merge to `main`; the app is built along the bottom path and talks to the relay, and to Filecoin directly.

## 1. Server task for DevOps

Create one Scaleway instance that runs three Docker containers: Caddy (HTTPS), the relay and MySQL. The relay is light, so the smallest general-purpose instance is enough for the testnet phase.

| Item | Value |
| --- | --- |
| Instance | DEV1-S: 2 vCPU, 2 GB RAM, about €6/month (move to PLAY2-NANO, 4 GB, at real users) |
| OS | Ubuntu 24.04 LTS |
| Disk | 20 GB block volume |
| Region | fr-par (or nl-ams) |
| IP | Flexible IPv4, so the address survives a server rebuild |
| Security group, inbound | 22/tcp from office or VPN IPs only; 80/tcp; 443/tcp; 443/udp; everything else closed |
| Backups | Daily volume snapshot, keep 7 |
| DNS | `A` record, e.g. `relay.<your-domain>` → the flexible IP, created before first start |

One-time setup, as root on the server:

1. Install Docker and create the deploy user:
   - `curl -fsSL https://get.docker.com | sh`
   - `adduser --disabled-password --gecos "" deploy && usermod -aG docker deploy`
   - `mkdir -p /opt/tiri && chown deploy:deploy /opt/tiri`
2. Copy `deploy/docker-compose.yml`, `deploy/Caddyfile` and `deploy/relay.env.example` from the `Tiri-relay` repo into `/opt/tiri/`.
3. Rename `relay.env.example` to `relay.env`, `chmod 600` it, set `RELAY_DOMAIN` and generate every secret with `openssl rand -base64 48`.
4. Start it: `cd /opt/tiri && docker compose up -d`. The relay creates its database tables on first start.

Acceptance check: `curl https://relay.<your-domain>/api/health` answers `"status":"ok"`. `"degraded"` means the database works but the Filecoin network can't be reached; sign-in and sync still work. The full guide with day-to-day commands is `DEPLOY.md` in the relay repo.

## 2. CI/CD: deploying the relay from GitHub

The pipeline is already in the repo (`.github/workflows/relay.yml`) and passed its first run; DevOps only adds the server access below.

| When | What runs |
| --- | --- |
| Every pull request | Build, then 21 automated tests against a MySQL service |
| Every merge to `main` | Tests; Docker image published to `ghcr.io/boring-software-nation/tiri-relay` as `:latest` and `:sha-<commit>`; then SSH to the server, `docker compose pull && up -d`, and a health check |

Setup, once:

1. Create a deploy-only SSH key: `ssh-keygen -t ed25519 -f tiri_deploy -N ""`. Add `tiri_deploy.pub` to `/home/deploy/.ssh/authorized_keys` on the server.
2. In GitHub → `Tiri-relay` → Settings → Environments, create the environment `production` with these values (optionally require a reviewer, so each deploy waits for approval):

| Kind | Name | Value |
| --- | --- | --- |
| Secret | `DEPLOY_HOST` | Server IP or host name |
| Secret | `DEPLOY_USER` | `deploy` |
| Secret | `DEPLOY_SSH_KEY` | Contents of `tiri_deploy` (the private key) |
| Secret | `DEPLOY_KNOWN_HOSTS` | Output of `ssh-keyscan <server-ip>` |
| Variable | `RELAY_URL` | `https://relay.<your-domain>`, checked after each deploy |

3. If the image package on GitHub is private, log the server in once: `docker login ghcr.io` with a token that has `read:packages`. The repo is public, so the package normally is too.

Until the secrets exist, merges still publish the image and simply skip the deploy step, so merging is safe before the server is ready.

Rollback to an earlier version, on the server: `cd /opt/tiri && RELAY_IMAGE=ghcr.io/boring-software-nation/tiri-relay:sha-<previous-commit> docker compose up -d relay`.

## 3. Building the desktop app

The relay address and the Filecoin network are built into the app, so each build targets one relay. The build also writes that address into the app's security policy automatically.

| Setting | Value for the testnet phase |
| --- | --- |
| `VITE_API_HOST` | `https://relay.<your-domain>` |
| `VITE_WS_URL` | `wss://relay.<your-domain>` |
| `VITE_FILECOIN_NETWORK` | `calibration` (later `mainnet`) |
| `VITE_FILECOIN_RPC_URL` | Leave empty: defaults to the public Glif endpoint |

With GitHub Actions (recommended):

1. In GitHub → `Tiri-vault-desktop` → Settings → Secrets and variables → Actions → Variables, add the first three settings above.
2. Every pull request and every merge to `main` builds `TiriVault-Setup-<version>.exe`. Download it from the workflow run, under Artifacts.
3. To release a version: `npm version 0.3.0 --no-git-tag-version`, commit, then `git tag v0.3.0 && git push --follow-tags`. CI checks the tag matches `package.json` and creates a draft GitHub Release with the installer; review it and click Publish.

On a Windows PC (Node.js 20 or newer): `npm ci`, copy `.env.example` to `.env` and set the settings above, then `npm run build:win`. The installer lands in `release\<version>\`.

The installer is not code-signed yet, so Windows SmartScreen shows a warning that testers bypass with "More info → Run anyway". Before a public release, buy a code-signing certificate (Azure Trusted Signing or an EV certificate); the build signs automatically once it is configured. Details: `BUILD.md` in the desktop repo.

## Open decisions before go-live

- [ ] Relay host name (e.g. `relay.<your-domain>`): needed for DNS, `relay.env` and the desktop build settings.
- [ ] Merge `Tiri-relay` PR #5 (deployment files) and `Tiri-vault-desktop` PR #7 (wallet screens and release builds).
- [ ] Is `bsn.si` still ours? The app's support email is `tiri.support@bsn.si`.
- [ ] Who approves production deploys (reviewer on the GitHub `production` environment), if anyone.
- [ ] Code-signing certificate, before installers go to the public.

## Sources

- [Scaleway Virtual Instances pricing](https://www.scaleway.com/en/pricing/virtual-instances/): DEV1-S and PLAY2 specs and prices, read 12 Nov 2026.
