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

## Project layout

```
backend/          Express API + JSON store
frontend/         Angular 14 admin app
```
