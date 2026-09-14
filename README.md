
# Eagle's Nest Tabernacle

A ministry website for Eagle's Nest Tabernacle, a Bible-believing church following the End Time Message through Prophet William Marrion Branham in Lilongwe, Malawi.

## Brand identity

The site uses the official ministry logo in the navigation, hero section, footer, and browser metadata.

- Logo asset: `public/uploads/etmlogo.png`
- PWA manifest: `public/manifest.json`
- Browser metadata: `index.html`

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- Express server for app services

## Local setup

```bash
npm install
npm run dev
```

To run the backend API and frontend together:

```bash
npm run dev:all
```

## Production build

```bash
npm run build
```

## Deployment notes

This app is designed to be hosted as a static frontend with optional backend/API support. For production, set environment variables for the backend and configure a domain for the ministry website.

## Project purpose

The site is focused on:

- church information and doctrine
- live streaming and archived services
- media and music ministry
- prayer, contact, and events information
- member/admin dashboards
