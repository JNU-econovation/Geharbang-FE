import { Text, View } from "react-native";

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
}: ButtonProps) {
  return (
    <View
      className={`rounded-xl flex-row items-center justify-center gap-2`}
      style={{
        width: width,
        height: height,
        backgroundColor: bgColor,
        borderWidth: border ? 1 : 0,
        borderColor: border || "transparant",
      }}
    >
      {icon && <Text> {icon} </Text>}
      <TextSize size={16} color={textColor} content={content} />
    </View>
  );
}
