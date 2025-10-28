import { ReactNode } from "react";
import { View } from "react-native";

interface FlexProps {
  children: ReactNode;
  items: string;
  justify: string;
}

export default function Flex({ children, items, justify }: FlexProps) {
  return (
    <View className={`items-${items} justify-${justify} `}>{children}</View>
  );
}
