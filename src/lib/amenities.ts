import { Waves, Bed, Sofa, ChefHat, Mic, Flame } from "lucide-react";
import type { PhotoName } from "@/lib/photos";

// Amenity cards shared by the public Amenities tab and the private guest guide.
// Each card shows a real photo of that area (no people in any photo).
export const amenityCategories: { title: string; icon: typeof Waves; photo: PhotoName; alt: string; items: string[] }[] = [
  {
    title: "Swimming Pool",
    icon: Waves,
    photo: "pool-waterfall",
    alt: "Pool with a tiled waterfall wall",
    items: ["Swimming pool with waterfall", "Kiddie area for children", "Outdoor shower & comfort room", "Outdoor lounge with pool view"],
  },
  {
    title: "3 Air-conditioned Bedrooms",
    icon: Bed,
    photo: "room-2",
    alt: "Room 2 with a queen bed and double-deck beds",
    items: [
      "Room 1 (1st floor): 1 bed, good for 2. Ideal for couples or seniors",
      "Room 2 (2nd floor): queen bed, double deck and pull-out bed, good for 8",
      "Room 3 (2nd floor): 3 double decks, good for 12. Perfect for barkadas",
      "Up to 22 guests overnight",
    ],
  },
  {
    title: "Living & Dining",
    icon: Sofa,
    photo: "living-dining",
    alt: "Living room and long dining table under a wooden ceiling",
    items: ["Living room with Smart TV (YouTube)", "Indoor dining table for the whole group", "Outdoor dining area", "Two-story traditional Filipino-style villa"],
  },
  {
    title: "Kitchen & Kitchenware",
    icon: ChefHat,
    photo: "kitchen-counter",
    alt: "Kitchen counter with rice cooker, kettle, knives and utensils",
    items: [
      "2-door refrigerator, microwave, rice cooker, electric kettle",
      "Induction stove with 2 pans and 1 pot",
      "22 sets of glass plates, saucers, utensils and glasses",
      "Knives, scissors, spatulas and cooking utensils",
    ],
  },
  {
    title: "Videoke",
    icon: Mic,
    photo: "videoke",
    alt: "Videoke machine by the Villa Aurora green wall",
    items: ["Videoke speaker with 2 microphones", "Covered pavilion beside the pool", "Space for birthdays and reunions", "Professional sound available as an add-on"],
  },
  {
    title: "Outdoor, BBQ & Parking",
    icon: Flame,
    photo: "bbq-grill",
    alt: "Charcoal BBQ grill beside the garden",
    items: ["Big BBQ griller", "Chairs and tables", "4-car parking area", "Free unlimited fast WiFi"],
  },
];
