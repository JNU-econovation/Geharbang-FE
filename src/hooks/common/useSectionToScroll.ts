import { useCallback, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";

export const useSectionToScroll = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const containerOffsetRef = useRef<number>(0);
  const stickyHeaderHeightRef = useRef<number>(0);
  const sectionYPositionsRef = useRef<{ [key: string]: number }>({});
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const [sectionYPositions, setSectionYPositions] = useState<{
    [key: string]: number;
  }>({});

  const updateSectionYPositions = useCallback(
    (
      updater:
        | { [key: string]: number }
        | ((prev: { [key: string]: number }) => { [key: string]: number }),
    ) => {
      setSectionYPositions((prev) => {
        const next =
          typeof updater === "function" ? updater(sectionYPositionsRef.current) : updater;
        sectionYPositionsRef.current = next;
        return next;
      });
    },
    [],
  );

  const setContainerOffset = (y: number) => {
    containerOffsetRef.current = y;
  };

  const setStickyHeaderHeight = (h: number) => {
    stickyHeaderHeightRef.current = h;
  };

  const getActiveSection = (scrollY: number, sectionOrder: string[]) => {
    const sectionYPositions = sectionYPositionsRef.current;
    const currentY =
      scrollY - containerOffsetRef.current + stickyHeaderHeightRef.current + 32;

    return sectionOrder.reduce((activeSection, section) => {
      const sectionY = sectionYPositions[section];

      if (sectionY !== undefined && sectionY <= currentY) {
        return section;
      }

      return activeSection;
    }, sectionOrder[0]);
  };

  const createSectionScrollHandler =
    (sectionOrder: string[], onSectionChange: (section: string) => void) =>
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isProgrammaticScrollRef.current) return;

      const activeSection = getActiveSection(
        event.nativeEvent.contentOffset.y,
        sectionOrder,
      );

      onSectionChange(activeSection);
    };

  const sectionToScroll = (key: string, retryCount = 0) => {
    const localY = sectionYPositionsRef.current[key] ?? sectionYPositions[key];
    if (localY === undefined) {
      if (retryCount < 3) {
        setTimeout(() => sectionToScroll(key, retryCount + 1), 100);
      }
      return;
    }

      const absoluteY =
        containerOffsetRef.current + localY - stickyHeaderHeightRef.current - 16;
      isProgrammaticScrollRef.current = true;
      if (programmaticScrollTimerRef.current) {
        clearTimeout(programmaticScrollTimerRef.current);
      }
      programmaticScrollTimerRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 450);
      scrollViewRef.current?.scrollTo({ y: absoluteY, animated: true });
  };

  return {
    scrollViewRef,
    sectionToScroll,
    setSectionYPositions: updateSectionYPositions,
    setContainerOffset,
    setStickyHeaderHeight,
    createSectionScrollHandler,
  };
};
