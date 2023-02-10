/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      small: "320px",
      medium: "375px",
      large: "425px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    extend: {},
  },
  plugins: [],
};
