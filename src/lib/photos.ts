// Site photos, served as WebP in three sizes from /public/images so phones
// download small files and big screens get sharp ones.
// Originals live in src/assets/*.jpg. To add or replace a photo, make
// <name>-640.webp, <name>-1024.webp and <name>-1600.webp in public/images.

export type PhotoName =
  | "aerial-view"
  | "villa-exterior"
  | "pool-area"
  | "dining-area"
  | "outdoor-space"
  | "lounge-area"
  | "room-simple"
  | "room-family"
  | "room-bunk";

export function photo(name: PhotoName, sizes = "100vw") {
  return {
    src: `/images/${name}-1024.webp`,
    srcSet: `/images/${name}-640.webp 640w, /images/${name}-1024.webp 1024w, /images/${name}-1600.webp 1600w`,
    sizes,
  };
}

// Biggest version, for the full-screen photo viewer.
export const largePhoto = (name: PhotoName) => `/images/${name}-1600.webp`;
