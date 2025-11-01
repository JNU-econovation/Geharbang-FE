import { ReactNode } from "react";
import { View } from "react-native";

interface FlexProps {
  children: ReactNode;
  items: string;
  justify: string;
  flexDir?: "row" | "row-reverse" | "column" | "column-reverse";
}

export default function Flex({ children, items, justify, flexDir }: FlexProps) {
  return (
    <View
      className={`items-${items} justify-${justify}`}
      style={{ ...(flexDir && { flexDirection: flexDir }) }}
    >
      {children}
    </View>
  );
}
