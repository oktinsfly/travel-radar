/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d8efff',
          200: '#b9e3ff',
          300: '#87d1ff',
          400: '#4fb4ff',
          500: '#2590ff',
          600: '#0e70f6',
          700: '#0957e2',
          800: '#0e46b7',
          900: '#123e8f',
        }
      }
    },
  },
  plugins: [],
}
