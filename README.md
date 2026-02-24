# RADb - Reel Archive Data Base
<img width="1200" height="576" alt="image" src="https://github.com/user-attachments/assets/5aa73957-2ece-4a98-b962-82072b305617" />

RADb is a movie discovery web app powered by [TMDB](https://www.themoviedb.org/). It lets users browse trending and categorized movies, explore genres, view detailed movie and actor pages, and search through paginated results.

## Features

- Browse `Trending` movies with day/week toggle
- Explore `Now Playing`, `Top Rated`, and `Popular` sections
- Genre-based movie browsing
- Movie details page with cast and recommendations
- Actor details page with film credits
- Search movies with pagination and swipe navigation
- Recent visited movies quick-access toggle
- Global loading and error feedback (spinners + toast)
- Animated page transitions (Framer Motion)

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query (data fetching + caching)
- Axios (TMDB API client)
- React Bootstrap + Bootstrap
- Sass (SCSS)
- Swiper
- Framer Motion
- React Toastify

## Project Structure

- `src/pages` - Route-level pages (`HomePage`, `GenrePage`, `MovieDetailsPage`, `ActorDetailsPage`, `SearchPage`)
- `src/components` - Reusable UI components (navigation, sliders, cards, toggles, pagination, etc.)
- `src/hooks` - Data/UI hooks for TMDB queries and page state
- `src/services` - TMDB service layer and types
- `src/lib/api.ts` - Axios instance and auth headers
- `src/contexts` - Theme + genre context providers
- `src/assets/styles` - Global/component SCSS styles

## Environment Variables

Create a `.env` file in the project root with:

```bash
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_BEARER_TOKEN=your_tmdb_v4_bearer_token
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Notes:
- `VITE_` prefix is required for Vite client-side env access.
- `VITE_TMDB_BEARER_TOKEN` is used by `src/lib/api.ts` for authenticated requests.

## Getting Started

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Type-check and build production assets
- `npm run preview` - Preview production build locally
- `npm run check:0-lint` - Run ESLint
- `npm run check:1-tsc` - Run TypeScript checks (`--noEmit`)
- `npm run check:2-type-coverage` - Enforce 100% type coverage
- `npm run check` - Run all checks in sequence

## Deployment

Netlify configuration is included in `netlify.toml`:

- Build command: `tsc && vite build`
- Publish directory: `dist`
- SPA redirect rule to `index.html`

## Data Source

This project uses [The Movie Database (TMDB) API](https://developer.themoviedb.org/docs/getting-started).

