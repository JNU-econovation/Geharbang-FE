import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface FilterState {
  location: string[];
  period: string;
  workdays: string;
  gender: string;
}

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

  const toggleSection = (section: 'location' | 'period' | 'workdays' | 'gender') => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const resetFilters = () => {
    setFilters({
      location: [],
      period: '단기',
      workdays: '주 5일 (주말 휴무)',
      gender: '무관',
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

  const selectPeriod = (period: string) => {
    setFilters((prev) => ({ ...prev, period }));
  };

  const selectWorkdays = (workdays: string) => {
    setFilters((prev) => ({ ...prev, workdays }));
  };

  const selectGender = (gender: string) => {
    setFilters((prev) => ({ ...prev, gender }));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50">
        <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90%]">
          {/* Modal Header */}
          <View className="bg-white border-b border-gray-200 px-4 py-4 flex-row items-center justify-between rounded-t-2xl">
            <Text
              className="text-lg font-semibold text-gray-900"
              style={{ fontFamily: 'Noto Sans KR' }}
            >
              {title}
            </Text>
            <TouchableOpacity onPress={onClose} className="p-2">
              <Text className="text-gray-600 text-xl">✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="p-4 gap-6">
              {/* 근무지역 */}
              <View className="border-b border-gray-100 pb-4">
                <TouchableOpacity
                  onPress={() => toggleSection('location')}
                  className="w-full flex-row items-center justify-between py-2"
                >
                  <Text
                    className="font-medium text-gray-900"
                    style={{ fontFamily: 'Noto Sans KR' }}
                  >
                    근무지역
                  </Text>
                  <Text className="text-gray-500">
                    {expandedSections.location ? '▼' : '▶'}
                  </Text>
                </TouchableOpacity>

                {expandedSections.location && (
                  <View className="mt-3 flex-row flex-wrap gap-2">
                    {[
                      '제주시 권역',
                      '서귀포시 권역',
                      '서부권',
                      '동부권',
                      '중문/대정권',
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
                        <View
                          className={`w-4 h-4 rounded border items-center justify-center ${
                            filters.location.includes(loc)
                              ? 'bg-primary-blue border-primary-blue'
                              : 'border-gray-300'
                          }`}
                        >
                          {filters.location.includes(loc) && (
                            <Ionicons name="checkmark" size={12} color="white" />
                          )}
                        </View>
                        <Text
                          className="text-sm"
                          style={{ fontFamily: 'Noto Sans KR' }}
                        >
                          {loc}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* 근무기간 */}
              <View className="border-b border-gray-100 pb-4">
                <TouchableOpacity
                  onPress={() => toggleSection('period')}
                  className="w-full flex-row items-center justify-between py-2"
                >
                  <Text
                    className="font-medium text-gray-900"
                    style={{ fontFamily: 'Noto Sans KR' }}
                  >
                    근무기간
                  </Text>
                  <Text className="text-gray-500">
                    {expandedSections.period ? '▼' : '▶'}
                  </Text>
                </TouchableOpacity>

                {expandedSections.period && (
                  <View className="mt-3 gap-2">
                    {[
                      { label: '단기', desc: '4주 이하' },
                      { label: '중기', desc: '1개월 ~ 3개월' },
                      { label: '장기', desc: '3개월 이상' },
                    ].map((period) => (
                      <TouchableOpacity
                        key={period.label}
                        onPress={() => selectPeriod(period.label)}
                        className={`flex-row items-center gap-3 p-3 rounded-lg border ${
                          filters.period === period.label
                            ? 'border-primary-blue bg-blue-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <View
                          className={`w-5 h-5 rounded-full border ${
                            filters.period === period.label
                              ? 'border-primary-blue border-[6px]'
                              : 'border-gray-300'
                          }`}
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
                )}
              </View>

              {/* 근무일 (휴일) */}
              <View className="border-b border-gray-100 pb-4">
                <TouchableOpacity
                  onPress={() => toggleSection('workdays')}
                  className="w-full flex-row items-center justify-between py-2"
                >
                  <Text
                    className="font-medium text-gray-900"
                    style={{ fontFamily: 'Noto Sans KR' }}
                  >
                    근무일 (휴일)
                  </Text>
                  <Text className="text-gray-500">
                    {expandedSections.workdays ? '▼' : '▶'}
                  </Text>
                </TouchableOpacity>

                {expandedSections.workdays && (
                  <View className="mt-3 gap-2">
                    {[
                      '주 5일 (주말 휴무)',
                      '주 6일 (1일 휴무)',
                      '주 7일 (휴무 없음)',
                      '주 4일 (3일 휴무)',
                      '주 3일 (4일 휴무)',
                    ].map((workday) => (
                      <TouchableOpacity
                        key={workday}
                        onPress={() => selectWorkdays(workday)}
                        className={`flex-row items-center gap-3 p-3 rounded-lg border ${
                          filters.workdays === workday
                            ? 'border-primary-blue bg-blue-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <View
                          className={`w-5 h-5 rounded-full border ${
                            filters.workdays === workday
                              ? 'border-primary-blue border-[6px]'
                              : 'border-gray-300'
                          }`}
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
                )}
              </View>

              {/* 성별 */}
              <View className="pb-4">
                <TouchableOpacity
                  onPress={() => toggleSection('gender')}
                  className="w-full flex-row items-center justify-between py-2"
                >
                  <Text
                    className="font-medium text-gray-900"
                    style={{ fontFamily: 'Noto Sans KR' }}
                  >
                    성별
                  </Text>
                  <Text className="text-gray-500">
                    {expandedSections.gender ? '▼' : '▶'}
                  </Text>
                </TouchableOpacity>

                {expandedSections.gender && (
                  <View className="mt-3 flex-row gap-2">
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
                        <View
                          className={`w-5 h-5 rounded-full border ${
                            filters.gender === gender
                              ? 'border-primary-blue border-[6px]'
                              : 'border-gray-300'
                          }`}
                        />
                        <Text
                          className="text-sm font-medium"
                          style={{ fontFamily: 'Noto Sans KR' }}
                        >
                          {gender}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </ScrollView>

          {/* Modal Footer */}
          <View className="bg-white border-t border-gray-200 p-4 flex-row gap-3">
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
                적용하기 (3)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
