/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#d3dce7',
        'custom-green': '#00FF00'
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      },
      animation: {
        twinkle: 'twinkle 1.5s infinite',
      },
    },
  },
  plugins: [],
}
