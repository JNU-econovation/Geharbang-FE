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
    <Pressable
      hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
      className='min-w-[58px] h-10 px-2 items-center justify-center'
      onPress={() => handleSectionToScroll(section)}
    >
      <TextSize
        content={content}
        size={14}
        color={isActive ? "#0084D1" : "#6A7282"}
      />
      <View
        className='absolute bottom-0 left-2 right-2 border-b-2'
        style={{ borderColor: isActive ? "#0084D1" : "transparent" }}
      />
    </Pressable>
  );
}
