import TextSize from "@/src/components/ui/TextSize";
import { ReactNode } from "react";

import { View } from "react-native";

interface SectionYPositionProps {
  section: string;
  content: string;
  children: ReactNode;
  setSectionYPositions: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
}

export default function SectionYPosition({
  section,
  content,
  children,
  setSectionYPositions,
}: SectionYPositionProps) {
  return (
    <View
      onLayout={(e) => {
        const y = e.nativeEvent.layout.y;
        setSectionYPositions((prev) => ({
          ...prev,
          [section]: y,
        }));
      }}
    >
      <TextSize content={content} size={20} color='#101828' weight={"bold"} />
      {children}
    </View>
  );
}
