# Stage 1: Install dependencies
FROM oven/bun:1.3.5-alpine AS deps
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Stage 2: Build the Astro site
FROM oven/bun:1.3.5-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Stage 3: Production runtime
FROM node:22-alpine AS runtime
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

ENV HOST=0.0.0.0
ENV PORT=4326
EXPOSE 4326

CMD ["node", "./dist/server/entry.mjs"]
