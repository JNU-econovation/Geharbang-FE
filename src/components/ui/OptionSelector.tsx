import React from "react";
import { DimensionValue, Pressable, Text, View } from "react-native";

import { Option } from "@/src/types/Option";
import { COLORS } from "@/src/utils/constants/colors";

interface OptionSelectorProps<T> {
  selected: T;
  setSelected: (value: T) => void;
  size: DimensionValue;
  option: Option<T>[];
  error?: boolean;
}

export default function OptionSelector<T>({
  selected,
  setSelected,
  size,
  option,
  error,
}: OptionSelectorProps<T>) {
  return (
    <>
      <View className='flex-row flex-wrap justify-center gap-1'>
        {option.map((data) => {
          const isSelected = selected === data.value;

          return (
            <Pressable
              key={String(data.value)}
              className='w-[43%] flex-row justify-center gap-3 rounded-lg border border-border-gray items-center py-3.5'
              style={[
                { width: size },
                error
                  ? { borderColor: COLORS.PRIMARY.RED }
                  : isSelected
                  ? {
                      backgroundColor: "#EFF6FF",
                      borderColor: COLORS.PRIMARY.BLUE,
                    }
                  : { borderColor: COLORS.GRAY.BORDER },
              ]}
              onPress={() => {
                setSelected(data.value);
              }}
            >
              <View
                className={`rounded-full w-3.5 h-3.5 ${
                  isSelected
                    ? "bg-primary-blue"
                    : " border border-gray-placeholder"
                }`}
              ></View>

              <Text>{data.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
}
