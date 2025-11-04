import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";

interface BackArrowProps {
  size: number;
  color: string;
}

export default function BackArrow({ size, color }: BackArrowProps) {
  return (
    <Pressable onPress={() => router.back()}>
      <Ionicons name='arrow-back' size={size} color={color} />
    </Pressable>
  );
}
