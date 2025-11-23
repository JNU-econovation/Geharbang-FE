import { useRef, useState } from "react";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

export const useSectionToScroll = () => {
  const scrollViewRef = useRef<ScrollView>(null);

  const [sectionYPositions, setSectionYPositions] = useState<{
    [key: string]: number;
  }>({});

  const sectionToScroll = (key: string) => {
    const y = sectionYPositions[key];
    if (y !== undefined) {
      scrollViewRef.current?.scrollTo({ y, animated: true });
    }
  };

  return {
    scrollViewRef,
    sectionToScroll,
    setSectionYPositions,
  };
};
