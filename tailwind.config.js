/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'schwifty-font': ['SchwiftyFont', 'Roboto'],
      },
    },
  },
  plugins: [],
}

