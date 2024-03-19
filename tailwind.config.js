/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'sm': '500px',
      'md': '600px',
      'lg': '800px',
      'xl': '1000px',
      '2xl': '1200px',
      '3xl': '1400px',
      '4xl': '1600px',
    },
    extend: {},
  },
  plugins: [],
}

