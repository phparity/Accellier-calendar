/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      width: {
        '1/7': '14.2857143%', // 100% / 7
      },
    },
  },
  plugins: [ ],
}