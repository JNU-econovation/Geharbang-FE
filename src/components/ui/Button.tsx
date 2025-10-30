import { ReactNode } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";

interface ButtonProps {
  width: number;
  height: number;
  bgColor: string;
  content: string;
  textColor: string;
  border?: string;
  icon?: ReactNode;
  onPress?: () => void;
  isPending?: boolean;
}

export default function Button({
  width,
  height,
  bgColor,
  textColor,
  content,
  border,
  icon,
  onPress,
  isPending,
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
      {isPending ? (
        <ActivityIndicator color='#000000' />
      ) : (
        <>
          {icon && <Text> {icon} </Text>}
          <View style={{ width: 3 }} />
          <TextSize size={16} color={textColor} content={content} />
        </>
      )}
    </Pressable>
  );
}
