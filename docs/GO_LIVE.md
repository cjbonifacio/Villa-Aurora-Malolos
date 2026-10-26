# Go live — connect Supabase + Vercel (about 15 minutes)

The code is ready. These steps need your own accounts, so you do them once.

## 1. Supabase (the database)
1. Go to https://supabase.com → **New project**. Region: **Southeast Asia (Singapore)**.
2. Left menu → **SQL Editor** → **New query** → paste everything from
   `supabase/migrations/0001_init.sql` → **Run**.
3. Left menu → **Project Settings → API**. Keep this tab open; you need:
   - **Project URL** (looks like `https://abcd1234.supabase.co`)
   - **service_role** key (click "Reveal"). Treat it like a password — never paste it into chat or code.

## 2. Vercel (the hosting)
1. https://vercel.com → your `villa-aurora-malolos` project → **Settings → Environment Variables**.
   (If the repo isn't connected yet: **Add New → Project → Import** `Villa-Aurora-Malolos`. Framework: Vite.)
2. Add two variables (tick Production **and** Preview):
   - `SUPABASE_URL` = the Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = the service_role key
3. Push the `website-upgrade` branch → Vercel builds a **Preview** link. Test it on your phone.
4. Happy? Merge `website-upgrade` into `main` on GitHub → the live site updates.

## 3. Test it
- Supabase → **Table Editor → blocked_dates → Insert row**: check_in `2026-12-24`, check_out `2026-12-25`.
  Within 5 minutes, Dec 24 shows red on the site and Dec 25 stays green.
- Send a request from the site's contact form → it appears in **Table Editor → booking_requests**
  with status `pending`.

## 4. Day-to-day (until the admin sync is built)
- When you confirm a booking, add its dates to `blocked_dates` (check_out = the day they leave).
- Check `booking_requests` for new requests, then contact the guest.
- Make your Google Calendar private (Calendar settings → Access permissions → untick
  "Make available to public"). The website no longer uses it.

## 5. Analytics (visitor stats + page speed)
The code is already in. Turn it on once in Vercel:
- Project → **Analytics** → **Enable** (visitor stats, no cookies).
- Project → **Speed Insights** → **Enable** (real page speed from visitors' phones).

## 6. Google and Facebook
- Google Search Console (https://search.google.com/search-console) → add
  `https://villa-aurora-malolos.vercel.app` → submit `sitemap.xml`.
- Check the link preview: https://developers.facebook.com/tools/debug → paste the site URL → **Scrape Again**.
- If you buy a custom domain later, replace `villa-aurora-malolos.vercel.app` in `index.html`,
  `public/sitemap.xml`, `public/robots.txt` and `src/lib/usePageMeta.ts`.

## 7. Legal pages
`/privacy` and `/terms` are plain-language drafts based on your current house rules and the
Data Privacy Act of 2012. Read them once, and have a lawyer check them if you want certainty.

## Run it on your computer (optional)
1. Copy `.env.example` to `.env.local` and fill in the two values.
2. `npm install` then `npm run dev` → open http://localhost:8080
