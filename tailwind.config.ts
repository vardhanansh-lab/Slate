import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      micro: ["0.75rem", { lineHeight: "1.4" }],
      small: ["0.8125rem", { lineHeight: "1.5" }],
      body: ["0.9375rem", { lineHeight: "1.6" }],
      "body-lg": ["1.0625rem", { lineHeight: "1.6" }],
      h3: ["1.125rem", { lineHeight: "1.4", letterSpacing: "-0.005em" }],
      h2: ["1.375rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
      h1: ["2rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      display: ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        tint: "var(--tint)",
        border: "var(--border)",
        error: "var(--error)",
        "error-soft": "var(--error-soft)",
      },
      fontFamily: {
        head: ["var(--font-head)", "ui-sans-serif", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};
export default config;
