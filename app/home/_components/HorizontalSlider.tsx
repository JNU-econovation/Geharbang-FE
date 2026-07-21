import React, { ReactNode } from "react";
import { ScrollView, StyleProp, ViewStyle } from "react-native";

interface HorizontalSliderProps<T> {
  data: readonly T[];
  renderItem: (item: T) => ReactNode;
  renderMoreCard?: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function HorizontalSlider<T>({
  data,
  renderItem,
  renderMoreCard,
  contentContainerStyle,
}: HorizontalSliderProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
    >
      {data.map((item) => renderItem(item))}

      {renderMoreCard && renderMoreCard}
    </ScrollView>
  );
}
