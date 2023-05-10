/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xxs': '360px',
      'xs': '430px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        "light-blue": "#398D9D",
        "dark-blue": "#005276",
        "header-color": "#131921",
        "sad-yellow": "#F3A847",
        "happy-yellow": "#FFCC4B",
        "happy-yellow-hover": "#f0b729",
        "dark-gray": "#242F3E",
        "medium-gray": "#485868",
        "orange": "#C7511F",
        "light-gray": "#EAEDED"
      }
    },
  },
  plugins: [],
}

