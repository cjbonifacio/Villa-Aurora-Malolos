-- Villa Aurora: lock down direct database access and add flood limits.
-- Run once in Supabase -> SQL Editor. Safe to run again.

-- 1. Remove public access.
-- The website talks to Supabase only through its own server (/api), using the secret key.
-- These public rules let anyone with the project's public (anon) key read dates or add booking
-- requests directly, skipping the website's checks and spam limits. RLS stays ON, so with no
-- public rules, only the server's secret key can read or write.
drop policy if exists "public can read blocked dates" on blocked_dates;
drop policy if exists "public can submit requests" on booking_requests;

-- 2. Keep the limit checks fast.
create index if not exists booking_requests_created_at_idx on booking_requests (created_at);
create index if not exists booking_requests_phone_created_idx on booking_requests (phone, created_at);

-- 3. Flood limits, enforced by the database itself (so they hold even when many requests
--    arrive at the same moment). New requests are refused when:
--      • 20 or more requests were made in the last hour (whole site), or
--      • the same phone number made 3 or more requests in the last day.
--    The website then asks the guest to message on Messenger instead.
--    To change the limits, edit the numbers below and run this file again.
create or replace function booking_requests_limits() returns trigger
language plpgsql as $$
begin
  -- Handle one new request at a time, so simultaneous requests can't all slip under the limit.
  perform pg_advisory_xact_lock(hashtext('booking_requests_limits'));

  if (select count(*) from booking_requests where created_at > now() - interval '1 hour') >= 20 then
    raise exception 'rate_limited: too many requests this hour';
  end if;

  if (select count(*) from booking_requests
      where phone = new.phone and created_at > now() - interval '1 day') >= 3 then
    raise exception 'rate_limited: too many requests from this phone today';
  end if;

  return new;
end;
$$;

drop trigger if exists booking_requests_limits on booking_requests;
create trigger booking_requests_limits
  before insert on booking_requests
  for each row execute function booking_requests_limits();
