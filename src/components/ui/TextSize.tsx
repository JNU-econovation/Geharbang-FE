import { Text, TextStyle } from "react-native";

interface TextSizeProps {
  size: number;
  color?: string;
  content?: string;
  weight?: TextStyle["fontWeight"];
}

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
