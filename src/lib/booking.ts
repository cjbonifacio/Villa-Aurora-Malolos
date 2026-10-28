// Shared contact details + booking helpers. Change a link or number here and it
// updates everywhere on the site.

export const CONTACT = {
  facebookUrl: "https://www.facebook.com/villaaurora.malolos",
  messengerUrl: "https://m.me/villaaurora.malolos",
  phone: "+639062336008",
  phoneLabel: "0906 233 6008",
  caretakerPhone: "+639533572419",
  caretakerPhoneLabel: "0953 357 2419",
  caretakers: "Kuya Rudy & Ate Ruby",
  email: "villaauroramalolos@gmail.com",
  address: "#80 Independencia St., San Gabriel, Malolos, Bulacan 3000",
  mapsUrl: "https://maps.app.goo.gl/6dyApRiAA6cQs46U9",
  wazeUrl: "https://waze.com/ul/hwdtumnvmj",
};

export const PACKAGE_LABELS: Record<string, string> = {
  overnight: "Overnight Stay",
  daytour: "Day Tour",
  wedding: "Wedding Preparation",
  other: "Other Event",
};

export interface BookingPrefill {
  packageType?: string;
  checkIn?: string; // YYYY-MM-DD
}

const PREFILL_EVENT = "villa:start-booking";

// Any "Book" button calls this: it pre-fills the booking form and scrolls to it.
export function startBooking(prefill: BookingPrefill = {}) {
  window.dispatchEvent(new CustomEvent<BookingPrefill>(PREFILL_EVENT, { detail: prefill }));
  document.querySelector("#book")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function onStartBooking(handler: (prefill: BookingPrefill) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<BookingPrefill>).detail);
  window.addEventListener(PREFILL_EVENT, listener);
  return () => window.removeEventListener(PREFILL_EVENT, listener);
}

export function scrollToSection(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Messenger link that opens a chat with the page, with the message pre-typed.
export function messengerLink(text?: string) {
  return text ? `${CONTACT.messengerUrl}?text=${encodeURIComponent(text)}` : CONTACT.messengerUrl;
}

// True on phones and tablets (where the Messenger app is).
export function isPhone() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent));
}

// Use on every "Message us" link: <a {...messengerLinkProps()}>.
// On phones the link opens in the same tab, which makes the Messenger app open straight to our chat.
// (A new tab often shows a Facebook web page with an extra "Open in Messenger" step instead.)
// On computers it opens a new tab so the website stays open.
export function messengerLinkProps(text?: string) {
  const href = messengerLink(text);
  return isPhone() ? { href } : { href, target: "_blank", rel: "noopener noreferrer" };
}
