/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'splash': "url('/splash.png')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
}

