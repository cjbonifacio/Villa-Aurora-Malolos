import { useEffect, useState } from "react";

// Cookie consent, saved in this browser only.
// "accepted" = optional third-party content (Google Maps) may load.
export type Consent = "accepted" | "declined" | null;

const KEY = "va-cookie-consent";
const CHANGE_EVENT = "va:consent-change";
const OPEN_EVENT = "va:open-cookie-settings";

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: "accepted" | "declined") {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // Private mode etc.: the choice just lasts for this visit.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: value }));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function useConsent(): Consent {
  const [consent, setState] = useState<Consent>(getConsent);
  useEffect(() => {
    const onChange = (e: Event) => setState((e as CustomEvent<Consent>).detail);
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, []);
  return consent;
}

export function onOpenCookieSettings(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
