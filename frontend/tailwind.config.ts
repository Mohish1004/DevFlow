import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#A764FF",
          deep: "#8957DB",
          surface: "#0A0718",
          card: "#101017",
          light: "#FFFFFF",
          ink: "#18181B",
          muted: "#5F5B73",
        },
      },
      boxShadow: {
        glow: "0 30px 80px rgba(67, 56, 202, 0.35)",
        panel: "0 24px 70px rgba(7, 9, 23, 0.28)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #a764ff 0%, #9f72f3 42%, #8b7be8 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
