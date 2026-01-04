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
    <Text
      allowFontScaling={false}
      style={{ fontSize: size, color, fontWeight: weight, flexShrink: 1 }}
    >
      {content}
    </Text>
  );
}
