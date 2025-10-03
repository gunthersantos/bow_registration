module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
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
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}