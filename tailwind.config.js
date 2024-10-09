/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accentGreen: '#128350',
        white: '#f1f1f1',
        mainBG: '#e5e4e4',
        modalOverlay: 'rgba(0 0 0 / 20%)',
      },
      height: {
        'screen-minus-105': 'calc(100vh - 105px)',
      },
    },
  },
  plugins: [],
};
