import { Text } from "react-native";

import { TextSizeProps } from "@/src/types/ui/TextSize";

export default function TextSize({ size, color, content }: TextSizeProps) {
  return <Text style={{ fontSize: size, color }}>{content}</Text>;
}
