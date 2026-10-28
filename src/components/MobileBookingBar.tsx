import { Button } from "@/components/ui/button";
import { CalendarDays, MessageCircle } from "lucide-react";
import { messengerLinkProps, scrollToSection } from "@/lib/booking";

// Sticky bar at the bottom of the screen on phones, so booking is always one tap away.
const MobileBookingBar = () => (
  <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-t border-border px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" size="lg" className="px-3" onClick={() => scrollToSection("#availability")}>
        <CalendarDays />
        Check dates
      </Button>
      <Button variant="messenger" size="lg" className="px-3" asChild>
        <a {...messengerLinkProps()}>
          <MessageCircle />
          Messenger
        </a>
      </Button>
    </div>
  </div>
);

export default MobileBookingBar;
