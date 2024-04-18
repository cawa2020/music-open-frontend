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
    extend: {
      textColor: {
        'default': 'var(--text-color)',
        'secondary': 'var(--text-color-secondary)',
        'main': 'var(--main-color)',
      },
      backgroundColor: {
        'default': 'var(--bg-color-main)',
        'secondary': 'var(--bg-color-secondary)',
        'main': 'var(--main-color)',
      },
      borderColor: {
        'default': 'var(--border-color)',
      },
      transitionProperty: {
        'default': 'var(--transition-time)'
      },
      borderRadius: {
        'default': 'var(--border-radius)'
      }
    },
  },
  plugins: [],
}

