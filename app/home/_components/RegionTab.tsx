import React from "react";
import { Pressable } from "react-native";

import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";

interface RegionTabProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function RegionTab({ label, selected, onPress }: RegionTabProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 7.5,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: selected ? "transparent" : "#0F0F0F",
        backgroundColor: selected ? COLORS.PRIMARY.BLUE : "transparent",
      }}
    >
      <TextSize
        size={12}
        color={selected ? "white" : "#0F0F0F"}
        content={label}
      />
    </Pressable>
  );
}
