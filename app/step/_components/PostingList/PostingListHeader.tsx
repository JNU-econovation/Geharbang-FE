import FilterBar from "@/app/step/_components/FilterBar";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";

import AdBanner from "@/app/home/_components/AdBanner";
import SearchInput from "@/src/components/ui/SearchInput";
import { FilterOption } from "@/src/types/models/step/types";
import React from "react";
import { View } from "react-native";

interface PostingListHeaderProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  selectedFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  filterOptions: Array<{ key: FilterOption; label: string }>;
  onAdvancedFilterPress: () => void;
}

export default function PostingListHeader({
  searchText,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  filterOptions,
  onAdvancedFilterPress,
}: PostingListHeaderProps) {
  return (
    <>
      <View className='pt-3 pb-1 border-b border-gray-200'>
        <View className='mb-4 px-4 '>
          <BackArrorHeader content='스텝 공고 찾기 ' />
        </View>

        <AdBanner />
        <View className='my-4 px-4 '>
          <SearchInput
            value={searchText}
            onChangeText={onSearchChange}
            placeholder='찾고 싶은 게스트하우스를 검색해보세요'
          />
        </View>
      </View>

      <FilterBar<FilterOption>
        selectedFilter={selectedFilter}
        onFilterChange={onFilterChange}
        filterOptions={filterOptions}
        onAdvancedFilterPress={onAdvancedFilterPress}
      />
    </>
  );
}
