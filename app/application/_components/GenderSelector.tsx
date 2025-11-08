import React from "react";
import { DimensionValue, Pressable, Text, View } from "react-native";

import { Gender } from "@/src/types/Gender";
import { Option } from "@/src/types/Option";
import { COLORS } from "@/src/utils/constants/colors";

interface GenderSelectorProps {
  selectedGender: Gender;
  setSelectedGender: (gender: Gender) => void;
  size: DimensionValue;
  option: Option<Gender>[];
  error?: boolean;
}

export default function GenderSelector({
  selectedGender,
  setSelectedGender,
  size,
  option,
  error,
}: GenderSelectorProps) {
  return (
    <View>
      <View className="flex-row flex-wrap justify-center gap-1">
        {option.map((data) => {
          const isSelected = selectedGender === data.value;

          return (
            <Pressable
              key={data.value}
              className="w-[43%] flex-row justify-center gap-3 rounded-lg border border-border-gray items-center py-3.5"
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
                setSelectedGender(data.value);
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
    </View>
  );
}
