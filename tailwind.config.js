/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-blue": "#d8f5fd",
        "primary-color": "red-500",
        "secondary-color": "cyan-500"
      }
    },
  },
  plugins: [],
}

