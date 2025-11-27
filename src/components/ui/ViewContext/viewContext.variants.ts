import { tv } from "tailwind-variants";

export const viewContext = tv({
  base: "rounded-lg ",
  variants: {
    variant: {
      primary: "bg-[#F9FAFB] border border-[#ffffff]",
      insta: "bg-[#FAF5FF] border border-[#E9D4FF]",
      phone: "bg-[#F0FDF4] border border-[#B9F8CF]",
      email: "bg-[#EFF6FF] border border-[#BEDBFF]",
      webSite: "bg-[#F9FAFB] border border-[#E5E7EB]",
      owerMes: "bg-[#FFFBEB] border border-[#FEE685]",
      modalApply: "bg-[#ffffff] border border-[#E5E7EB]",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
