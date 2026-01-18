import { tv } from "tailwind-variants";

export const button = tv({
  base: "rounded-xl flex-row items-center justify-center active:opacity-80",
  variants: {
    variant: {
      primary: "bg-primary-blue border border-gray-border",
      kakao: "bg-kakao border border-gray-border",
      google: "border border-google",
      white: "bg-white border border-gray-border",
      gray: "bg-gray-button border border-gray-border",
      red: "bg-primary-red",
      blue: "bg-blue-bg border border-primary-blue",
      green: "bg-green-bg border border-green-text"
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
