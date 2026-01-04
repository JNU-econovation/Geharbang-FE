import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import FormField from '@/src/components/ui/Form/FormField';
import { useGuestHouseStore } from '@/src/stores/guestHouse/useGuestHouseStore';

interface TagProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

const Tag = React.memo(({ label, selected = false, onPress }: TagProps) => {
  const bgColor = selected ? 'bg-sky-500' : 'bg-gray-100';
  const textColor = selected ? 'text-white' : 'text-[#364153]';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-full mr-2 mb-2 ${bgColor}`}
      style={
        selected
          ? {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }
          : undefined
      }
    >
      <Text className={`text-[13px] font-normal leading-5 ${textColor}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
});

const ATMOSPHERE_OPTIONS = [
  '조용한',
  '활기찬',
  '아늑한',
  '모던한',
  '전통적인',
  '자유로운',
];

interface AtmosphereSelectorProps {
  error?: string;
  clearError?: () => void;
  maxSelections?: number;
}

const AtmosphereSelector = ({
  error,
  clearError,
  maxSelections = 2,
}: AtmosphereSelectorProps) => {
  const { step2Data, setStep2Update } = useGuestHouseStore();

  const [selectedAtmosphere, setSelectedAtmosphere] = useState<string[]>(
    () => step2Data.atmosphere,
  );

  useEffect(() => {
    setSelectedAtmosphere(step2Data.atmosphere);
  }, [step2Data.atmosphere]);

  const toggleAtmosphere = (atmosphereOption: string) => {
    setSelectedAtmosphere((prev) => {
      let newValue: string[];
      if (prev.includes(atmosphereOption)) {
        newValue = prev.filter((a) => a !== atmosphereOption);
      } else if (prev.length < maxSelections) {
        newValue = [...prev, atmosphereOption];
      } else {
        return prev;
      }

      setTimeout(() => {
        setStep2Update('atmosphere', newValue);
      }, 0);

      return newValue;
    });
    clearError?.();
  };
  return (
    <FormField
      label="게스트하우스 분위기"
      required={true}
      description={`최대 ${maxSelections}개까지 선택할 수 있습니다`}
      errorMessage={error}
    >
      <View className="bg-white rounded-xl border border-gray-200 p-4">
        <View className="flex-row flex-wrap">
          {ATMOSPHERE_OPTIONS.map((atmosphereOption) => {
            const isSelected =
              selectedAtmosphere.indexOf(atmosphereOption) !== -1;
            return (
              <Tag
                key={atmosphereOption}
                label={atmosphereOption}
                selected={isSelected}
                onPress={() => toggleAtmosphere(atmosphereOption)}
              />
            );
          })}
        </View>
      </View>
    </FormField>
  );
};

export default AtmosphereSelector;
