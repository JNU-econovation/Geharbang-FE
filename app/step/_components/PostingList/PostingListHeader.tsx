import FilterBar from '@/app/step/_components/FilterBar';
import BackArrorHeader from '@/src/components/ui/BackArrowHeader';

import SearchInput from '@/src/components/ui/SearchInput';
import { FilterOption } from '@/src/types/step/types';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, View } from 'react-native';

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
      <View className="px-4 pt-3 pb-1 border-b border-gray-200">
        <View className="mb-4">
          <BackArrorHeader content="스텝 공고 찾기 " />
        </View>

        <LinearGradient
          colors={['#EFF6FF', '#E0F2FE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#BAE6FD',
            marginBottom: 16,
          }}
        >
          <View className="flex-row items-start gap-3 h-10">
            <View className="flex-1 gap-1">
              <Text
                className="text-sky-700 text-[13px] font-normal"
                style={{ fontFamily: 'Noto Sans KR' }}
              >
                🌊 제주 성수기 특가
              </Text>
              <Text className="text-sky-600 text-[11px] font-normal">
                게스트하우스 예약 시 최대 30% 할인
              </Text>
            </View>
            <View className="w-10 h-10 bg-sky-200 rounded items-center justify-center overflow-hidden">
              <Image
                source={{
                  uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2%2F3ff66237-4c53-418e-9721-014e2e32bf75.png',
                }}
                className="w-16 h-16"
                resizeMode="cover"
              />
            </View>
          </View>
        </LinearGradient>
        <View className="mb-4">
          <SearchInput
            value={searchText}
            onChangeText={onSearchChange}
            placeholder="찾고 싶은 게스트하우스를 검색해보세요"
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
