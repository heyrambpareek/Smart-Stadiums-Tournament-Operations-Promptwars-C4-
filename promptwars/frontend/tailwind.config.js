/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fifa: {
          blue: '#1B1464',
          teal: '#00A499',
          yellow: '#FFC800',
          red: '#ED1C24',
          dark: '#0A0A0A',
          card: '#1F1F1F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
