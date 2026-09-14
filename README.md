# Website Admin Panel

Angular 14 admin UI + Node.js Express API. Content is persisted in JSON files under `backend/data/` (a lightweight stand-in for a database).

## Features

- **Dashboard** — counts and recent blogs
- **Blogs** — create, edit, publish/draft, delete
- **About page** — headline, body, mission, vision, team intro
- **Pages** — static pages with SEO fields
- **Settings** — site name, tagline, contact, social links

## Requirements

- Node.js 16+ (Node 16 recommended for Angular 14)
- npm 8+

## Quick start

```bash
# install dependencies
npm run install:all

# terminal 1 — API on http://127.0.0.1:4521
npm run start:api

# terminal 2 — Angular admin on http://127.0.0.1:4317
npm run start:web
```

Open [http://127.0.0.1:4317](http://127.0.0.1:4317).

## API overview

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/dashboard` | Dashboard summary |
| GET/POST | `/api/blogs` | List / create blogs |
| GET/PUT/DELETE | `/api/blogs/:id` | Read / update / delete blog |
| GET/PUT | `/api/about` | About page content |
| GET/POST | `/api/pages` | List / create pages |
| GET/PUT/DELETE | `/api/pages/:id` | Read / update / delete page |
| GET/PUT | `/api/settings` | Site settings |

## Data files

| File | Collection |
|------|------------|
| `backend/data/blogs.json` | Blog posts |
| `backend/data/about.json` | About page |
| `backend/data/pages.json` | Static pages |
| `backend/data/settings.json` | Site settings |

Edits in the admin UI rewrite these files immediately, so changes survive API restarts.

## Long-lived hosting (Render free)

Agent tunnels only last while this Cloud Agent is running. For days/weeks of uptime, deploy to [Render](https://render.com) (free plan, no credit card):

1. Push this repo to **GitHub** (Render connects to GitHub/GitLab/Bitbucket; Origin alone is not enough).
2. In Render: **New → Blueprint** (or Web Service), connect the repo.
3. Render will pick up `render.yaml` + `Dockerfile` and deploy a free web service.
4. Open the `*.onrender.com` URL Render assigns.

Notes:
- Free instances **sleep after ~15 minutes** of no traffic (wake takes ~1 minute).
- JSON file data resets if the instance is rebuilt unless you add a persistent disk later.
- Local demo command: `docker build -t control-center . && docker run -p 4535:4535 control-center`

## Showcase / production serve (local or temporary tunnel)

Build the Angular app and serve UI + API from one Node process:

```bash
npm run install:all
npm run build --prefix frontend -- --configuration=production
PORT=4535 npm run start:api
```

Then open `http://127.0.0.1:4535`. The API is available under `/api`.

Temporary public URL (dies when the machine stops):

```bash
cloudflared tunnel --url http://127.0.0.1:4535
```

## Project layout

```
backend/          Express API + JSON store
frontend/         Angular 14 admin app
```
