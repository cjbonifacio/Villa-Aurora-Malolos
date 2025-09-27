import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
import Amenities from "@/components/Amenities";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Packages />
      <Amenities />
      <Contact />
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gradient mb-2">Villa Aurora 🏡</h3>
            <p className="text-primary-foreground/80">Your luxurious haven in Malolos, Bulacan</p>
          </div>
          <div className="text-sm text-primary-foreground/60">
            <p>&copy; 2024 Villa Aurora Private Resort. All rights reserved.</p>
            <p className="mt-1">#80 Independencia St., San Gabriel, Malolos, Philippines</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
