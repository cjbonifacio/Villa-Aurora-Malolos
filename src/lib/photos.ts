// Site photos, served as WebP in three sizes from /public/images so phones
// download small files and big screens get sharp ones.
// Source: the professional shoot in "VILLA AURORA/00 Marketing Collaterals" (no people in any photo).
// To add or replace a photo, make <name>-640.webp, <name>-1024.webp and <name>-1600.webp
// in public/images and add the name below.
// When REPLACING a photo, give it a new name: browsers keep photos for 30 days,
// so reusing an old name can keep showing the old photo to returning visitors.

export type PhotoName =
  | "aerial-view"
  | "exterior-evening"
  | "exterior-day"
  | "pavilion"
  | "pool-waterfall"
  | "pool"
  | "pool-steps"
  | "pool-dusk"
  | "pool-night"
  | "veranda"
  | "veranda-lounge"
  | "living-room"
  | "living-dining"
  | "dining-room"
  | "room-1"
  | "room-2"
  | "room-3"
  | "bathroom"
  | "kitchen-counter"
  | "kitchen-cooktop"
  | "kitchen-sink"
  | "kitchenware"
  | "videoke"
  | "bbq-grill"
  | "tables-chairs";

export function photo(name: PhotoName, sizes = "100vw") {
  return {
    src: `/images/${name}-1024.webp`,
    srcSet: `/images/${name}-640.webp 640w, /images/${name}-1024.webp 1024w, /images/${name}-1600.webp 1600w`,
    sizes,
  };
}

// Biggest version, for the full-screen photo viewer.
export const largePhoto = (name: PhotoName) => `/images/${name}-1600.webp`;
