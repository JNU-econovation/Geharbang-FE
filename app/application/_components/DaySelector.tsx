import Checkbox from "expo-checkbox";
import React from "react";
import { Pressable, View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import TextSize from "@/src/components/ui/TextSize";
import { useMultiSelect } from "@/src/hooks/useMultiSelect";
import { COLORS } from "@/src/utils/constants/colors";
import { DAYS_OF_WEEK } from "@/src/utils/constants/options";

interface DaySelectorProps {
  selectedDays: string[];
  setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function DaySelector({
  selectedDays,
  setSelectedDays,
}: DaySelectorProps) {
  const { toggleSelect } = useMultiSelect(setSelectedDays);

  return (
    <Flex justify="between" items="center" flexDir="row" flexWrap="wrap">
      {DAYS_OF_WEEK.map((day) => {
        const isSelected = selectedDays.includes(day.value);

        return (
          <View className="w-[13%] mt-2" key={day.value}>
            <Pressable
              className="rounded-lg border border-gray-border py-2.5"
              onPress={() => toggleSelect(day.value)}
            >
              <Flex justify="center" items="center" gap={3}>
                <Checkbox
                  style={{
                    width: 18,
                    height: 18,
                    borderWidth: 1,
                  }}
                  value={isSelected}
                  color={isSelected ? COLORS.PRIMARY.BLUE : "lightgray"}
                  onValueChange={() => toggleSelect(day.value)}
                />

                <TextSize
                  size={16}
                  color={COLORS.GRAY.TEXT}
                  content={day.label}
                />
              </Flex>
            </Pressable>
          </View>
        );
      })}
    </Flex>
  );
}
