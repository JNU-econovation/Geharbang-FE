import BottomSheet from '@/src/components/ui/BottomSheet';
import Checkbox from '@/src/components/ui/Checkbox';
import CollapsibleSection from '@/src/components/ui/CollapsibleSection';
import RadioButton from '@/src/components/ui/RadioButton';
import { FilterState } from '@/src/types/step/types';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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

  const [expandedSections, setExpandedSections] = useState({
    location: true,
    period: true,
    workdays: true,
    gender: true,
  });

  const toggleSection = (
    section: 'location' | 'period' | 'workdays' | 'gender',
  ) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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

  const footer = (
    <View className="p-4 flex-row gap-3">
      <TouchableOpacity
        onPress={resetFilters}
        className="flex-1 py-3 border border-gray-300 rounded-lg items-center"
      >
        <Text
          className="text-gray-700 font-medium"
          style={{ fontFamily: 'Noto Sans KR' }}
        >
          초기화
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={applyFilters}
        className="flex-1 py-3 bg-primary-blue rounded-lg items-center"
      >
        <Text
          className="text-white font-medium"
          style={{ fontFamily: 'Noto Sans KR' }}
        >
          적용하기
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title={title}
      footer={footer}
    >
      <View className="p-4 gap-6">
        <CollapsibleSection
          title="근무지역"
          isExpanded={expandedSections.location}
          onToggle={() => toggleSection('location')}
        >
          <View className="flex-row flex-wrap gap-2">
            {[
              '제주시',
              '서귀포시',
              '서부권',
              '동부권',
              '중문/대정',
              '도서지역',
            ].map((loc) => (
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
                <Text className="text-sm">{loc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </CollapsibleSection>

        <CollapsibleSection
          title="근무기간"
          isExpanded={expandedSections.period}
          onToggle={() => toggleSection('period')}
        >
          <View className="gap-2">
            {[
              { label: '단기', desc: '4주 이하' },
              { label: '중기', desc: '1개월 ~ 3개월' },
              { label: '장기', desc: '3개월 이상' },
            ].map((period) => (
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
                  <Text
                    className="text-sm font-medium"
                    style={{ fontFamily: 'Noto Sans KR' }}
                  >
                    {period.label}
                  </Text>
                  <Text
                    className="text-xs text-gray-500"
                    style={{ fontFamily: 'Noto Sans KR' }}
                  >
                    {period.desc}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </CollapsibleSection>

        <CollapsibleSection
          title="근무일 (휴일)"
          isExpanded={expandedSections.workdays}
          onToggle={() => toggleSection('workdays')}
        >
          <View className="gap-2">
            {[
              '주 1일 (6일 휴무)',
              '주 2일 (5일 휴무)',
              '주 3일 (4일 휴무)',
              '주 4일 (3일 휴무)',
              '주 5일 (2일 휴무)',
            ].map((workday) => (
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
                <Text
                  className="text-sm font-medium"
                  style={{ fontFamily: 'Noto Sans KR' }}
                >
                  {workday}
                </Text>
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
            {['무관', '남', '여'].map((gender) => (
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
                <Text
                  className="text-sm font-medium"
                  style={{ fontFamily: 'Noto Sans KR' }}
                >
                  {gender}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </CollapsibleSection>
      </View>
    </BottomSheet>
  );
}
