/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    colors: {
      acid: '#B2DF28',
    },
    fontFamily: {
      'schwifty': ['SchwiftyFont', 'Roboto'],
      'acme': ['AcmeFont', 'Roboto'],
    },
  },
};
export const plugins = [];
