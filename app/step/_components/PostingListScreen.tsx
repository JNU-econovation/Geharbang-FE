import React, { useState } from "react";
import { FlatList, ListRenderItem, RefreshControl } from "react-native";

import BottomSheetModal from "@/app/step/_components/BottomSheetModal";
import GuestHouseCard from "@/app/step/_components/GuestHouseCard";
import PostingListEmpty from "@/app/step/_components/PostingList/PostingListEmpty";
import PostingListFooter from "@/app/step/_components/PostingList/PostingListFooter";
import PostingListHeader from "@/app/step/_components/PostingList/PostingListHeader";
import DismissKeyboardView from "@/src/components/layout/DismissKeyboardView";
import { useStaffRecruitmentList } from "@/src/hooks/stepList/useStaffRecruitmentList";
import { FilterState, SortOptionKey } from "@/src/types/models/step/types";
import { SORT_OPTIONS } from "@/src/utils/constants/filterOptions";

export default function GuestHouseListScreen() {
  const [selectedFilter, setSelectedFilter] = useState<SortOptionKey>("recent");
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    region: [],
    period: [],
    workType: "",
    workDays: null,
    restDays: null,
    workScheduleType: [],
    gender: "",
  });

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

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

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
      <PostingListHeader
        title='스텝 공고 찾기'
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        filterOptions={SORT_OPTIONS}
        onAdvancedFilterPress={() => setIsBottomSheetVisible(true)}
      />

      <FlatList
        data={staffRecruitmentPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 12 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#0EA5E9"]}
            tintColor='#0EA5E9'
          />
        }
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
