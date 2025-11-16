import { tv } from "tailwind-variants";

export const flex = tv({
  base: "flex",
  variants: {
    items: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },

    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },

    dir: {
      row: "flex-row",
      col: "flex-col",
      rowReverse: "flex-row-reverse",
      colReverse: "flex-col-reverse",
    },

    wrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      reverse: "flex-wrap-reverse",
    },
  },
});
