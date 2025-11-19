import FilterModalFooter from '@/app/step/_components/FilterModalFooter';
import BottomSheet from '@/src/components/ui/BottomSheet';
import Checkbox from '@/src/components/ui/Checkbox';
import CollapsibleSection from '@/src/components/ui/CollapsibleSection';
import RadioButton from '@/src/components/ui/RadioButton';
import TextSize from '@/src/components/ui/TextSize';
import { useExpandableSections } from '@/src/hooks/useExpandableSections';
import { FilterState } from '@/src/types/step/types';
import {
  GENDER_OPTIONS,
  LOCATION_OPTIONS,
  PERIOD_OPTIONS,
  WORKDAYS_OPTIONS,
} from '@/src/utils/constants/filterOptions';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

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
  const [filters, setFilters] = useState(initialFilters);

  const { expanded: expandedSections, toggle: toggleSection } =
    useExpandableSections({
      location: true,
      period: true,
      workdays: true,
      gender: true,
    });

  const resetFilters = () => {
    setFilters({
      location: [],
      period: [],
      workdays: [],
      gender: '',
    });
  };

  const applyFilters = () => {
    onApply(filters);
    onClose();
  };

  const toggleLocation = (location: string) => {
    setFilters((prev) => ({
      ...prev,
      location: prev.location.includes(location)
        ? prev.location.filter((loc) => loc !== location)
        : [...prev.location, location],
    }));
  };

  const togglePeriod = (period: string) => {
    setFilters((prev) => ({
      ...prev,
      period: prev.period.includes(period)
        ? prev.period.filter((p) => p !== period)
        : [...prev.period, period],
    }));
  };

  const toggleWorkdays = (workdays: string) => {
    setFilters((prev) => ({
      ...prev,
      workdays: prev.workdays.includes(workdays)
        ? prev.workdays.filter((w) => w !== workdays)
        : [...prev.workdays, workdays],
    }));
  };

  const selectGender = (gender: string) => {
    setFilters((prev) => ({ ...prev, gender }));
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title={title}
      footer={<FilterModalFooter onReset={resetFilters} onApply={applyFilters} />}
    >
      <View className="p-4 gap-6">
        <CollapsibleSection
          title="근무지역"
          isExpanded={expandedSections.location}
          onToggle={() => toggleSection('location')}
          className="pb-4"
        >
          <View className="flex-row flex-wrap gap-2">
            {LOCATION_OPTIONS.map((loc) => (
              <TouchableOpacity
                key={loc}
                onPress={() => toggleLocation(loc)}
                className={`flex-row items-center gap-2 p-3 rounded-lg border ${
                  filters.location.includes(loc)
                    ? 'border-primary-blue bg-blue-50'
                    : 'border-gray-200'
                }`}
                style={{ width: '48%' }}
              >
                <Checkbox checked={filters.location.includes(loc)} size="md" />
                <TextSize size={14} content={loc} />
              </TouchableOpacity>
            ))}
          </View>
        </CollapsibleSection>

        <CollapsibleSection
          title="근무기간"
          isExpanded={expandedSections.period}
          onToggle={() => toggleSection('period')}
          className="pb-4"
        >
          <View className="gap-2">
            {PERIOD_OPTIONS.map((period) => (
              <TouchableOpacity
                key={period.label}
                onPress={() => togglePeriod(period.label)}
                className={`flex-row items-center gap-3 p-3 rounded-lg border ${
                  filters.period.includes(period.label)
                    ? 'border-primary-blue bg-blue-50'
                    : 'border-gray-200'
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
          isExpanded={expandedSections.workdays}
          onToggle={() => toggleSection('workdays')}
          className="pb-4"
        >
          <View className="gap-2">
            {WORKDAYS_OPTIONS.map((workday) => (
              <TouchableOpacity
                key={workday}
                onPress={() => toggleWorkdays(workday)}
                className={`flex-row items-center gap-3 p-3 rounded-lg border ${
                  filters.workdays.includes(workday)
                    ? 'border-primary-blue bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                <Checkbox
                  checked={filters.workdays.includes(workday)}
                  size="md"
                />
                <TextSize size={14} content={workday} />
              </TouchableOpacity>
            ))}
          </View>
        </CollapsibleSection>

        <CollapsibleSection
          title="성별"
          isExpanded={expandedSections.gender}
          onToggle={() => toggleSection('gender')}
          showBorder={false}
        >
          <View className="flex-row gap-2">
            {GENDER_OPTIONS.map((gender) => (
              <TouchableOpacity
                key={gender}
                onPress={() => selectGender(gender)}
                className={`flex-1 flex-row items-center justify-center gap-2 p-3 rounded-lg border ${
                  filters.gender === gender
                    ? 'border-primary-blue bg-blue-50'
                    : 'border-gray-200'
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
