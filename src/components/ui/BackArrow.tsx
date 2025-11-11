import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";

interface BackArrowProps {
  size: number;
  color: string;
  onPress?: () => void;
}

export default function BackArrow({ size, color, onPress }: BackArrowProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <Ionicons name="arrow-back" size={size} color={color} />
    </Pressable>
  );
}
