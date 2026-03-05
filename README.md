# movie-client-frontend

> SOA Movie Explorer — Repo 1 of 3

A **Next.js 14** frontend that discovers and browses movies. It ONLY communicates with the backend proxy — never directly with TMDB.

## Architecture Position

```
THIS SERVICE (port 3000) → movie-service-proxy (port 4000) → TMDB API
```

## Features

- 🎬 Browse popular movies
- 🔍 Search by title (400ms debounce)
- 🎞️ Full movie detail page
- ⏳ Loading skeleton state
- ❌ Friendly error state with retry
- 📱 Responsive grid (2–5 columns)
- 🌙 Dark theme with smooth animations

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Make sure movie-service-proxy is running on port 4000
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend proxy URL | `http://localhost:4000` |

> **Never** point this to TMDB directly.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout + navbar
│   ├── page.tsx                # Home: popular movies
│   ├── search/page.tsx         # Search results
│   └── movies/[id]/page.tsx    # Movie detail
├── components/
│   ├── MovieCard.tsx           # Poster + info card
│   ├── MovieGrid.tsx           # Responsive grid
│   ├── SearchBar.tsx           # Controlled search input
│   ├── LoadingSkeleton.tsx     # Loading state
│   └── ErrorMessage.tsx        # Error state
├── hooks/
│   ├── useMovies.ts            # Popular movies hook
│   ├── useMovieDetail.ts       # Single movie hook
│   └── useSearch.ts            # Debounced search hook
├── interfaces/
│   └── movie.types.ts          # TypeScript types
└── lib/
    └── api.ts                  # Centralized HTTP client
```

## Scripts

```bash
npm run dev    # Development server
npm run build  # Production build
npm run lint   # ESLint
```
