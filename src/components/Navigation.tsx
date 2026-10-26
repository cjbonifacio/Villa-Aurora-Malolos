import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";
import logo from "@/assets/villa-aurora-logo.webp";
import { CONTACT, scrollToSection, startBooking } from "@/lib/booking";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#packages", label: "Packages" },
  { href: "#info", label: "Amenities & Gallery" },
  { href: "#availability", label: "Availability" },
  { href: "#weddings", label: "Weddings" },
  { href: "#contact", label: "Contact" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    scrollToSection(href);
  };

  const book = () => {
    setIsMenuOpen(false);
    startBooking();
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border" aria-label="Main">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#home" onClick={(e) => go(e, "#home")} className="flex items-center gap-2" aria-label="Villa Aurora, back to top">
            <img src={logo} alt="" className="h-11 w-11 object-contain" />
            <span className="text-3xl md:text-4xl font-cheetah title-outline leading-none">Villa Aurora</span>
          </a>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-6">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className="whitespace-nowrap text-[15px] font-medium text-foreground/80 hover:text-secondary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Button variant="outline" asChild>
              <a href={`tel:${CONTACT.phone}`}>
                <Phone />
                Call
              </a>
            </Button>
            <Button variant="hero" onClick={book}>
              <CalendarCheck />
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden h-11 w-11 -mr-2 flex items-center justify-center text-foreground hover:text-secondary transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border shadow-elegant">
          <div className="px-4 py-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className="flex items-center min-h-12 border-b border-border/60 text-base font-medium text-foreground hover:text-secondary"
              >
                {link.label}
              </a>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Button variant="outline" size="lg" className="px-3" asChild>
                <a href={`tel:${CONTACT.phone}`}>
                  <Phone />
                  Call
                </a>
              </Button>
              <Button variant="hero" size="lg" className="px-3" onClick={book}>
                <CalendarCheck />
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
