import React from 'react';
import { View } from 'react-native';

import AppendableInputGroupContainer from '@/src/components/ui/Form/AppendableInputGroupContainer';
import FormField from '@/src/components/ui/Form/FormField';
import { Feature } from '@/src/types/models/stepRecruitment/Feature';

interface FacilitiesSelectorProps {
  Tag: React.ComponentType<{ label: string; selected: boolean; onPress: () => void }>;
  facilityOptions: string[];
  selectedFacilities: string[];
  onToggleFacility: (facility: string) => void;
  customFacilities: Feature[];
  onCustomFacilitiesChange: (features: Feature[]) => void;
  error?: string;
  clearError?: () => void;
}

const FacilitiesSelector = ({
  Tag,
  facilityOptions,
  selectedFacilities,
  onToggleFacility,
  customFacilities,
  onCustomFacilitiesChange,
  error,
  clearError,
}: FacilitiesSelectorProps) => {
  return (
    <FormField
      label="제공 편의시설"
      required={true}
      description="최대 10개까지 등록할 수 있습니다
        목록에 없는 시설은 직접 입력해 추가할 수 있습니다"
      errorMessage={error}
    >
      <View className="bg-white rounded-xl border border-gray-200 p-4 mb-2">
        <View className="flex-row flex-wrap">
          {facilityOptions.map((facility) => {
            const isSelected = selectedFacilities.indexOf(facility) !== -1;
            return (
              <Tag
                key={facility}
                label={facility}
                selected={isSelected}
                onPress={() => onToggleFacility(facility)}
              />
            );
          })}
        </View>
      </View>

      <AppendableInputGroupContainer
        features={customFacilities}
        setFeatures={(value) => {
          const newFeatures =
            typeof value === 'function' ? value(customFacilities) : value;
          onCustomFacilitiesChange(newFeatures);
          clearError?.();
        }}
        maxLimit={10}
        buttonLabel="편의시설 추가"
        placeholder="예: 공용주방, 세탁시설"
        error={!!error}
        clearError={clearError}
      />
    </FormField>
  );
};

export default FacilitiesSelector;
