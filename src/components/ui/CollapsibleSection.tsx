import { COLORS } from "@/src/utils/constants/colors";
import React, { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import TextSize from "./TextSize";

interface CollapsibleSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
  showBorder?: boolean;
  className?: string;
  desc?: string;
}

export default function CollapsibleSection({
  title,
  isExpanded,
  onToggle,
  children,
  showBorder = true,
  className = "",
  desc,
}: CollapsibleSectionProps) {
  return (
    <View
      className={`${
        showBorder ? "border-b border-gray-100" : ""
      } ${className}`.trim()}
    >
      <Pressable
        onPress={onToggle}
        className='w-full flex-row items-center justify-between py-2'
      >
        <View className='flex-row items-center gap-1'>
          <TextSize size={15} weight={500} content={title} />
          <TextSize size={13} color={COLORS.GRAY.TEXT} content={desc} />
        </View>

        <Text className='text-gray-500'>{isExpanded ? "▼" : "▶"}</Text>
      </Pressable>

      {isExpanded && <View className='mt-3'>{children}</View>}
    </View>
  );
}
