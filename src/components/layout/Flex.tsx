import { View } from "react-native";

import { FlexProps } from "@/src/types/ui/Flex";

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
