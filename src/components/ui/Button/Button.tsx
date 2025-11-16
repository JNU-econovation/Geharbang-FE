import { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  View,
} from "react-native";
import { twMerge } from "tailwind-merge";

import TextSize from "@/src/components/ui/TextSize";
import { button } from "./button.variants";

interface ButtonProps extends PressableProps {
  variant: "primary" | "kakao" | "google" | "white" | "gray";
  width?: number;
  height: number;
  content: string;
  textColor: string;
  icon?: ReactNode;
  onPress?: () => void;
  isPending?: boolean;
  className?: string;
}

export default function Button({
  variant,
  width,
  height,
  textColor,
  content,
  icon,
  onPress,
  isPending,
  className,
}: ButtonProps) {
  return (
    <Pressable
      className={twMerge(button({ variant }), className)}
      style={{
        width,
        height,
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
