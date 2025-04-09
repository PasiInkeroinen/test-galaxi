/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        xamk: {
          blue: "#0053A0",
          dark: "#002F4B",
          light: "#F2F2F2",
          black: "#1D1D1B",
        },
      },
    },
  },
  plugins: [],
};
