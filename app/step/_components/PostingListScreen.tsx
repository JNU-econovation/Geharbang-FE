import BottomSheetModal from '@/app/step/_components/BottomSheetModal';
import FilterBar from '@/app/step/_components/FilterBar';
import GuestHouseCard from '@/app/step/_components/GuestHouseCard';
import DismissKeyboardView from '@/src/components/layout/DismissKeyboardView';
import BackArrorHeader from '@/src/components/ui/BackArrorHeader';
import ErrorMessage from '@/src/components/ui/ErrorMessage';
import LoadingSkeleton from '@/src/components/ui/LoadingSkeleton';
import SearchInput from '@/src/components/ui/SearchInput';
import { FilterOption, FilterState, GuestHouse } from '@/src/types/step/types';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

export default function GuestHouseListScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('views');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<FilterState>({
    location: [],
    period: [],
    workdays: [],
    gender: '',
  });

  // 로딩 및 에러 상태 (API 연동 시 사용)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filterOptions: Array<{ key: FilterOption; label: string }> = [
    { key: 'views', label: '조회수' },
    { key: 'likes', label: '찜' },
    { key: 'recent', label: '최신순' },
  ];
  //로직 연동 후 지울 목데이터.
  const originalGuesthouses: GuestHouse[] = [
    {
      id: 1,
      name: '애월 바다소리 게스트하우스',
      location: '애월읍',
      period: '2개월',
      views: 1250,
      likes: 89,
      createdAt: '2024-01-15',
      image:
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2%2F415e4b29-e6d5-4a69-a6b1-d0dc341b40f2.png',
    },
    {
      id: 2,
      name: '제주 파티 게스트하우스',
      location: '구좌읍',
      period: '6개월',
      views: 980,
      likes: 156,
      createdAt: '2024-02-20',
      image:
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2%2Fc9911cb4-4c3f-4035-8dc5-f7a95e58226b.png',
    },
    {
      id: 3,
      name: '서귀포 힐링스테이',
      location: '서귀포시',
      period: '6개월',
      views: 1580,
      likes: 203,
      createdAt: '2024-01-28',
      image:
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2%2Fe36c36da-61ba-4eb7-a097-f192918cd275.png',
    },
    {
      id: 4,
      name: '제주시 센트럴 하우스',
      location: '제주시',
      period: '4개월',
      views: 750,
      likes: 67,
      createdAt: '2024-03-05',
      image:
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2%2F7b7a92c3-d537-48ff-8514-6a4f6f69fd16.png',
    },
    {
      id: 5,
      name: '성산 일출봉 게스트하우스',
      location: '성산읍',
      period: '7개월',
      views: 2100,
      likes: 278,
      createdAt: '2024-01-10',
      image:
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2%2F3d54f1ab-340b-47c4-a072-a4c10e648eae.png',
    },
    {
      id: 6,
      name: '협재 비치하우스',
      location: '한림읍',
      period: '12개월',
      views: 1320,
      likes: 192,
      createdAt: '2024-02-14',
      image:
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2%2F0bbfdb9a-6d84-41a2-af7e-a5dbc329666c.png',
    },
  ];
  // 로직 연동 후 지울 함수
  const getFilteredAndSortedGuesthouses = () => {
    let result = [...originalGuesthouses];

    switch (selectedFilter) {
      case 'views':
        return result.sort((a, b) => b.views - a.views);
      case 'likes':
        return result.sort((a, b) => b.likes - a.likes);
      case 'recent':
        return result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      default:
        return result;
    }
  };

  const guesthouses = getFilteredAndSortedGuesthouses();

  return (
    <DismissKeyboardView>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
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
          <ErrorMessage
            message={error}
            onRetry={() => {
              setError(null);
              // TODO: API 재호출 로직 추가
              // refetch();
            }}
          />
        )}

        {!isLoading &&
          !error &&
          guesthouses.map((item) => (
            <GuestHouseCard
              key={item.id}
              item={item}
              isLiked={likedItems.has(item.id)}
            />
          ))}
      </ScrollView>
      </View>
    </DismissKeyboardView>
  );
}
