/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    colors: {
      acid: '#B2DF28',
      gray: {
        superLight: '#919E9E',
        light: '#3C3E44',
        DEFAULT: '#272B33',
        dark: '#202329',
      },
      white: '#F5F5F5',
      orange: '#FF9800',
      red: '#D63D2E',
      green: '#55CC44',
    },
    fontFamily: {
      schwifty: ['SchwiftyFont', 'Roboto'],
      acme: ['AcmeFont', 'Roboto'],
      system: [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
      ],
    },
  },
};
export const plugins = [];
