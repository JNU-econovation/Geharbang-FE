import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { DimensionValue, Pressable, View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import TextSize from "@/src/components/ui/TextSize";
import { useMultiSelect } from "@/src/hooks/useMultiSelect";
import { COLORS } from "@/src/utils/constants/colors";
import { STYLE_OPTIONS } from "@/src/utils/constants/options";

interface StyleSelectorProps {
  selectedStyles: string[];
  setSelectedStyles: React.Dispatch<React.SetStateAction<string[]>>;
  size: DimensionValue;
}

export default function StyleSelector({
  selectedStyles,
  setSelectedStyles,
  size,
}: StyleSelectorProps) {
  const { toggleSelect } = useMultiSelect(setSelectedStyles);

  return (
    <Flex justify="start" items="center" flexDir="row" flexWrap="wrap" gap={5}>
      {STYLE_OPTIONS.map((style) => {
        const isSelected = selectedStyles.includes(style.value);

        return (
          <View style={{ width: size }} key={style.value}>
            <Pressable
              className="rounded-3xl border py-2.5"
              style={
                isSelected
                  ? {
                      backgroundColor: "#EFF6FF",
                      borderColor: COLORS.PRIMARY.BLUE,
                    }
                  : { borderColor: COLORS.GRAY.BORDER }
              }
              onPress={() => toggleSelect(style.value)}
            >
              <Flex justify="center" items="center">
                {isSelected && (
                  <Ionicons
                    name="checkmark-outline"
                    color={COLORS.PRIMARY.BLUE}
                    size={18}
                    style={{ position: "absolute", left: 9 }}
                  />
                )}
                <TextSize size={14} color={COLORS.GRAY.TEXT} content={style.label} />
              </Flex>
            </Pressable>
          </View>
        );
      })}
    </Flex>
  );
}
