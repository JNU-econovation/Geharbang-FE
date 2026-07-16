import React, { ReactNode } from "react";
import { ScrollView } from "react-native";

interface HorizontalSliderProps<T> {
  data: readonly T[];
  renderItem: (item: T) => ReactNode;
  renderMoreCard?: ReactNode;
}

export default function HorizontalSlider<T>({
  data,
  renderItem,
  renderMoreCard,
}: HorizontalSliderProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="px-5 py-1 gap-3"
    >
      {data.map((item) => renderItem(item))}

      {renderMoreCard && renderMoreCard}
    </ScrollView>
  );
}
