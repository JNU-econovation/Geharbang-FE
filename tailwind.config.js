import { COLORS } from "./src/utils/constants/colors.ts";
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
        primary: {
          blue: COLORS.PRIMARY.BLUE,
          red: COLORS.PRIMARY.RED,
        },
        gray: {
          border: COLORS.GRAY.BORDER,
          text: COLORS.GRAY.TEXT,
          placeholder: COLORS.GRAY.PLACEHOLDER,
          button: COLORS.GRAY.BUTTON,
        },
        green: {
          text: COLORS.GREEN.TEXT,
          bg: COLORS.GREEN.BG,
        },
        blue: {
          bg: COLORS.BLUE.BG,
        },
        purple: {
          text: COLORS.PURPLE.TEXT,
          bg: COLORS.PURPLE.BG,
        },
        kakao: COLORS.KAKAO,
        google: COLORS.GOOGLE,
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
