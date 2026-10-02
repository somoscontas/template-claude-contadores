# syntax=docker/dockerfile:1

###############################################################################
# Bambu — imagen única que sirve frontend + backend en el mismo puerto.
# El backend Hono compila el frontend a estáticos y los sirve junto a la API,
# por lo que NO se necesita nginx ni ningún proxy inverso.
###############################################################################

FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm" \
    PATH="/pnpm:$PATH"
# git: requerido por el script `prepare` del root (vp config).
# ca-certificates: requerido por el cliente HTTP de vite-plus (vp build).
RUN apt-get update \
 && apt-get install -y --no-install-recommends git ca-certificates \
 && rm -rf /var/lib/apt/lists/*
# pnpm gestionado vía corepack, misma versión que packageManager en package.json
RUN corepack enable && corepack prepare pnpm@11.7.0 --activate
WORKDIR /app

# ---------------------------------------------------------------------------
# 1) Dependencias — capa cacheable con todos los manifests del workspace
# ---------------------------------------------------------------------------
FROM base AS deps
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/design-system/package.json ./packages/design-system/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ---------------------------------------------------------------------------
# 2) Build — compila design-system y frontend (estáticos en apps/frontend/dist)
# ---------------------------------------------------------------------------
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=deps /app/apps/frontend/node_modules ./apps/frontend/node_modules
COPY --from=deps /app/packages/design-system/node_modules ./packages/design-system/node_modules
COPY . .
RUN pnpm --filter @bambu/design-system build \
 && pnpm --filter frontend build

# ---------------------------------------------------------------------------
# 3) Runtime — un solo proceso Node sirviendo front + API
# ---------------------------------------------------------------------------
FROM base AS runtime
ENV NODE_ENV=production \
    SERVE_STATIC=true \
    PORT=3000 \
    DATABASE_URL=file:/app/data/db/bambu.db

COPY --from=build /app ./

# Directorio de datos (SQLite) — montado como volumen en docker-compose
RUN mkdir -p /app/data/db

WORKDIR /app/apps/backend
EXPOSE 3000

# Aplica migraciones de Drizzle y arranca el servidor Hono.
CMD ["sh", "-c", "pnpm exec drizzle-kit migrate && pnpm exec tsx src/index.ts"]
