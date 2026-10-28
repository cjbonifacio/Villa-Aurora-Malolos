import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

// Villa Aurora theme. The color values live in src/index.css (:root).
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Three fonts, each with one job:
      //   cheetah  -> logo, hero and section titles (brand script)
      //   display  -> headings, card titles, prices (Fraunces serif)
      //   sans     -> all body text, buttons, labels (Lexend)
      fontFamily: {
        sans: ["Lexend", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
        cheetah: ["Cheetah Kick", "cursive"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Villa Aurora brand colors
        "villa-dark-brown": "hsl(var(--villa-dark-brown))",
        "villa-warm-brown": "hsl(var(--villa-warm-brown))",
        "villa-gold": "hsl(var(--villa-gold))",
        "villa-forest-green": "hsl(var(--villa-forest-green))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // Powers the open/close animations of the photo viewer and tabs
  plugins: [animate],
} satisfies Config;
