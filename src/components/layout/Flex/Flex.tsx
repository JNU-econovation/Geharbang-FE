import { ReactNode } from "react";
import { View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { flex } from "./flex.variant";

interface FlexProps extends ViewProps {
  children: ReactNode;
  items?: "start" | "center" | "end" | "between";
  justify?: "start" | "center" | "end" | "between";
  dir?: "row" | "col" | "rowReverse" | "colReverse";
  wrap?: "wrap" | "nowrap" | "reverse";
  gap?: number;
}

export default function Flex({
  children,
  items,
  justify,
  dir,
  wrap,
  gap,
  ...props
}: FlexProps) {
  return (
    <View
      className={twMerge(flex({ items, justify, dir, wrap }))}
      style={{
        ...(gap && { gap }),
      }}
      {...props}
    >
      {children}
    </View>
  );
}
