import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";
import logo from "@/assets/villa-aurora-logo.webp";
import Footer from "@/components/Footer";

// Header + footer for the Privacy, Terms and 404 pages.
const SimplePageLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" aria-label="Villa Aurora home">
            <img src={logo} alt="" className="h-11 w-11 object-contain" />
            <span className="text-3xl md:text-4xl font-cheetah title-outline leading-none">Villa Aurora</span>
          </Link>
          <Button variant="hero" asChild>
            <Link to="/#contact">
              <CalendarCheck />
              Book Now
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default SimplePageLayout;
