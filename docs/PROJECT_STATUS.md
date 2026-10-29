# Villa Aurora website — project status

Last updated: October 27, 2026. Live at **https://villaauroramalolos.com** (Vercel deploys every push to `main`).

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

**Guest guide (private)**
- `/guide/<secret>`: check-in/out, WiFi (with copy button), rules with Tagalog notes, amenities, fees, nearby places
  with walking times, emergency numbers, and a Google review button + QR. Hidden from Google.
- Wrong link → normal 404. The WiFi password is never in the website code; the server sends it only with the right link.
- Content comes from `api/guide.ts` (built-in defaults) merged with your Google Sheet. See "Editing the guest guide" below.

**Repo**
- Unused template code and 36 unused packages removed. Only `main` branch.

## Settings (Vercel → Settings → Environment Variables)

| Name | What |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase secret key (server only) |
| `GOOGLE_CALENDAR_ICS_URL` | Google Calendar "Secret address in iCal format" |
| `GUIDE_SECRET` | Long random string. The guest link is `/guide/<this>`. Change it (and redeploy) if the link leaks |
| `GUIDE_SHEET_CSV_URL` | Google Sheet "Guide" tab published as CSV (WiFi + any edits) |

Change a setting → Deployments → ⋯ → Redeploy.

## Editing the guest guide (no code)

1. Google Sheets: new sheet, rename the tab `Guide`, import `docs/guide-sheet-template.csv` (File → Import), then type the WiFi password.
2. File → Share → Publish to web → choose the `Guide` tab and **CSV** → Publish → copy the link into `GUIDE_SHEET_CSV_URL` on Vercel.
3. Make a secret (`node -e "console.log(require('crypto').randomBytes(18).toString('base64url'))"`), put it in `GUIDE_SECRET`, redeploy.
4. Send guests `https://villaauroramalolos.com/guide/<secret>` on Messenger after you confirm the booking.

Columns: `section, key, value, value_tl (Tagalog), link`. A row with the same section and key as a built-in line replaces it;
a new key adds a line; an empty `value` hides a built-in line. Sections: `wifi`, `checkin`, `checkout`, `rules`, `fees`,
`explore`, `emergency`. Changes show within about 5 minutes. The published CSV link is readable by anyone who has it,
so keep it private and put nothing in the sheet you wouldn't give a guest.

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
