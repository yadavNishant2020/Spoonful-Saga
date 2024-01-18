/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'home-background': "url('img/background.jpeg')",
        'recipe-background': "url('img/recipeBg.jpeg')",
      },
      colors: {
        'light-green': '#91C851',
      },
    },
  },
  plugins: [],
};
