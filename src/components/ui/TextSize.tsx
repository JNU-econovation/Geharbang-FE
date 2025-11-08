import { Text } from "react-native";

import { TextSizeProps } from "@/src/types/ui/TextSize";

export default function TextSize({
  size,
  color,
  weight,
  content,
}: TextSizeProps) {
  return (
    <Text style={{ fontSize: size, color, fontWeight: weight }}>{content}</Text>
  );
}
