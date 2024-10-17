import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui],
  theme: {
    fontFamily: {
      sans: ["Dosis", "sans-serif"],
    },
    extend: {
      boxShadow: {
        "text-shadow": "2px 2px 5px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  daisyui: {
    // base: false, // applies background color and foreground color for root element by default
    themes: [
      {
        main: {
          "base-100": "#ededed", // Base color of page, used for blank backgrounds + "FOCUS" bg-color
          "base-content": "#3C3C3C", // Foreground content color to use on base color	optional + "FOCUS" color
          // neutral: "#000", // "ACTIVE" bg-color
          // "neutral-content": "#000", // "Click" "ACTIVE" color
          primary: "#D17A44",
          "primary-content": "#FAF7F2",
          secondary: "#DEAC80",
          "secondary-content": "#3C3C3C",
          accent: "#8FB986",
          "accent-content": "#3C3C3C",

          info: "#006cd5",
          success: "#00c000",
          warning: "#ff7f00",
          error: "#e12154",

          ".btn-xs": {
            height: "1.5rem",
            "min-height": "1.5rem",
          },
          ".btn-sm": {
            height: "2rem",
            "min-height": "2rem",
          },
          ".btn-md": {
            height: "2.5rem",
            minHeight: "2.5rem",
          },
          ".btn-lg": {
            height: "3rem",
            minHeight: "3rem",
          },
        },
        navbar: {
          "base-100": "#ededed",
          "base-content": "#fff", // "FOCUS" color
          "neutral-content": "#fff", // "Click" "ACTIVE" color
        },
        form: {},
      },
      "dark",
    ],
  },
};
