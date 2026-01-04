import React, { useState } from "react";
import { FlatList, ListRenderItem } from "react-native";

import GuestHouseCard from "@/app/step/_components/GuestHouseCard";
import PostingListEmpty from "@/app/step/_components/PostingList/PostingListEmpty";
import PostingListFooter from "@/app/step/_components/PostingList/PostingListFooter";
import PostingListHeader from "@/app/step/_components/PostingList/PostingListHeader";
import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import DismissKeyboardView from "@/src/components/layout/DismissKeyboardView";
import { FilterState } from "@/src/types/models/guestHouse/types";
import { FilterOption } from "@/src/types/models/step/types";
import BottomSheetModal from "./_components/BottomSheetModal";

export default function GuestHouse() {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("recent");
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    region: [],
    lowestRoomPrice: null,
    highestRoomPrice: null,
    moods: [],
    partyType: [],
    roomType: [],
    headCountType: [],
    amenities: [],
  });
  console.log(filters);
  const filterOptions: Array<{ key: FilterOption; label: string }> = [
    { key: "views", label: "조회수" },
    { key: "likes", label: "찜" },
    { key: "recent", label: "최신순" },
  ];

  const renderHeader = () => (
    <PostingListHeader
      title='게스트하우스 찾기'
      searchText={searchText}
      onSearchChange={setSearchText}
      selectedFilter={selectedFilter}
      onFilterChange={setSelectedFilter}
      filterOptions={filterOptions}
      onAdvancedFilterPress={() => setIsBottomSheetVisible(true)}
    />
  );

  const renderFooter = () => <PostingListFooter isLoadingMore={false} />;

  const renderEmpty = () => (
    <PostingListEmpty
      isLoading={false}
      error={""}
      onRetry={() => console.log("다시시도")}
    />
  );

  const renderItem: ListRenderItem<(typeof guestHousePosts)[0]> = ({
    item,
  }) => <GuestHouseCard item={item} />;

 // 목업 데이터
 const guestHousePosts = [
  { id: 1, guestHouseName: "애월 감성 스테이", tags: ["감성", "조용한"], region: "애월읍", isWished: false, imageUrl: "https://picsum.photos/id/101/400/300" },
  { id: 2, guestHouseName: "서귀포 힐링 하우스", tags: ["힐링"], region: "서귀포시", isWished: true, imageUrl: "https://picsum.photos/id/102/400/300" },
  { id: 3, guestHouseName: "성산 일출 민박", tags: ["사교적", "활발한"], region: "성산읍", isWished: false, imageUrl: "https://picsum.photos/id/103/400/300" },
  { id: 4, guestHouseName: "구좌 잔잔한가", tags: ["잔잔한"], region: "구좌읍", isWished: false, imageUrl: "https://picsum.photos/id/104/400/300" },
  { id: 5, guestHouseName: "남원 사색의 밤", tags: ["사색", "조용한"], region: "남원읍", isWished: true, imageUrl: "https://picsum.photos/id/105/400/300" },
  { id: 6, guestHouseName: "한림 바다 앞 숙소", tags: ["휴식", "감성"], region: "한림읍", isWished: false, imageUrl: "https://picsum.photos/id/106/400/300" },
  { id: 7, guestHouseName: "애월 파티 게하", tags: ["사교적"], region: "애월읍", isWished: false, imageUrl: "https://picsum.photos/id/107/400/300" },
  { id: 8, guestHouseName: "서귀포 숲속 정원", tags: ["힐링", "사색"], region: "서귀포시", isWished: true, imageUrl: "https://picsum.photos/id/108/400/300" },
  { id: 9, guestHouseName: "성산 서퍼들의 집", tags: ["활발한"], region: "성산읍", isWished: false, imageUrl: "https://picsum.photos/id/109/400/300" },
  { id: 10, guestHouseName: "구좌 돌담집", tags: ["조용한", "잔잔한"], region: "구좌읍", isWished: false, imageUrl: "https://picsum.photos/id/110/400/300" },
  { id: 11, guestHouseName: "남원 오렌지 스테이", tags: ["감성"], region: "남원읍", isWished: true, imageUrl: "https://picsum.photos/id/111/400/300" },
  { id: 12, guestHouseName: "한림 일몰 맛집", tags: ["휴식", "힐링"], region: "한림읍", isWished: false, imageUrl: "https://picsum.photos/id/112/400/300" },
  { id: 13, guestHouseName: "애월 코지 하우스", tags: ["조용한"], region: "애월읍", isWished: false, imageUrl: "https://picsum.photos/id/113/400/300" },
  { id: 14, guestHouseName: "서귀포 시티 게하", tags: ["사교적", "감성"], region: "서귀포시", isWished: false, imageUrl: "https://picsum.photos/id/114/400/300" },
  { id: 15, guestHouseName: "성산 등대지기", tags: ["사색"], region: "성산읍", isWished: true, imageUrl: "https://picsum.photos/id/115/400/300" },
  { id: 16, guestHouseName: "구좌 소금바람", tags: ["잔잔한", "휴식"], region: "구좌읍", isWished: false, imageUrl: "https://picsum.photos/id/116/400/300" },
  { id: 17, guestHouseName: "남원 동백꽃 필 무렵", tags: ["힐링"], region: "남원읍", isWished: false, imageUrl: "https://picsum.photos/id/117/400/300" },
  { id: 18, guestHouseName: "한림 포구 숙소", tags: ["활발한", "사교적"], region: "한림읍", isWished: true, imageUrl: "https://picsum.photos/id/118/400/300" },
  { id: 19, guestHouseName: "애월 달빛 아래", tags: ["감성", "조용한"], region: "애월읍", isWished: false, imageUrl: "https://picsum.photos/id/119/400/300" },
  { id: 20, guestHouseName: "서귀포 물결", tags: ["잔잔한"], region: "서귀포시", isWished: false, imageUrl: "https://picsum.photos/id/120/400/300" },
  { id: 21, guestHouseName: "성산 아침햇살", tags: ["힐링", "휴식"], region: "성산읍", isWished: true, imageUrl: "https://picsum.photos/id/121/400/300" },
  { id: 22, guestHouseName: "구좌 당근 밭 옆", tags: ["조용한"], region: "구좌읍", isWished: false, imageUrl: "https://picsum.photos/id/122/400/300" },
  { id: 23, guestHouseName: "남원 큰엉 스테이", tags: ["사색", "힐링"], region: "남원읍", isWished: false, imageUrl: "https://picsum.photos/id/123/400/300" },
  { id: 24, guestHouseName: "한림 협재 베이스", tags: ["사교적"], region: "한림읍", isWished: true, imageUrl: "https://picsum.photos/id/124/400/300" },
  { id: 25, guestHouseName: "애월 노을 마을", tags: ["감성"], region: "애월읍", isWished: false, imageUrl: "https://picsum.photos/id/125/400/300" },
  { id: 26, guestHouseName: "서귀포 올레길 숙소", tags: ["활발한", "휴식"], region: "서귀포시", isWished: false, imageUrl: "https://picsum.photos/id/126/400/300" },
  { id: 27, guestHouseName: "성산 오름 하우스", tags: ["사색", "조용한"], region: "성산읍", isWished: true, imageUrl: "https://picsum.photos/id/127/400/300" },
  { id: 28, guestHouseName: "구좌 평대리 집", tags: ["잔잔한", "감성"], region: "구좌읍", isWished: false, imageUrl: "https://picsum.photos/id/128/400/300" },
  { id: 29, guestHouseName: "남원 바당 스테이", tags: ["힐링"], region: "남원읍", isWished: false, imageUrl: "https://picsum.photos/id/129/400/300" },
  { id: 30, guestHouseName: "한림 끝 마을", tags: ["조용한", "휴식"], region: "한림읍", isWished: true, imageUrl: "https://picsum.photos/id/130/400/300" },
];
  return (
    <CustomSafeAreaView
      pageColor='bg-white'
      statusBarBackgroundColor='bg-white'
    >
      <DismissKeyboardView>
        <FlatList
          data={guestHousePosts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          // onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 12 }}
        />

        <BottomSheetModal
          visible={isBottomSheetVisible}
          onClose={() => setIsBottomSheetVisible(false)}
          title='필터 옵션'
          filters={filters}
          onApply={(newFilters) => setFilters(newFilters)}
        />
      </DismissKeyboardView>
    </CustomSafeAreaView>
  );
}
