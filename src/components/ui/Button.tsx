import { Text, View, Pressable } from "react-native";

import TextSize from "@/src/components/ui/TextSize";
import { ButtonProps } from "@/src/types/ui/Button";

export default function Button({
  width,
  height,
  bgColor,
  textColor,
  content,
  border,
  icon,
  onPress
}: ButtonProps) {
  return (
    <Pressable
      className={`rounded-xl flex-row items-center justify-center`}
      style={{
        width: width,
        height: height,
        backgroundColor: bgColor,
        borderWidth: border ? 1 : 0,
        borderColor: border || "transparent",
      }}
      onPress={onPress}
    >
      {icon && <Text> {icon} </Text>}
      <View style={{ width: 3 }} />
      <TextSize size={16} color={textColor} content={content} />
    </Pressable>
  );
}
