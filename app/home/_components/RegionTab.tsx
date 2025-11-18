import Flex from "@/src/components/layout/Flex";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";

import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";

interface RegionTabProps {
  label: string;
  selected: boolean; 
  onPress: () => void; 
}

export default function RegionTab({
  label,
  selected,
  onPress,
}: RegionTabProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`px-4 py-2.5 rounded-xl ${
        selected ? "bg-primary-blue" : "border border-gray-border"
      }`}
    >
      <Flex justify="between" items="center" flexDir="row" gap={4}>
        <Ionicons
          name="location-outline"
          size={16}
          color={selected ? "white" : COLORS.GRAY.TEXT}
        />
        <TextSize
          size={14}
          color={selected ? "white" : COLORS.GRAY.TEXT}
          content={label}
        />
      </Flex>
    </Pressable>
  );
}
