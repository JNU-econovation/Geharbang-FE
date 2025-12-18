import { Pressable } from "react-native";

import Flex from "@/src/components/layout/Flex";
import TextSize from "@/src/components/ui/TextSize";

interface OptionItem {
  label: string;
  value: string;
}

interface OptionGridProps {
  options: OptionItem[];
  selected: string;
  onSelect: (value: string) => void;
  itemHeight?: number;
  error?: boolean;
}

export default function OptionGrid({
  options,
  selected,
  onSelect,
  itemHeight = 62,
  error,
}: OptionGridProps) {
  return (
    <Flex dir='row' wrap='wrap' gap={10}>
      {options.map((option) => {
        const isSelected = selected === option.value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
            className={`flex items-center justify-center rounded-lg ${
              error
                ? "border border-primary-red bg-[#F3F4F6]"
                : isSelected
                ? "bg-[#0EA5E9]"
                : "bg-[#F3F4F6]"
            }`}
            style={{
              flexBasis: "48%",
              height: itemHeight,
            }}
          >
            <TextSize
              size={16}
              color={isSelected ? "#FFFFFF" : "#364153"}
              content={option.label}
            />
          </Pressable>
        );
      })}
    </Flex>
  );
}
