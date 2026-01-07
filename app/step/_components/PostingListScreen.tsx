import BottomSheetModal from "@/app/step/_components/BottomSheetModal";
import GuestHouseCard from "@/app/step/_components/GuestHouseCard";
import PostingListEmpty from "@/app/step/_components/PostingList/PostingListEmpty";
import PostingListFooter from "@/app/step/_components/PostingList/PostingListFooter";
import PostingListHeader from "@/app/step/_components/PostingList/PostingListHeader";
import DismissKeyboardView from "@/src/components/layout/DismissKeyboardView";
import { useStaffRecruitmentList } from "@/src/hooks/stepList/useStaffRecruitmentList";
import { FilterOption, FilterState } from "@/src/types/models/step/types";
import React, { useState } from "react";
import { FlatList, ListRenderItem } from "react-native";

export default function GuestHouseListScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("recent");
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    region: [],
    period: [],
    workType: "",
    workDays: null,
    restDays: null,
    workScheduleType: [],
    gender: "",
  });

  const filterOptions: Array<{ key: FilterOption; label: string }> = [
    { key: "views", label: "조회수" },
    { key: "likes", label: "찜" },
    { key: "recent", label: "최신순" },
  ];

  const {
    data: staffRecruitmentPosts,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
    refetch,
  } = useStaffRecruitmentList({
    keyword: searchText,
    sort: selectedFilter,
    filters,
  });

  const renderHeader = () => (
    <PostingListHeader
      title='스텝 공고 찾기'
      searchText={searchText}
      onSearchChange={setSearchText}
      selectedFilter={selectedFilter}
      onFilterChange={setSelectedFilter}
      filterOptions={filterOptions}
      onAdvancedFilterPress={() => setIsBottomSheetVisible(true)}
    />
  );

  // FlatList 푸터
  const renderFooter = () => (
    <PostingListFooter isLoadingMore={isLoadingMore} />
  );

  const renderEmpty = () => (
    <PostingListEmpty isLoading={isLoading} error={error} onRetry={refetch} />
  );

  const renderItem: ListRenderItem<(typeof staffRecruitmentPosts)[0]> = ({
    item,
  }) => <GuestHouseCard type='stepRecruitment' item={item} />;

  return (
    <DismissKeyboardView>
      <FlatList
        data={staffRecruitmentPosts}
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
  );
}
