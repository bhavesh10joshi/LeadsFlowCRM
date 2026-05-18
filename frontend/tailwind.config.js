/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend : {
      colors : {
        blue : 
        {
          500 : "#004ac6" , 
          300 : "#2563eb"
        }
    }
    }
  },
  plugins: [],
}
