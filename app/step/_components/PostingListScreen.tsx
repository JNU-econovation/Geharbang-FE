import BottomSheetModal, { FilterState } from '@/app/step/_components/BottomSheetModal';
import BackArrow from '@/src/components/ui/BackArrow';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HORIZONTAL_PADDING = 16;
const CARD_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING * 2;

type FilterOption = 'views' | 'likes' | 'recent';

export default function GuestHouseListScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('views');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<FilterState>({
    location: [],
    period: '단기',
    workdays: '주 5일 (주말 휴무)',
    gender: '무관',
  });

  const filterOptions = [
    { key: 'views', label: '조회수' },
    { key: 'likes', label: '찜' },
    { key: 'recent', label: '최신순' },
  ];

  const originalGuesthouses = [
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

  const getFilteredAndSortedGuesthouses = () => {
    let filtered = originalGuesthouses;

    // Apply search filter
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (guesthouse) =>
          guesthouse.name.toLowerCase().includes(searchLower) ||
          guesthouse.location.toLowerCase().includes(searchLower),
      );
    }

    // Apply location filter
    if (filters.location.length > 0) {
      filtered = filtered.filter((guesthouse) =>
        filters.location.some((loc) => guesthouse.location.includes(loc.replace(' 권역', '')))
      );
    }

    // Apply period filter (based on period field in data)
    if (filters.period) {
      filtered = filtered.filter((guesthouse) => {
        const periodMonths = parseInt(guesthouse.period);
        if (filters.period === '단기') {
          return periodMonths <= 1;
        } else if (filters.period === '중기') {
          return periodMonths > 1 && periodMonths <= 3;
        } else if (filters.period === '장기') {
          return periodMonths > 3;
        }
        return true;
      });
    }

    // Sort by selected filter
    switch (selectedFilter) {
      case 'views':
        return filtered.sort((a, b) => b.views - a.views);
      case 'likes':
        return filtered.sort((a, b) => b.likes - a.likes);
      case 'recent':
        return filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      default:
        return filtered;
    }
  };

  const guesthouses = getFilteredAndSortedGuesthouses();

  const toggleLike = (itemId: number) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="px-4 pt-3 pb-1 border-b border-gray-200">
        <View className="h-9 relative flex-row items-center justify-center mb-4">
          <TouchableOpacity className="absolute left-0 w-9 h-9 items-center justify-center">
            <BackArrow size={24} color="black" />
          </TouchableOpacity>
          <Text
            className="text-[#101727] text-xl font-normal text-center"
            style={{ fontFamily: 'Noto Sans KR' }}
          >
            스텝 공고 찾기
          </Text>
        </View>

        {/* Promotion Banner */}
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

        {/* Search Bar */}
        <View className="relative mb-4">
          <TextInput
            className="flex-row items-center pl-9 pr-4 py-2.5 bg-white rounded-lg border border-gray-200 text-[13px] text-gray-800"
            placeholder="찾고 싶은 게스트하우스를 검색해보세요"
            placeholderTextColor="#99A1AE"
            value={searchText}
            onChangeText={setSearchText}
            style={{ fontFamily: 'Noto Sans KR' }}
          />

          <Ionicons
            className="absolute left-3 top-2.5"
            name="search"
            size={16}
            color="#99A1AE"
          />
        </View>
      </View>

      {/* Filter Bar */}
      <View className="px-8 py-2.5 flex-row items-center justify-end border-b border-gray-200 relative">
        <View className="flex-row items-center gap-1.5">
          <TouchableOpacity
            className="flex-row items-center gap-1.5"
            onPress={() => setIsDropdownVisible(!isDropdownVisible)}
          >
            <Ionicons name="funnel-outline" size={20} color="#1d2838" />
            <Text className="text-[#1d2838] text-[13px] font-normal w-12 text-center">
              {
                filterOptions.find((option) => option.key === selectedFilter)
                  ?.label
              }
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-5 h-5 bg-black rounded items-center justify-center ml-2"
            onPress={() => setIsBottomSheetVisible(true)}
          >
            <Ionicons name="chevron-down-outline" size={12} color="white" />
          </TouchableOpacity>
        </View>

        {/* Inline Dropdown */}
        {isDropdownVisible && (
          <View
            className="absolute bg-white rounded-lg shadow-lg border border-gray-200"
            style={{
              top: '100%',
              right: 32,
              marginTop: 4,
              zIndex: 1000,
              elevation: 5,
              minWidth: 100,
            }}
          >
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                className={`px-4 py-3 ${
                  selectedFilter === option.key ? 'bg-blue-50' : ''
                }`}
                onPress={() => {
                  setSelectedFilter(option.key as FilterOption);
                  setIsDropdownVisible(false);
                }}
              >
                <Text
                  className={`text-sm ${
                    selectedFilter === option.key
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Bottom Sheet Modal */}
      <BottomSheetModal
        visible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        title="필터 옵션"
        filters={filters}
        onApply={(newFilters) => setFilters(newFilters)}
      />

      {/* Guesthouse List */}
      <ScrollView
        className="flex-1 px-4 pt-3"
        showsVerticalScrollIndicator={false}
      >
        {guesthouses.map((item) => (
          <View
            key={item.id}
            className="px-4 pt-4 pb-4 bg-white rounded-xl border border-gray-200 mb-3"
          >
            <View className="flex-row">
              <View className="w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              <View className="flex-1 ml-3 justify-start gap-0.5">
                <Text
                  className="text-[#1d2838] text-sm font-normal leading-[21px]"
                  style={{ fontFamily: 'Noto Sans KR' }}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <Text
                  className="text-[#495565] text-xs font-normal leading-[18px]"
                  style={{ fontFamily: 'Noto Sans KR' }}
                >
                  {item.location}
                </Text>
                <View className="px-[7px] pt-1 pb-[3px] bg-sky-500/5 rounded-[10px] border border-sky-500/10 self-start">
                  <Text
                    className="text-sky-500 text-[10px] font-normal leading-4"
                    style={{ fontFamily: 'Inter' }}
                  >
                    # {item.period}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                className="w-6 h-6 items-center justify-center"
                onPress={() => toggleLike(item.id)}
              >
                <Ionicons
                  name={likedItems.has(item.id) ? 'heart' : 'heart-outline'}
                  size={16}
                  color={likedItems.has(item.id) ? '#ef4444' : '#d1d5db'}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
