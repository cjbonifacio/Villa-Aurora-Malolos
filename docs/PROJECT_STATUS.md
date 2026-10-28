# Villa Aurora website — project status

Last updated: October 27, 2026. Live at **https://villa-aurora-malolos.vercel.app** (Vercel deploys every push to `main`).

## How it fits together

```
Admin app (Google Apps Script) ──saves booking──▶ Google Calendar (all-day "RESERVED: name")
                                                        │  secret iCal address (dates only)
Supabase blocked_dates (manual blocks) ───────────────┐ │
                                                      ▼ ▼
Website ──▶ /api/availability ──▶ live calendar (green = open, red = booked)
Guest form ──▶ /api/request ──▶ checks dates ──▶ saves to Supabase booking_requests (pending)
                                       └──▶ opens Messenger with the details pre-typed ──▶ your Page inbox
```

The website never confirms a booking. You confirm in the admin app, which adds it to Google Calendar,
which turns the date red on the site within about 5 minutes.

## Done

**Booking system**
- Live availability calendar from Google Calendar + Supabase `blocked_dates`. Check-out day stays open.
- Tap a green date, or any "Book" button, and the booking form fills in the date or package.
- "Request to Book via Messenger": validates the form, re-checks dates on the server, saves the request,
  then opens Messenger with the details typed in (also copied, in case Messenger doesn't pre-fill).
- Spam/flood protection: hidden honeypot field; 5 requests per 10 minutes per visitor; and, enforced by the
  database (`supabase/migrations/0002_lock_down.sql`), at most 20 requests per hour site-wide and 3 per phone
  number per day. Over the limit, guests are asked to message on Messenger instead.
- The calendar API only answers whole-month questions within 2 years, so it can't be used to skip the cache.
- Message buttons on phones open the Messenger app straight to the chat (same tab); the booking form
  checks dates as soon as they're picked, so its button opens Messenger instantly.
- Guest names never reach the website; only dates do. The old public Google Calendar embed is gone.

**Design**
- Same brand (cream, brown, gold, Cheetah Kick titles), cleaned up and consistent across sections.
- Real photo gallery with full-screen viewer; real photos in the Weddings section.
- Sticky "Check dates / Messenger" bar on phones; 44px tap targets; no sideways scrolling.
- Colour contrast fixed (deep gold titles on light backgrounds).

**Pages and legal**
- Home, Privacy Policy (Data Privacy Act 2012), Terms & Conditions, custom 404.
- Cookie banner; the Google Map only loads after consent.

**SEO, speed, security**
- Page titles and descriptions, Google business details, social preview image, favicon/app icons,
  `sitemap.xml`, `robots.txt`, Google Search Console verification file.
- Photos as WebP in 3 sizes (hero 43 KB on phones). Lighthouse: desktop 98 performance, 100 accessibility/SEO.
- HTTPS only, security headers (HSTS, CSP, no framing). Database keys stay on the server.
- Vercel Analytics + Speed Insights (cookie-free).

**Repo**
- Unused template code and 36 unused packages removed. Only `main` branch.

## Settings (Vercel → Settings → Environment Variables)

| Name | What |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase secret key (server only) |
| `GOOGLE_CALENDAR_ICS_URL` | Google Calendar "Secret address in iCal format" |

Change a setting → Deployments → ⋯ → Redeploy.

## Where to change things

| To change… | Edit |
|---|---|
| Phone numbers, Facebook/Messenger links, address | `src/lib/booking.ts` |
| Rates and package details | `src/components/Packages.tsx` |
| Amenities, house rules, gallery captions | `src/components/InfoTabs.tsx` |
| Wedding section | `src/components/Weddings.tsx` |
| Privacy / Terms text | `src/pages/Privacy.tsx`, `src/pages/Terms.tsx` |
| Photos | `public/images/` (3 sizes each) + list in `src/lib/photos.ts` |
| Page title / description for Google | `index.html` |

## Still to do (your side)
- [ ] Make the Google Calendar private (Settings → Access permissions → untick "Make available to public").
- [ ] Search Console: click Verify, then submit `sitemap.xml`.
- [ ] Facebook Sharing Debugger: paste the site URL → Scrape Again (refreshes the link preview).
- [ ] Vercel: turn on Analytics and Speed Insights (one click each).
- [ ] Read the Privacy and Terms drafts once.
- [ ] Optional: make the GitHub repo private (safe; Vercel keeps working).

## Ideas for next steps
1. **Email alert on new requests** (e.g. Resend), so you don't rely only on Messenger.
2. **Requests view in the admin app**: list pending Supabase requests, tap Approve to prefill a booking.
3. **Online downpayment** (e.g. PayMongo for GCash/cards) after you approve a request.
4. **Custom domain** like villaauroramalolos.com (update the URL in `index.html`, `sitemap.xml`,
   `robots.txt`, `src/lib/usePageMeta.ts`).
5. **Guest reviews / FAQ section**, and a Google Business Profile linked to the site.
6. **Stronger spam check** (Cloudflare Turnstile) if spam appears.
7. **Tagalog version** of the page.
8. **Auto-delete old requests** after 2 years (promised in the Privacy Policy).
