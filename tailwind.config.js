/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-instrument-sans)', 'sans-serif'],
        ditty: ['var(--font-ditty)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
