import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface BackArrowProps {
  onPress: () => void;
  name: "arrow-back";
  size: number;
  color: string;
}

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
