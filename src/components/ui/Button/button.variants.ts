import { tv } from "tailwind-variants";

export const button = tv({
  base: "rounded-xl flex-row items-center justify-center active:opacity-80",
  variants: {
    variant: {
      primary: "bg-primary-blue border border-gray-border",
      kakao: "bg-kakao border border-gray-border",
      google: "border border-google",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
