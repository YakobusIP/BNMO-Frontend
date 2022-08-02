/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      extend: {
          colors: {
              'theme-1': '#00FF94',
              'theme-2': '#FF4545',
              'theme-3': '#FAFF00',
          },
          fontFamily: {
              main: ['Chau Philomene One']
          },
          spacing: {
              '128': '32rem',
          },
          maxWidth: {
            '40': '40%',
            '60': '60%',
          },
          maxHeight: {
            'screen-fit': '50vh',
          }
      },
  },
  plugins: [],
}
