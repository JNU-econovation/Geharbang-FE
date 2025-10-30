import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { BackArrowProps } from "@/src/types/ui/BackArrow";

export default function BackArrow({
  onPress,
  name,
  size,
  color,
}: BackArrowProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}
