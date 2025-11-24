import BottomSheetModal from '@/app/step/_components/BottomSheetModal';
import FilterBar from '@/app/step/_components/FilterBar';
import GuestHouseCard from '@/app/step/_components/GuestHouseCard';
import DismissKeyboardView from '@/src/components/layout/DismissKeyboardView';
import BackArrorHeader from '@/src/components/ui/BackArrorHeader';
import ErrorMessage from '@/src/components/ui/ErrorMessage';
import LoadingSkeleton from '@/src/components/ui/LoadingSkeleton';
import SearchInput from '@/src/components/ui/SearchInput';
import { useStaffRecruitmentList } from '@/src/hooks/useStaffRecruitmentList';
import { FilterOption, FilterState } from '@/src/types/step/types';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

export default function GuestHouseListScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('recent');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    region: [],
    period: [],
    workScheduleType: [],
    gender: '',
  });

  const filterOptions: Array<{ key: FilterOption; label: string }> = [
    { key: 'views', label: '조회수' },
    { key: 'likes', label: '찜' },
    { key: 'recent', label: '최신순' },
  ];

  const { data: staffRecruitmentPosts, isLoading, error, refetch } = useStaffRecruitmentList({
    keyword: searchText,
    sort: selectedFilter,
    filters,
  });

  console.log('PostingListScreen - staffRecruitmentPosts:', staffRecruitmentPosts);
  console.log('PostingListScreen - isLoading:', isLoading);
  console.log('PostingListScreen - error:', error);

  return (
    <DismissKeyboardView>
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
            onChangeText={setSearchText}
            placeholder="찾고 싶은 게스트하우스를 검색해보세요"
          />
        </View>
      </View>

      <FilterBar<FilterOption>
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        filterOptions={filterOptions}
        onAdvancedFilterPress={() => setIsBottomSheetVisible(true)}
      />
      <BottomSheetModal
        visible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        title="필터 옵션"
        filters={filters}
        onApply={(newFilters) => setFilters(newFilters)}
      />

      <ScrollView
        className="flex-1 px-4 pt-3"
        showsVerticalScrollIndicator={false}
      >
        {/* 로딩 상태 */}
        {isLoading && <LoadingSkeleton count={5} />}

        {/* 에러 상태 */}
        {error && !isLoading && (
          <ErrorMessage message={error} onRetry={refetch} />
        )}

        {/* 데이터 없음 */}
        {!isLoading && !error && staffRecruitmentPosts.length === 0 && (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-500 text-base">
              검색 결과가 없습니다
            </Text>
          </View>
        )}

        {/* 데이터 표시 */}
        {!isLoading &&
          !error &&
          staffRecruitmentPosts.length > 0 &&
          staffRecruitmentPosts.map((item) => (
            <GuestHouseCard key={item.id} item={item} />
          ))}
      </ScrollView>
    </DismissKeyboardView>
  );
}
