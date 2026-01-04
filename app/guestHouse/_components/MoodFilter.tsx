import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";
import { MOOD_OPTIONS } from "@/src/utils/constants/filterOptions";
import React from "react";
import { Pressable, View } from "react-native";

interface MoodFilterProps {
  selectedMoods: string[];
  onToggle: (key: "moods", value: string) => void;
  maxSelect?: number;
}

export default function MoodFilter({
  selectedMoods,
  onToggle,
  maxSelect = 2,
}: MoodFilterProps) {
  const handlePress = (value: string) => {
    const isSelected = selectedMoods.includes(value);
    if (!isSelected && selectedMoods.length >= maxSelect) {
      return;
    }

    onToggle("moods", value);
  };

  return (
    <View className='flex-row flex-wrap gap-2'>
      {MOOD_OPTIONS.map((mood) => {
        const isSelected = selectedMoods.includes(mood.value);
        return (
          <Pressable
            key={mood.value}
            onPress={() => handlePress(mood.value)}
            className={`px-4 py-2.5 rounded-full border ${
              isSelected
                ? "border-primary-blue bg-blue-50"
                : "border-gray-border"
            }`}
          >
            <TextSize
              size={14}
              content={mood.label}
              color={isSelected ? COLORS.PRIMARY.BLUE : COLORS.GRAY.TEXT}
              weight={isSelected ? "bold" : "normal"}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
