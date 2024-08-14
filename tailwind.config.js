/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        main :{
          50 : '#EDFCFF',
          100 : '#D6F7FF',
          200 : '#B5F3FF',
          300 : '#83EEFF',
          400 : '#48E1FF',
          500 : '#1EC7FF',
          600 : '#06ACFF',
          700 : '#0099FF',
          800 : '#0874C5',
          900 : '#0D629B',
          950 : '#0E3B5D',
        },
        secondary: "#18181b"
      }
    },
  },
  plugins: [],
}

