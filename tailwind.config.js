/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,js}", "./public/**/*.{html,ts,js}"],
  theme: {
    extend: {
      fontFamily: {
        great: ["'Great Vibes'", "cursive"],
        merienda: ["'Merienda'", "cursive"],
      },
    },
  },
  plugins: [],
};
