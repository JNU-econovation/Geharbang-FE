import { Text } from "react-native";

interface TextSizeProps {
  size: number;
  color: string;
  content: string;
}

export default function TextSize({ size, color, content }: TextSizeProps) {
  return <Text style={{ fontSize: size, color }}>{content}</Text>;
}
