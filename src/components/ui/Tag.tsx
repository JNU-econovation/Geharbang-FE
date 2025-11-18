import { COLORS } from "@/src/utils/constants/colors";
import { View } from "react-native";
import TextSize from "./TextSize";

interface TagProps {
  size: number;
  content: string;
}

export default function Tag({ size, content }: TagProps) {
  return (
    <View className="bg-[#0EA5E910] rounded-xl py-1 px-2 border border-blue-100 self-start ">
      <TextSize size={size} color={COLORS.PRIMARY.BLUE} content={content} />
    </View>
  );
}
