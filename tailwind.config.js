/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        jura: ["Jura", "sans-serif"],
      },
      backgroundImage: {
        hero: "url('./util/background.jpg')",
      },
      colors: {
        topGray: "#5a5b5d",
        bottomGray: "#232323",
      },
    },
  },
  plugins: [],
};
