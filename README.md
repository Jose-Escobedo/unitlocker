# UnitLocker

A mobile-first sports prop picks platform. Staff post daily picks across CS2, NBA, NHL, MLB, NFL, and Tennis — authenticated users get access to the live feed, player stat history, and confidence-rated analysis.

## Features

- **Hot Picks Feed** — auth-gated daily prop picks with confidence ratings, fire badges, and sport filters
- **Player History Modal** — per-pick bar chart showing last 5, last 10, and H2H game logs with over/under visualization
- **Stats Grid** — inline Avg L10, Diff, L5/L10/L15, and H2H hit rates on each pick card
- **Admin Dashboard** — create, settle (won/lost/push), and manage picks with full stat entry
- **Sport Filters** — All, CS2, NBA, NHL, MLB, NFL, Tennis with mobile overflow menu
- **Auth** — JWT-based login, role-based access (admin / member)

## Stack

- **Framework** — Next.js 16 (App Router + Pages API routes)
- **Database** — MongoDB via Mongoose
- **Auth** — JWT stored in HTTP-only cookies
- **Styling** — Inline styles + Tailwind (utility classes)
- **Icons** — Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Copy `.env.local.example` to `.env.local` and fill in:

```
MONGODB_URI=
JWT_SECRET=
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  picks/          # Live picks feed (auth-gated)
  admin/          # Admin dashboard
  login/          # Auth pages
  get-started/

components/
  picks/
    PickCard.js   # Pick card with stats grid + history modal
    StatsModal.js # Bottom sheet bar chart (L5 / L10 / H2H)

models/
  Pick.js         # Mongoose schema (sport, line, stats, history)
  User.js

pages/api/
  picks/          # Public picks API + seed endpoint
  admin/picks.js  # Admin CRUD
```

## Seeding Dev Data

```bash
curl -X POST http://localhost:3000/api/picks/seed
```

Loads 5 picks (CS2, NBA, NHL, MLB) with notes, stats, and per-game history. Remove `pages/api/picks/seed.js` before going to production.
