import { useRef, useState } from "react";
import { ScrollView } from "react-native";

export const useSectionToScroll = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const containerOffsetRef = useRef<number>(0);
  const stickyHeaderHeightRef = useRef<number>(0);

  const [sectionYPositions, setSectionYPositions] = useState<{
    [key: string]: number;
  }>({});

  const setContainerOffset = (y: number) => {
    containerOffsetRef.current = y;
  };

  const setStickyHeaderHeight = (h: number) => {
    stickyHeaderHeightRef.current = h;
  };

  const sectionToScroll = (key: string) => {
    const localY = sectionYPositions[key];
    if (localY !== undefined) {
      const absoluteY =
        containerOffsetRef.current + localY - stickyHeaderHeightRef.current - 16;
      scrollViewRef.current?.scrollTo({ y: absoluteY, animated: true });
    }
  };

  return {
    scrollViewRef,
    sectionToScroll,
    setSectionYPositions,
    setContainerOffset,
    setStickyHeaderHeight,
  };
};
