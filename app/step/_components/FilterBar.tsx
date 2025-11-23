import FilterIcon from '@/public/svgs/filter.svg';
import FilterModalIcon from '@/public/svgs/filterModal.svg';
import Dropdown from '@/src/components/ui/Dropdown';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface FilterOption<T> {
  key: T;
  label: string;
}

interface FilterBarProps<T extends string> {
  selectedFilter: T;
  onFilterChange: (filter: T) => void;
  filterOptions: FilterOption<T>[];
  onAdvancedFilterPress: () => void;
}

export default function FilterBar<T extends string>({
  selectedFilter,
  onFilterChange,
  filterOptions,
  onAdvancedFilterPress,
}: FilterBarProps<T>) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <View className="px-8 py-2.5 flex-row items-center justify-end border-b border-gray-200 relative">
      <View className="flex-row items-center gap-1.5">
        <TouchableOpacity
          className="flex-row items-center gap-1"
          onPress={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          <FilterIcon width={14} height={14} />
          <Text className="text-[#1d2838] text-[13px] font-normal w-12 text-center">
            {
              filterOptions.find((option) => option.key === selectedFilter)
                ?.label
            }
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-5 h-5 bg-black rounded items-center justify-center ml-2"
          onPress={onAdvancedFilterPress}
        >
          <FilterModalIcon width={12} height={12} />
        </TouchableOpacity>
      </View>

      <Dropdown
        visible={isDropdownVisible}
        options={filterOptions}
        selectedKey={selectedFilter}
        onSelect={(key) => {
          onFilterChange(key);
          setIsDropdownVisible(false);
        }}
        position="right"
        right={32}
      />
    </View>
  );
}
