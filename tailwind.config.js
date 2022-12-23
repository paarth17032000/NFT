/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'templateCustom': 'repeat(auto-fill, minmax(330px, 1fr))',
        'myTemplateCustom': 'repeat(auto-fill, minmax(400px, 1fr))'
      },
    },
  },
  plugins: [],
}
