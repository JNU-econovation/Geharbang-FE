import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface BackArrowProps {
  onPress: () => void;
  size: number;
  color: string;
}

export default function BackArrow({ onPress, size, color }: BackArrowProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name='arrow-back' size={size} color={color} />
    </TouchableOpacity>
  );
}
