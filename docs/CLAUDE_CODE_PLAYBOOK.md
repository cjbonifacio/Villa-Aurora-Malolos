# Villa Aurora — Claude Code Playbook

Put this file in `docs/` in the repo. Work in order. One session per stage; commit between stages.

**Layout note:** the website lives at the repository ROOT (not in a `web/` folder). API functions go in `/api`.

## Stage 0 — Start (once)
```
cd Villa-Aurora-Malolos
git checkout -b website-upgrade   # skip if the branch already exists
claude
```
Inside Claude Code type `/skills` and confirm you see: frontend-design, superpowers (brainstorming, writing-plans, executing-plans, verification-before-completion), design-is.

Then paste:
> Read CLAUDE.md and docs/CLAUDE_CODE_PLAYBOOK.md. Do not change anything yet. Summarize back: the two systems, what you must not touch (admin/), and the known gaps in the website. Then run `npm install && npm run build` and report any errors.

If the build fails, fix that first. Do not move on with a broken build.

## Stage 1 — Move all content into ONE data file (so you can change data easily)
> Use the superpowers:brainstorming skill, then writing-plans. Goal: all editable content in the website must live in `src/data/site.ts` (and photos in `src/assets`): business name, the official phone (+63 906 233 6008), Facebook and Messenger links (https://www.facebook.com/villaaurora.malolos, https://m.me/villaaurora.malolos), address, check-in/out times, packages and rates, add-ons and fees, amenities, house rules, gallery captions, FAQs. Components must import from that file; no hard-coded prices or numbers inside components. Keep the current text and prices exactly as they are now. Show me the plan before coding.

Approve the plan, then:
> Execute the plan with executing-plans. Run `npm run build` and `npm run lint` at the end, then show me a summary of what moved.

**From now on, changing a rate, number or photo caption = edit `site.ts` only.** Ask Claude Code: "Change the 5–8 pax rate to ₱X" and it edits one line.

## Stage 2 — Design improvement
> Use the frontend-design skill. Audit the current site on mobile first (most Facebook visitors are on phones). Keep the Villa Aurora identity: logo, Pacifico title font, Karla/Lato body, warm brown/gold palette. Propose 3 concrete improvements (hero, packages cards, gallery, sticky "Check availability / Book on Facebook" bar on mobile). Do not implement yet.

Pick which ones you want, then:
> Implement the ones I chose. After that, run the design-is skill to audit the result against Dieter Rams' principles and list anything to fix. Fix the high-impact items only. Run build + lint.

To see it: `npm run dev`, open the localhost address on your computer, and check phone width with browser dev tools (F12 → phone icon).

## Stage 3 — Real availability calendar
> Use superpowers:writing-plans. Implement Phase 1 from CLAUDE.md, part A: replace mock dates in AvailabilityCalendar.tsx with real data from `api/availability.ts` (Vercel serverless function reading Supabase `blocked_dates`, cached 5 minutes). A day is booked if check_in <= day < check_out, so a check-out day stays open for a new check-in. Remove the public Google Calendar iCal links and the "Backend Implementation Required" notes from the UI. Show a friendly error if the fetch fails.

You must first (outside Claude Code): create the Supabase project, run `supabase/migrations/0001_init.sql`, and put the env vars in `.env.local` and Vercel (see `.env.example`). Never paste the service-role key into chat.

Test: manually insert two rows in Supabase → Table Editor → blocked_dates (e.g. Dec 24–25 and Dec 26–27) and confirm Dec 25 shows available.

## Stage 4 — Booking request form
> Implement part B of Phase 1: connect the contact form to `api/request.ts`. Zod validation on client and server, server-side re-check of the dates against blocked_dates, honeypot field, simple rate limit, insert into booking_requests with status 'pending'. Success message must say this is a REQUEST, not a confirmed booking, and offer the Messenger button. Use the verification-before-completion skill: actually run the build and test the endpoint with valid, invalid and overlapping-date requests.

## Stage 5 — Deploy
```
git add -A && git commit -m "Website upgrade: data file, design, calendar, request form"
git push -u origin website-upgrade
```
Vercel creates a Preview URL for the branch. Test the Preview on your phone. If good, merge `website-upgrade` into `main` on GitHub → the live site updates.

## Stage 6 — Admin connection (later, separate session)
> Phase 2 and 3 from CLAUDE.md. In admin/Code.gs only: after saveBooking succeeds, push the date range to Supabase blocked_dates via UrlFetchApp (Script Properties SUPABASE_URL, SUPABASE_SERVICE_KEY). A sync failure is logged to the Error Log and must never fail the booking. Add a one-time backfill function for existing bookings. Then add a Requests view that lists pending booking_requests with Approve/Decline.

After Claude Code edits admin/Code.gs or admin/index.html, you copy the files into the Apps Script editor and redeploy (this part is manual).

## Rules of thumb
- One stage per session. Say "stop and show me the plan" when unsure.
- Always end with: "Run build and lint, and tell me what you verified."
- Never let it edit `admin/` unless the prompt says so.
- Commit after every stage; if something breaks: `git restore .` or `git checkout main`.
- Secrets only in `.env.local` and Vercel — never in code or chat.
