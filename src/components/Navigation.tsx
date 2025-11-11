import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Calendar } from "lucide-react";
import logo from "@/assets/villa-aurora-logo.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-elegant">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Villa Aurora Logo" className="h-12 w-12 object-contain" />
            <div className="text-2xl font-cheetah text-gradient">
              Villa Aurora
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-smooth">
              Home
            </a>
            <a href="#packages" className="text-foreground hover:text-primary transition-smooth">
              Packages
            </a>
            <a href="#info" className="text-foreground hover:text-primary transition-smooth">
              Amenities & Gallery
            </a>
            <a href="#weddings" className="text-foreground hover:text-primary transition-smooth">
              Weddings
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-smooth">
              Contact
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="luxury" size="sm">
              <Phone className="w-4 h-4" />
              Call Now
            </Button>
            <Button variant="booking" size="sm">
              <Calendar className="w-4 h-4" />
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-smooth"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <div className="px-4 py-6 space-y-4">
            <a href="#home" className="block py-2 text-foreground hover:text-primary transition-smooth">
              Home
            </a>
            <a href="#packages" className="block py-2 text-foreground hover:text-primary transition-smooth">
              Packages
            </a>
            <a href="#info" className="block py-2 text-foreground hover:text-primary transition-smooth">
              Amenities & Gallery
            </a>
            <a href="#weddings" className="block py-2 text-foreground hover:text-primary transition-smooth">
              Weddings
            </a>
            <a href="#contact" className="block py-2 text-foreground hover:text-primary transition-smooth">
              Contact
            </a>
            <div className="flex flex-col space-y-3 pt-4">
              <Button variant="luxury" size="sm">
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
              <Button variant="booking" size="sm">
                <Calendar className="w-4 h-4" />
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