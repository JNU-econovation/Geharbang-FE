import { ReactNode } from "react";
import { Text, View } from "react-native";

interface ButtonProps {
  width: string;
  height: string;
  bgColor: string;
  content: string;
  textColor: string;
  border?: string;
  icon?: ReactNode;
}

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
      className={`w-${width} h-${height} rounded-xl flex-row items-center justify-center  `}
      style={{
        backgroundColor: bgColor,
        borderWidth: border ? 1 : 0,
        borderColor: border || "transparant",
      }}
    >
      {icon && icon}
      <Text className={`text-base pl-2`} style={{ color: textColor }}>
        {content}
      </Text>
    </View>
  );
}
