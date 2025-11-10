import { ReactNode } from "react";
import { View } from "react-native";

interface FlexProps {
  children: ReactNode;
  items: string;
  justify: string;
  flexDir?: "row" | "row-reverse" | "column" | "column-reverse";
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  gap?: number;
}

export default function Flex({
  children,
  items,
  justify,
  flexDir,
  flexWrap,
  gap,
}: FlexProps) {
  return (
    <View
      className={`items-${items} justify-${justify} flex-${flexWrap}`}
      style={{
        ...(flexDir && { flexDirection: flexDir }),
        ...(gap && { gap }),
      }}
    >
      {children}
    </View>
  );
}
