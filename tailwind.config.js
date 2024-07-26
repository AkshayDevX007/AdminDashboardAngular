/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "emerald"],
  },
  plugins: [require('daisyui'),],
}

