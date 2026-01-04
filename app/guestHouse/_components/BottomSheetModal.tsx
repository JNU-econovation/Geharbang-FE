import FilterModalFooter from "@/app/step/_components/FilterModalFooter";
import BottomSheet from "@/src/components/ui/BottomSheet";
import CollapsibleSection from "@/src/components/ui/CollapsibleSection";
import TextSize from "@/src/components/ui/TextSize";
import { useFilterState } from "@/src/hooks/guestHouse/useFilterState";
import { useExpandableSections } from "@/src/hooks/stepList/useExpandableSections";
import { FilterState } from "@/src/types/models/guestHouse/types";
import { COLORS } from "@/src/utils/constants/colors";
import {
  AMENITY_OPTIONS,
  HEAD_COUNT_TYPE_OPTIONS,
  PARTY_TYPE_OPTIONS,
  ROOM_TYPE_OPTIONS,
} from "@/src/utils/constants/filterOptions";
import React from "react";
import { View } from "react-native";
import MoodFilter from "./MoodFilter";
import MultiFilterSelector from "./MultiFilterSelector";
import RegionFilter from "./RegionFilter";
import RoomPriceFilter from "./RoomPriceFilter";

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
}

export default function BottomSheetModal({
  visible,
  onClose,
  title,
  filters: initialFilters,
  onApply,
}: BottomSheetModalProps) {
  const {
    filters,
    resetFilters,
    toggleFilter,
    setRoomPrice,
    setRoomPriceRange,
  } = useFilterState(initialFilters);

  const { expanded: expandedSections, toggle: toggleSection } =
    useExpandableSections({
      region: true,
      roomPrice: true,
      moods: true,
      partyType: true,
      roomType: true,
      amenities: true,
    });

  const applyFilters = () => {
    onApply(filters);
    onClose();
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title={title}
      footer={
        <FilterModalFooter onReset={resetFilters} onApply={applyFilters} />
      }
    >
      <View className='p-4 gap-6'>
        <CollapsibleSection
          title='지역'
          isExpanded={expandedSections.region}
          onToggle={() => toggleSection("region")}
          className='pb-4'
        >
          <RegionFilter
            selectedRegions={filters.region}
            onToggle={toggleFilter}
          />
        </CollapsibleSection>

        <CollapsibleSection
          title='객실 가격'
          isExpanded={expandedSections.roomPrice}
          onToggle={() => toggleSection("roomPrice")}
          className='pb-4'
        >
          <RoomPriceFilter
            lowestRoomPrice={filters.lowestRoomPrice}
            highestRoomPrice={filters.highestRoomPrice}
            setRoomPrice={setRoomPrice}
            setRoomPriceRange={setRoomPriceRange}
          />
        </CollapsibleSection>

        <CollapsibleSection
          title='게스트하우스 분위기'
          desc="(최대 2개 선택)"
          isExpanded={expandedSections.moods}
          onToggle={() => toggleSection("moods")}
          className='pb-4'
        >
          <MoodFilter selectedMoods={filters.moods} onToggle={toggleFilter} />
        </CollapsibleSection>

        <CollapsibleSection
          title='파티 종류'
          isExpanded={expandedSections.partyType}
          onToggle={() => toggleSection("partyType")}
          className='pb-4'
        >
          <MultiFilterSelector
            filterKey='partyType'
            options={PARTY_TYPE_OPTIONS}
            selectedItems={filters.partyType}
            onToggle={toggleFilter}
          />
        </CollapsibleSection>

        <CollapsibleSection
          title='객실 타입'
          isExpanded={expandedSections.roomType}
          onToggle={() => toggleSection("roomType")}
          className='pb-4'
        >
          <View className='gap-3.5'>
            <TextSize size={13} color={COLORS.GRAY.TEXT} content='도미토리' />

            <MultiFilterSelector
              filterKey='roomType'
              options={ROOM_TYPE_OPTIONS}
              selectedItems={filters.roomType}
              onToggle={toggleFilter}
            />
            <TextSize size={13} color={COLORS.GRAY.TEXT} content='인실' />
            <MultiFilterSelector
              filterKey='headCountType'
              options={HEAD_COUNT_TYPE_OPTIONS}
              selectedItems={filters.headCountType}
              onToggle={toggleFilter}
            />
          </View>
        </CollapsibleSection>

        <CollapsibleSection
          title='편의시설'
          isExpanded={expandedSections.amenities}
          onToggle={() => toggleSection("amenities")}
          className='pb-4'
        >
          <MultiFilterSelector
            filterKey='amenities'
            options={AMENITY_OPTIONS}
            selectedItems={filters.amenities}
            onToggle={toggleFilter}
          />
        </CollapsibleSection>
      </View>
    </BottomSheet>
  );
}
