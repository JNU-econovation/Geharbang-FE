import Flex from "@/src/components/layout/Flex";
import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";
import React from "react";
import { Pressable, View } from "react-native";

export type FilterType = "전체" | "대기중" | "합격";

interface ApplicationFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function ApplicationFilter({
  currentFilter,
  onFilterChange,
}: ApplicationFilterProps) {
  const FilterButton = ({
    type,
  }: {
    type: FilterType;
  }) => {
    const isSelected = currentFilter === type;

    return (
      <Pressable
        onPress={() => onFilterChange(type)}
        className={`rounded-full py-2 px-4 ${
          isSelected ? "bg-primary-blue" : "bg-gray-button"
        }`}
      >
        <TextSize
          size={15}
          color={isSelected ? "white" : COLORS.GRAY.TEXT}
          content={type}
        />
      </Pressable>
    );
  };

  return (
    <View className='py-3 pl-4 bg-[#F9FAFB]'>
      <Flex dir='row' justify='start' items='center' gap={8}>
        <FilterButton  type='전체' />
        <FilterButton  type='대기중' />
        <FilterButton type='합격' />
      </Flex>
    </View>
  );
}
