import { COLORS } from "./src/utils/constants/Colors.ts";
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: COLORS.PRIMARY.BLUE,
          red: COLORS.PRIMARY.RED,
        },
        gray: {
          border: COLORS.GRAY.BORDER,
          text: COLORS.GRAY.TEXT,
          placeholder: COLORS.GRAY.PLACEHOLDER,
        },
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
