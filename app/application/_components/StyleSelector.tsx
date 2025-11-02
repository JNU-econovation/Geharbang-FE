import { useMultiSelect } from "@/src/hooks/useMultiSelect";
import { COLORS } from "@/src/utils/constants/colors";
import { STYLE_OPTIONS } from "@/src/utils/constants/options";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { DimensionValue, Pressable, Text, View } from "react-native";
import FieldLabel from "./FieldLabel";

interface StyleSelectorProps {
  selectedStyles: string[];
  setSelectedStyles: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
  isRequired?: boolean;
  labelSize?: number;
  size: DimensionValue;
}

export default function StyleSelector({
  selectedStyles,
  setSelectedStyles,
  label,
  isRequired,
  labelSize,
  size,
}: StyleSelectorProps) {
  const { toggleSelect } = useMultiSelect(setSelectedStyles);

  return (
    <View>
      <FieldLabel
        label={label}
        isRequired={isRequired}
        fontSize={labelSize}
      ></FieldLabel>

      <View className="flex-row flex-wrap justify-start gap-3">
        {STYLE_OPTIONS.map((day) => {
          const isSelected = selectedStyles.includes(day.value);

          return (
            <Pressable
              key={day.value}
              className="justify-center rounded-3xl border items-center py-2.5"
              style={[
                { width: size },
                isSelected
                  ? {
                      backgroundColor: "#EFF6FF",
                      borderColor: COLORS.PRIMARY.BLUE,
                    }
                  : { borderColor: COLORS.GRAY.BORDER },
              ]}
              onPress={() => toggleSelect(day.value)}
            >
              {isSelected && (
                <Ionicons
                  name="checkmark-outline"
                  color={COLORS.PRIMARY.BLUE}
                  size={18}
                  style={{ position: "absolute", left: 9 }}
                ></Ionicons>
              )}
              <Text>{day.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
