import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-geist-sans), sans-serif",
        mono: "var(--font-geist-mono), monospace",
        montserrat: "var(--font-montserrat), sans-serif",
      },
      colors: {
        "main-blue" : "#343C6A"
      },
    },
  },
  plugins: [],
};
export default config;
