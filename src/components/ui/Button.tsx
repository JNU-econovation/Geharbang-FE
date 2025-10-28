import { ReactNode } from "react";
import { Text, View } from "react-native";

interface ButtonProps {
  width: number;
  height: number;
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
      className={`rounded-xl flex-row items-center justify-center  `}
      style={{
        width: width,
        height: height,
        backgroundColor: bgColor,
        borderWidth: border ? 1 : 0,
        borderColor: border || "transparant",
      }}
    >
      {icon && icon}
      <Text className='text-base pl-2' style={{ color: textColor }}>
        {content}
      </Text>
    </View>
  );
}
