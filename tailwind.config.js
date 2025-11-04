/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0EA5E9",
        kakao: "#FACC15",
        primaryBorder: "#E5E7EB",
        googleBorder: "#D1D5DB",
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
