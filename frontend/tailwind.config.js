/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [ "Lexend Deca", "sans-serif" ]
      },
      colors: {
        "custom-green": "#447159",
      },
    },
  },
  plugins: [],
};
