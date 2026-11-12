# Tiri Relay container image.
#   docker build -t tiri-relay .
#   docker run --env-file relay.env -p 3003:3003 tiri-relay

FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund
COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src
RUN npx nest build && npm prune --omit=dev --legacy-peer-deps

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3003 \
    USE_SSL=false
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
# The feedback email template is read from src/ at runtime.
COPY --from=build /app/src/email/template ./src/email/template
USER node
EXPOSE 3003
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3003/api/health >/dev/null || exit 1
# Applies database migrations on start, then serves the API and the WebSocket.
CMD ["node", "dist/main.js"]
