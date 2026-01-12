import React, { useState } from "react";
import { FlatList, ListRenderItem } from "react-native";

import GuestHouseCard from "@/app/step/_components/GuestHouseCard";
import PostingListEmpty from "@/app/step/_components/PostingList/PostingListEmpty";
import PostingListFooter from "@/app/step/_components/PostingList/PostingListFooter";
import PostingListHeader from "@/app/step/_components/PostingList/PostingListHeader";
import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import DismissKeyboardView from "@/src/components/layout/DismissKeyboardView";
import { useGuestHouseList } from "@/src/hooks/guestHouse/useGuestHousePostList";
import {
  FilterState,
  SortOptionKey,
} from "@/src/types/models/guestHouse/types";
import { SORT_OPTIONS } from "@/src/utils/constants/filterOptions";
import BottomSheetModal from "./_components/BottomSheetModal";

export default function GuestHouse() {
  const [selectedFilter, setSelectedFilter] = useState<SortOptionKey>("recent");
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

  const {
    data: guestHousePosts,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
    refetch,
  } = useGuestHouseList({
    keyword: searchText,
    sort: selectedFilter,
    filters,
  });

  const renderHeader = () => (
    <PostingListHeader
      title='게스트하우스 찾기'
      searchText={searchText}
      onSearchChange={setSearchText}
      selectedFilter={selectedFilter}
      onFilterChange={setSelectedFilter}
      filterOptions={SORT_OPTIONS}
      onAdvancedFilterPress={() => setIsBottomSheetVisible(true)}
    />
  );

  const renderFooter = () => (
    <PostingListFooter isLoadingMore={isLoadingMore} />
  );

  const renderEmpty = () => (
    <PostingListEmpty isLoading={isLoading} error={error} onRetry={refetch} />
  );

  const renderItem: ListRenderItem<(typeof guestHousePosts)[0]> = ({
    item,
  }) => <GuestHouseCard type='guestHouse' item={item} />;

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
          onEndReached={loadMore}
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
