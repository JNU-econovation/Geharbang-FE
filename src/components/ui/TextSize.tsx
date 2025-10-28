import { Text } from "react-native";

interface TextSizeProps {
  size: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  color: string;
  content: string;
}

export default function TextSize({ size, color, content }: TextSizeProps) {
  return (
    <Text className={`text-${size}`} style={{ color }}>
      {content}
    </Text>
  );
}
