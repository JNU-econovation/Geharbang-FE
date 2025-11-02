import { useMultiSelect } from "@/src/hooks/useMultiSelect";
import { COLORS } from "@/src/utils/constants/Colors";
import { Checkbox } from "expo-checkbox";
import React from "react";
import { Pressable, Text, View } from "react-native";
import FieldLabel from "./FieldLabel";

interface DayOption {
  value: string;
  label: string;
}

const DAYS_OF_WEEK: DayOption[] = [
  { value: "월", label: "월" },
  { value: "화", label: "화" },
  { value: "수", label: "수" },
  { value: "목", label: "목" },
  { value: "금", label: "금" },
  { value: "토", label: "토" },
  { value: "일", label: "일" },
];

interface DaySelectorProps {
  selectedDays: string[];
  setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
  isRequired?: boolean;
  labelSize?: number;
}

export default function DaySelector({
  selectedDays,
  setSelectedDays,
  label,
  isRequired,
  labelSize,
}: DaySelectorProps) {
  const { toggleSelect } = useMultiSelect(setSelectedDays);

  return (
    <View>
      <FieldLabel
        label={label}
        isRequired={isRequired}
        fontSize={labelSize}
      ></FieldLabel>

      <View className="flex-row flex-wrap justify-between">
        {DAYS_OF_WEEK.map((day) => {
          const isSelected = selectedDays.includes(day.value);

          return (
            <Pressable
              key={day.value}
              className="w-[13%] justify-between gap-2 rounded-lg border border-gray-border items-center py-2.5"
              onPress={() => toggleSelect(day.value)}
            >
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

              <Text className="text-gray-text">{day.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
