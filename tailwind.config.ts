import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          navy: {
            DEFAULT: "#0E1B2E",
            50: "#E9EDF3",
            100: "#C7D1E1",
            200: "#9FAFCB",
            300: "#768DB5",
            400: "#4D6B9F",
            500: "#2B4770",
            600: "#1E3557",
            700: "#15263F",
            800: "#0E1B2E",
            900: "#0A1320",
            950: "#050910",
          },
          gold: {
            DEFAULT: "#FFC20E",
            50: "#FFFBE6",
            100: "#FFF6BF",
            200: "#FFED8F",
            300: "#FFE45F",
            400: "#FFDC36",
            500: "#FFC20E",
            600: "#D9A005",
            700: "#B38000",
            800: "#8C6100",
            900: "#664500",
          },
          card: {
            DEFAULT: "#13233A",
            hover: "#1A2E4B",
            border: "#1F385C",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        gold: "0 0 25px -5px rgba(255, 194, 14, 0.25)",
        "gold-lg": "0 0 40px -5px rgba(255, 194, 14, 0.35)",
        navy: "0 10px 30px -10px rgba(10, 19, 32, 0.7)",
      },
      keyframes: {
        pulseFast: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "pulse-fast": "pulseFast 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
