# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WebSS is a self-hostable screensharing platform built around private groups. Users create or join groups via invite link and screenshare via browser (WebRTC), desktop app (Electron), or OBS (RTMP). All groups are private — no public discovery, no friend system.

## Commands

```bash
bun run dev        # Start dev server (Vite + HonoX)
bun run build      # Build server bundle
bun run build --mode client  # Build client/hydration bundle
```

No test runner is configured yet.

## Architecture

### Framework: HonoX

HonoX is a file-based meta-framework on top of Hono. `app/index.ts` calls `createApp()` from `honox/server` — routing is auto-discovered from `app/routes/`.

- `app/routes/_renderer.tsx` — SSR layout wrapper using `@hono/react-renderer`. Wraps all pages in `<ThemeProvider>`.
- `app/routes/index.tsx` — pages use `createRoute(c => c.render(<JSX />, { title }))` pattern.
- `app/client.ts` — browser entry point; calls `honox/client`'s `createClient` to hydrate islands.

### Island Architecture (Client Components)

HonoX uses an "islands" pattern for client-side interactivity. Interactive components live in `app/client/` and are hydrated in the browser. Server-rendered components stay in `app/components/`. The `islandDir` is configured to `/app/client` in `vite.config.ts`.

> **Note:** `app/routes/_renderer.tsx` still imports from `@/islands/` — update to `@/client/` after renaming.

### Path Alias

`@/` resolves to `app/`. Configured in both `tsconfig.json` (`paths`) and `vite.config.ts` (`resolve.tsconfigPaths: true`).

### Two-Mode Vite Build

`vite.config.ts` branches on `mode`:
- Default (server): HonoX plugin + Tailwind + `@hono/vite-build`. SSR bundle. `ssr.external: ["react", "react-dom"]`.
- `client`: Rolldown builds `app/client.ts` → `static/client.js` for browser hydration.

### Config & Environment

`app/core/config.ts` validates env vars at startup with Zod. Required vars:

| Var | Description |
|-----|-------------|
| `APP_URL` | Public URL (must be a valid URL) |
| `HOST` | Bind host |
| `PORT` | Bind port (number) |
| `REDIS_URL` | Redis connection URL |
| `SECRET` | App secret, min 32 chars |

Fails fast with a parse error if any var is missing or invalid.

### Cache

`app/core/cache/index.ts` exports a Bun-native `RedisClient` instance (uses `bun`'s built-in Redis support, not `ioredis`).

### Database

Drizzle ORM with PostgreSQL. Schema at `app/core/drizzle/schema.ts` (not yet populated). Planned tables: `users`, `groups`, `groupMembers`, `streams`, `streamViewers`.

### Styling

Tailwind CSS v4 (via `@tailwindcss/vite` plugin). shadcn/ui components in `app/components/ui/`. Base UI (`@base-ui/react`) also available. `app/lib/utils.ts` exports `cn()` (clsx + tailwind-merge).

## Implementation Status

### Phase 1 (MVP — in progress)
- [ ] User registration/login (BetterAuth)
- [ ] Create private group + invite link
- [ ] Join group via invite link
- [ ] Browser WebRTC screenshare
- [ ] Stream start notifications (WebSocket broadcast)

### Phase 2
- [ ] Electron desktop app
- [ ] OBS RTMP ingest
- [ ] Multi-viewer SFU relay

### Phase 3
- [ ] Docker Compose
- [ ] Admin dashboard
- [ ] Rate limiting
