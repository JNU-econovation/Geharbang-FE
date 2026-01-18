import { Text, TextStyle } from "react-native";

interface TextSizeProps {
  size: number;
  color?: string;
  content?: string;
  weight?: TextStyle["fontWeight"];
  align?: TextStyle["textAlign"];
}

export default function TextSize({
  size,
  color,
  weight,
  content,
  align= 'left',
}: TextSizeProps) {
  return (
    <Text
      allowFontScaling={false}
      style={{
        fontSize: size,
        color,
        fontWeight: weight,
        flexShrink: 1,
        textAlign: align,
      }}
    >
      {content}
    </Text>
  );
}
