import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#15264D",
        "navy-deep": "#0F1C3D",
        cream: "#F5F0E2",
        "cream-soft": "#FAF6E8",
        "cream-deep": "#EFE8D2",
        coral: "#E85A2C",
        "coral-light": "#FFB892",
        sage: "#4A6B4E",
        "sage-light": "#A8BFA7",
        burgundy: "#7A2F2F",
        ink: "#0A0A0A",
        "ink-soft": "#1A1A1A",
        sand: "#6B6353",
        "sand-light": "#B5AB95",
        rule: "rgba(10,10,10,0.16)",
        "rule-soft": "rgba(10,10,10,0.08)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter Tight", "Inter", "system-ui", "sans-serif"],
        serif: ["Source Serif 4", "Georgia", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.035em",
      },
      maxWidth: {
        article: "600px",
        prose: "640px",
      },
    },
  },
  plugins: [],
};

export default config;
