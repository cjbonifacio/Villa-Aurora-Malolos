> **Layout note:** in this repo the website lives at the ROOT (no `web/` folder). API functions are in `/api`, schema in `/supabase`. `admin/` is not in this repo.

# Villa Aurora — Project Brief for Claude Code

Owner: CJ. Business: Villa Aurora Private Resort, Malolos, Bulacan (private resort, Facebook-first bookings).

## Two systems, one repo
1. `admin/` — EXISTING internal system. Google Apps Script web app (Code.gs + index.html) on Google Sheets,
   Drive, Calendar, Docs. Only CJ and caretakers use it. It is the SOURCE OF TRUTH for bookings and money.
   - Do NOT migrate it, rewrite it, or move its data to Supabase.
   - Edit only when a task explicitly says so, and keep changes small. Read the header comments first.
   - Sheet "Booking Tracker" is read by COLUMN INDEX, never header name. Columns: A CheckIn, B CheckOut,
     C DateBooked, D Guest, E Phone, F Email, G Address, H Pax, I Package, J BookingCost, K AddOns, L AddOnsQty,
     M AddOnsCost, N Total, O Downpayment, P Balance, Q Status, R 2ndPayment, S FullyPaidDate, T Mode,
     U Notes, V Receipt, W InvoiceDocID, X PDFUrl, Y SlipNo, Z BookingSource. Never insert/reorder columns.
   - Apps Script rules: V8 runtime; no toLocaleString; no setSharing (org policy; files stay private);
     secrets only via Script Properties; saveBooking is all-or-nothing (validate -> lock -> conflict check
     -> write -> rollback on error). Dates are parsed as local (Asia/Manila) midnight.
   - Booking dates: check-out is EXCLUSIVE. Dec 24-25 and Dec 26-27 leave 25-26 open. Back-to-back is allowed.
2. `web/` — EXISTING public customer site (Vite + React 18 + TypeScript + Tailwind + shadcn/ui + TanStack Query
   + date-fns + zod + react-router), deployed on Vercel at villa-aurora-malolos.vercel.app. Keep this stack; do NOT
   convert it to Next.js. Keep the existing design, copy, photos and rates. Server code goes in `api/*.ts`
   (Vercel Serverless Functions - they work alongside Vite). Customers can see availability, submit a booking
   REQUEST, or tap through to Facebook (https://www.facebook.com/villaaurora.malolos). The site NEVER confirms a
   booking; CJ approves in the admin.
   Current state: see docs/PROJECT_STATUS.md. Phase 1 and most of Phase 4 are done. Availability comes from
   Google Calendar (secret iCal address, env GOOGLE_CALENDAR_ICS_URL, read server-side in api/*.ts, dates only)
   plus Supabase blocked_dates. The booking form saves to booking_requests and opens Messenger pre-filled.
   Contact details live in src/lib/booking.ts; photos in public/images (WebP, 3 sizes) via src/lib/photos.ts.
3. `supabase/migrations/` — schema for the public site (blocked_dates, booking_requests, RLS on).

## Data flow (build in this order)
Phase 1  Replace mock dates in AvailabilityCalendar with real `blocked_dates` (via `api/availability.ts`,
         cached 5 min). A day is booked if check_in <= day < check_out (check-out day stays open). Wire the contact
         form to `api/request.ts` (zod validation, server-side date re-check, honeypot, rate limit) -> insert
         into `booking_requests`. Remove the public iCal links. Facebook/Messenger button stays.
Phase 2  (Optional now: the site already reads Google Calendar directly.) Admin -> Supabase sync: after saveBooking succeeds, Apps Script POSTs the new range to `blocked_dates`
         via UrlFetch (service-role key in Script Properties: SUPABASE_URL, SUPABASE_SERVICE_KEY). Also a one-time
         backfill function from the sheet/calendar. Sync failure must NOT fail the booking (log to Error Log).
Phase 3  Admin pulls `pending` requests from Supabase into a "Requests" view; CJ taps Approve -> prefilled
         New Booking form (Approve/Decline updates status). Optional email/Messenger notification to CJ.
Phase 4  Polish: photos, packages/rates page, house rules, SEO, analytics, spam protection (honeypot + Turnstile).

## Security rules (non-negotiable)
- Never commit secrets. `.env*` is git-ignored. Service-role key is server-side only (never NEXT_PUBLIC_).
- Public site exposes ONLY date ranges - no guest names, phones, or amounts. RLS stays enabled on every table.
- Validate on client AND server (Zod). Rate-limit the request endpoint. Escape all output.
- Request form double-checks the dates against `blocked_dates` server-side before inserting.

## Style
Match Villa Aurora branding: fonts Pacifico (titles), Karla/Lato (body); warm brown/gold palette (see admin/index.html CSS vars).
Currency PHP. Timezone Asia/Manila. Keep code simple and commented; CJ is not a full-time developer.

## How to work with CJ
Concise, ready-to-use output. Explain steps plainly. Ask before anything destructive or that touches admin/.
Run lint/build before saying a task is done.
