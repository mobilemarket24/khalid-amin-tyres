# KHALID AMIN TYRES — Website

Marketing and catalogue site for **KHALID AMIN TYRES TR CO LLC**, a tyre and
rim business with branches in **Dubai** and **Sharjah** (UAE). Customers browse
tyres, rims and wheel services, then request today's price over WhatsApp. An
admin panel manages products, brands, branches, leads and editable site
content.

## Tech stack

- **Astro 6** — static site generation
- **Tailwind CSS 4** — styling (via `@tailwindcss/vite`)
- **Supabase** — database, auth (admin), storage (product images)
- **@astrojs/sitemap** — auto-generated sitemap

## How content works

The site builds as **static HTML**, but dynamic data is loaded **client-side**
from Supabase so it stays fresh without rebuilding:

- Products, prices and stock — loaded live on each page (`FeaturedProductsSection`)
- Brands, site texts and site images — loaded live from Supabase
- Page `<title>`/meta — read from Supabase **at build time** (`BaseLayout`)

> Changing products/prices in the admin shows immediately. Changing page code,
> design or meta text requires a rebuild.

## Local setup

1. Requires Node `>=22.12.0`.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your Supabase keys
   (Supabase Dashboard → Project Settings → API):
   ```
   PUBLIC_SUPABASE_URL=...
   PUBLIC_SUPABASE_ANON_KEY=...
   ```
4. Start the dev server:
   ```sh
   npm run dev
   ```

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start dev server at `localhost:4321`        |
| `npm run build`   | Build the production site to `./dist/`      |
| `npm run preview` | Preview the production build locally        |

## Admin panel

- Lives under `/admin/*` (e.g. `/admin/login`, `/admin/products`).
- Auth is handled by Supabase; each admin page checks the session client-side
  and redirects to `/admin/login` when signed out.
- Data is protected by **Supabase Row Level Security (RLS)** — keep RLS enabled
  on every table. `leads` must not be readable by the `anon` role.

## Branches

- **Sharjah** — Industrial Area 4, Sharjah · WhatsApp 050 351 2023
- **Dubai** — Al Manara St, Al Quoz 1, Dubai · WhatsApp 056 161 5010

Business details live in [`src/data/business.ts`](src/data/business.ts).

## Deployment

The site is fully static — the contents of `./dist/` can be served from any
static host (or a static-capable platform). Set the two `PUBLIC_SUPABASE_*`
environment variables in the host before building.
