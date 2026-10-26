# Villa Aurora Malolos — website

Public website for Villa Aurora Private Resort, Malolos, Bulacan.
Live at **https://villa-aurora-malolos.vercel.app** (deployed by Vercel from the `main` branch).

Guests can see live availability, view rates and photos, and send a booking request that opens
Facebook Messenger. The site never confirms a booking; CJ confirms bookings in the admin app.

## What's where

| Path | What it is |
|---|---|
| `src/pages/` | Pages: home, Privacy, Terms, 404 |
| `src/components/` | Page sections (hero, packages, calendar, booking form…) and `ui/` building blocks |
| `src/lib/booking.ts` | Phone numbers, Facebook/Messenger links, address — change them here |
| `src/lib/photos.ts` | Photo list (files are in `public/images/`) |
| `api/availability.ts` | Server: booked dates from Supabase + Google Calendar (dates only, no names) |
| `api/request.ts` | Server: checks and saves booking requests to Supabase |
| `supabase/migrations/` | Database setup SQL |
| `public/` | Icons, social preview image, sitemap, robots.txt, Google verification file |
| `docs/GO_LIVE.md` | Setup guide: Supabase, Vercel settings, Google Calendar, analytics |
| `CLAUDE.md` | Project brief for Claude Code |

## Settings (Vercel → Settings → Environment Variables)

See `.env.example`. Never commit real values.

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — database
- `GOOGLE_CALENDAR_ICS_URL` — your Google Calendar's secret iCal address

## Run it on your computer

```sh
npm install
npm run dev      # http://localhost:8080 (also runs the /api functions, using .env.local)
npm run build    # production build
npm run lint
```

Built with Vite, React, TypeScript, Tailwind CSS and shadcn/ui.
