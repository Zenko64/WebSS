
# WebScreenShare

WebSS (WebScreenShare) is a self-hostable screensharing platform for private groups. Users create or join groups via invite link and screenshare via browser (WebRTC), desktop app (Electron), or OBS (RTMP). All groups are private—no public discovery, no friend system.

## Getting Started

```bash
bun install
bun run dev        # Start dev server
```

Environment variables required:
- `APP_URL` — public URL (e.g., https://webss.example.com)
- `HOST` / `PORT` — server bind address
- `REDIS_URL` — Redis connection URL
- `SECRET` — 32+ character app secret

## Directory Structure

```
app/
├── core/
│   ├── config.ts        — Zod-validated env vars
│   ├── cache/           — Redis client (Bun native)
│   └── drizzle/         — Database schema & queries (PostgreSQL)
├── routes/              — File-based routing (HonoX auto-discovers)
│   ├── _renderer.tsx    — SSR layout wrapper (all pages wrapped here)
│   └── index.tsx        — Home page example
├── client/              — Island components (hydrated in browser)
│   └── providers/       — ThemeProvider, etc.
├── components/
│   ├── ui/              — shadcn/ui components
│   └── [other]          — Server-rendered components
├── lib/                 — Utilities (cn, etc.)
├── assets/              — CSS, images
├── client.ts            — Browser hydration entry point
├── index.ts             — App entry (creates HonoX app)
└── renderer.tsx         — Global React context setup
```

### Key Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Build config (two modes: server + client) |
| `tsconfig.json` | TypeScript config + path aliases (`@/` → `app/`) |
| `app/routes/_renderer.tsx` | SSR layout; wraps all pages in ThemeProvider |
| `app/client.ts` | Browser-side hydration using honox/client |
| `app/core/config.ts` | Environment validation (Zod) |

## Tech Stack

- **Framework:** HonoX (file-based routing) + Hono + React 19
- **Runtime:** Bun (native Redis, web APIs)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Database:** PostgreSQL + Drizzle ORM
- **Auth:** BetterAuth (planned)
- **Streaming:** WebRTC (P2P) + RTMP (OBS) + SFU relay (fallback)
- **Build:** Vite (SSR + browser bundle)
