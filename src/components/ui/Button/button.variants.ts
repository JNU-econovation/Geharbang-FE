import { tv } from "tailwind-variants";

export const button = tv({
  base: "rounded-xl flex-row items-center justify-center active:opacity-80",
  variants: {
    variant: {
      primary: "bg-primary border border-primaryBorder",
      kakao: "bg-kakao border border-primaryBorder",
      google: "border border-googleBorder",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
