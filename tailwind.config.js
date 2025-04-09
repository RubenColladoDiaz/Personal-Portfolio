/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'montserrat': ['Montserrat', 'sans-serif'],
          'poppins': ['Poppins', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }