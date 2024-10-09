import daisyui from "daisyui";
import tailwindcssGridAreas from "@savvywombat/tailwindcss-grid-areas";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui, tailwindcssGridAreas],
  theme: {
    fontFamily: {
      sans: ["Dosis", "sans-serif"],
    },
    extend: {
      gridTemplateAreas: {
        editor: ["navbar navbar", "main main"],
        "editor-sidebar": ["navbar navbar", "sidebar main"],
      },
    },
  },
  daisyui: {
    // base: false, // applies background color and foreground color for root element by default
    themes: [
      {
        main: {
          "base-100": "#f7f1ea", // Base color of page, used for blank backgrounds + "FOCUS" bg-color
          // "base-content": "yellow", // Foreground content color to use on base color	optional + "FOCUS" color

          // neutral: "#000", // "ACTIVE" bg-color
          // "neutral-content": "#000", // "Click" "ACTIVE" color

          primary: "#8A624B",
          secondary: "#B19175",
          accent: "#f7f1ea",
          info: "#006cd5",
          success: "#00c000",
          warning: "#ff7f00",
          error: "#e12154",

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
