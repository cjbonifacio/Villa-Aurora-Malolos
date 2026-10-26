import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getConsent, onOpenCookieSettings, setConsent } from "@/lib/consent";

// Shown until the visitor chooses. Optional cookies = the embedded Google Map.
const CookieBanner = () => {
  const [open, setOpen] = useState(() => getConsent() === null);

  useEffect(() => onOpenCookieSettings(() => setOpen(true)), []);

  if (!open) return null;

  const choose = (value: "accepted" | "declined") => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie settings"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 md:bottom-4 md:left-4 md:right-auto md:max-w-md"
    >
      <div className="rounded-xl bg-card text-card-foreground shadow-elegant border border-border p-5">
        <p className="font-semibold mb-1">Cookies on this site</p>
        <p className="text-sm text-foreground/75 mb-4">
          We use essential storage to remember your choice. With your OK, we also load Google Maps, which sets its own
          cookies. We don't use advertising cookies. See our{" "}
          <Link to="/privacy" className="underline underline-offset-2 text-secondary">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="lg" className="px-3" onClick={() => choose("declined")}>
            Essential only
          </Button>
          <Button variant="hero" size="lg" className="px-3" onClick={() => choose("accepted")}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
