import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import FormField from '@/src/components/ui/Form/FormField';
import SelectableTag from '@/src/components/ui/SelectableTag';
import { useGuestHouseStore } from '@/src/stores/guestHouse/useGuestHouseStore';
import {
  ATMOSPHERE_OPTIONS,
  VALIDATION_LIMITS,
} from '@/src/utils/constants/guestHouseEnrollment';

interface AtmosphereSelectorProps {
  error?: string;
  clearError?: () => void;
  maxSelections?: number;
}

const AtmosphereSelector = ({
  error,
  clearError,
  maxSelections = VALIDATION_LIMITS.ATMOSPHERE.MAX,
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

      setStep2Update('atmosphere', newValue);
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
              <SelectableTag
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
