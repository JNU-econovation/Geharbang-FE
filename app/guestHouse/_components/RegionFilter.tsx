import React from "react";
import { View, Pressable } from "react-native";
import Checkbox from "@/src/components/ui/Checkbox";
import TextSize from "@/src/components/ui/TextSize";
import { REGION_OPTIONS } from "@/src/utils/constants/filterOptions";

interface RegionFilterProps {
  selectedRegions: string[];
  onToggle: (key: "region", value: string) => void;
}

export default function RegionFilter({
  selectedRegions,
  onToggle,
}: RegionFilterProps) {
  return (
    <View className='flex-row flex-wrap gap-2'>
      {REGION_OPTIONS.map((region) => {
        const isSelected = selectedRegions.includes(region);
        return (
          <Pressable
            key={region}
            onPress={() => onToggle("region", region)}
            className={`flex-row items-center gap-2 p-3 rounded-lg border ${
              isSelected
                ? "border-primary-blue bg-blue-50"
                : "border-gray-200"
            }`}
            style={{ width: "48%" }}
          >
            <Checkbox checked={isSelected} size='md' />
            <TextSize size={14} content={region} />
          </Pressable>
        );
      })}
    </View>
  );
}