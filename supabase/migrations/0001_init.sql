-- Villa Aurora public site schema. Run in Supabase → SQL Editor.
-- Public visitors can: read blocked dates, submit a booking request. Nothing else.

create table if not exists blocked_dates (
  id          bigint generated always as identity primary key,
  check_in    date not null,
  check_out   date not null,            -- exclusive: check-out day is free for the next guest
  source      text not null default 'admin',  -- 'admin' (synced from Apps Script) | 'request'
  created_at  timestamptz not null default now(),
  constraint valid_range check (check_out > check_in)
);

create table if not exists booking_requests (
  id           uuid primary key default gen_random_uuid(),
  guest_name   text not null check (char_length(guest_name) between 2 and 100),
  phone        text not null check (phone ~ '^[0-9+()\-\s]{7,30}$'),
  email        text check (email is null or email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  check_in     date not null,
  check_out    date not null,
  pax          int  not null check (pax between 1 and 100),
  package_type text,
  message      text check (message is null or char_length(message) <= 500),
  status       text not null default 'pending'
               check (status in ('pending','approved','declined','imported')),
  created_at   timestamptz not null default now(),
  constraint valid_req_range check (check_out > check_in)
);

alter table blocked_dates   enable row level security;
alter table booking_requests enable row level security;

-- Public: read-only availability (no guest info is stored here)
create policy "public can read blocked dates"
  on blocked_dates for select using (true);

-- Public: may INSERT a request, with status forced to pending. Cannot read/update/delete.
create policy "public can submit requests"
  on booking_requests for insert
  with check (status = 'pending');

-- Admin/Apps Script uses the service-role key (bypasses RLS) — keep it server-side only.
