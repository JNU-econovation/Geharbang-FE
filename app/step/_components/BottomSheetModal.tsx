import FilterModalFooter from "@/app/step/_components/FilterModalFooter";
import BottomSheet from "@/src/components/ui/BottomSheet";
import Checkbox from "@/src/components/ui/Checkbox";
import CollapsibleSection from "@/src/components/ui/CollapsibleSection";
import RadioButton from "@/src/components/ui/RadioButton";
import TextSize from "@/src/components/ui/TextSize";
import { useExpandableSections } from "@/src/hooks/stepList/useExpandableSections";
import { useFilterState } from "@/src/hooks/stepList/useFilterState";
import { FilterState } from "@/src/types/models/step/types";
import {
  GENDER_OPTIONS,
  PERIOD_OPTIONS,
  REGION_OPTIONS,
  WORK_SCHEDULE_OPTIONS,
} from "@/src/utils/constants/filterOptions";
import React from "react";
import { TouchableOpacity, View } from "react-native";

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
    toggleRegion,
    togglePeriod,
    toggleWorkScheduleType,
    selectGender,
  } = useFilterState(initialFilters);

  const { expanded: expandedSections, toggle: toggleSection } =
    useExpandableSections({
      region: true,
      period: true,
      workScheduleType: true,
      gender: true,
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
      <View className="p-4 gap-6">
        <CollapsibleSection
          title="근무지역"
          isExpanded={expandedSections.region}
          onToggle={() => toggleSection("region")}
          className="pb-4"
        >
          <View className="flex-row flex-wrap gap-2">
            {REGION_OPTIONS.map((region) => (
              <TouchableOpacity
                key={region}
                onPress={() => toggleRegion(region)}
                className={`flex-row items-center gap-2 p-3 rounded-lg border ${
                  filters.region.includes(region)
                    ? "border-primary-blue bg-blue-50"
                    : "border-gray-200"
                }`}
                style={{ width: "48%" }}
              >
                <Checkbox checked={filters.region.includes(region)} size="md" />
                <TextSize size={14} content={region} />
              </TouchableOpacity>
            ))}
          </View>
        </CollapsibleSection>

        <CollapsibleSection
          title="근무기간"
          isExpanded={expandedSections.period}
          onToggle={() => toggleSection("period")}
          className="pb-4"
        >
          <View className="gap-2">
            {PERIOD_OPTIONS.map((period) => (
              <TouchableOpacity
                key={period.label}
                onPress={() => togglePeriod(period.label)}
                className={`flex-row items-center gap-3 p-3 rounded-lg border ${
                  filters.period.includes(period.label)
                    ? "border-primary-blue bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <Checkbox
                  checked={filters.period.includes(period.label)}
                  size="md"
                />
                <View>
                  <TextSize size={14} content={period.label} />
                  <TextSize size={12} content={period.desc} color="#6B7280" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </CollapsibleSection>

        <CollapsibleSection
          title="근무일 (휴일)"
          isExpanded={expandedSections.workScheduleType}
          onToggle={() => toggleSection("workScheduleType")}
          className="pb-4"
        >
          <View className="gap-2">
            {WORK_SCHEDULE_OPTIONS.map((workSchedule) => (
              <TouchableOpacity
                key={workSchedule.label}
                onPress={() => toggleWorkScheduleType(workSchedule.label)}
                className={`flex-row items-center gap-3 p-3 rounded-lg border ${
                  filters.workScheduleType.includes(workSchedule.label)
                    ? "border-primary-blue bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <Checkbox
                  checked={filters.workScheduleType.includes(
                    workSchedule.label
                  )}
                  size="md"
                />
                <View>
                  <TextSize size={14} content={workSchedule.label} />
                  <TextSize
                    size={12}
                    content={workSchedule.desc}
                    color="#6B7280"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </CollapsibleSection>

        <CollapsibleSection
          title="성별"
          isExpanded={expandedSections.gender}
          onToggle={() => toggleSection("gender")}
          showBorder={false}
        >
          <View className="flex-row gap-2">
            {GENDER_OPTIONS.map((gender) => (
              <TouchableOpacity
                key={gender}
                onPress={() => selectGender(gender)}
                className={`flex-1 flex-row items-center justify-center gap-2 p-3 rounded-lg border ${
                  filters.gender === gender
                    ? "border-primary-blue bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <RadioButton selected={filters.gender === gender} size="md" />
                <TextSize size={14} content={gender} />
              </TouchableOpacity>
            ))}
          </View>
        </CollapsibleSection>
      </View>
    </BottomSheet>
  );
}
