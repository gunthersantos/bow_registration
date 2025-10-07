/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'bow-indigo': '#6366f1',
        'bow-pink': '#e0aaff',
        'bow-yellow': '#f5e960',
        'bow-teal': '#1fcfcf'
      },
      fontFamily: {
        'sans': ['Inter', 'Arial', 'sans-serif'],
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
}