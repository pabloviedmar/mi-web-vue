/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-purple': '#b026ff',
        'neon-green': '#39ff14',
        'dark-bg': '#0f172a', // slate-900
        'card-bg': '#1e293b', // slate-800
      }
    },
  },
  plugins: [],
}
