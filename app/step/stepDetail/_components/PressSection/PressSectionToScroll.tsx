import { Pressable, View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";

interface PressSectionToScrollProps {
  section: string;
  content: string;
  handleSectionToScroll: (key: string) => void;
  isActive: boolean;
}

export default function PressSectionToScroll({
  section,
  content,
  handleSectionToScroll,
  isActive,
}: PressSectionToScrollProps) {
  return (
    <Pressable onPress={() => handleSectionToScroll(section)}>
      <TextSize
        content={content}
        size={14}
        color={isActive ? "#0084D1" : "#6A7282"}
      />
      <View className='pt-5' />
      {isActive && <View className='border border-b border-[#0084D1]' />}
    </Pressable>
  );
}
