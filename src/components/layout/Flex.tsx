import { View } from "react-native";
import { FlexProps } from "@/src/types/ui/Flex";

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
