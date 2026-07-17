import React from 'react';
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

  const toggleAtmosphere = (atmosphereOption: string) => {
    const current = step2Data.atmosphere;
    let newValue: string[];

    if (current.includes(atmosphereOption)) {
      newValue = current.filter((a) => a !== atmosphereOption);
    } else if (current.length < maxSelections) {
      newValue = [...current, atmosphereOption];
    } else {
      return;
    }

    setStep2Update('atmosphere', newValue);
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
            const isSelected = step2Data.atmosphere.includes(atmosphereOption.value);
            return (
              <SelectableTag
                key={atmosphereOption.value}
                label={atmosphereOption.label}
                selected={isSelected}
                onPress={() => toggleAtmosphere(atmosphereOption.value)}
              />
            );
          })}
        </View>
      </View>
    </FormField>
  );
};

export default AtmosphereSelector;
