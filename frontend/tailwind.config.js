/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.jsx"
  ],
  theme: {
    extend: {
      colors: {
        'truman-purple': '#510C76',
        'truman-blue' : '#00aae2',
        'truman-brown' : '#887722'
      }
    },
  },
  plugins: [],
}

