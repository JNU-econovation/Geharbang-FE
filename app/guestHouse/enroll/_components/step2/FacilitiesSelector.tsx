import React from 'react';
import { View } from 'react-native';

import AppendableInputGroupContainer from '@/src/components/ui/Form/AppendableInputGroupContainer';
import FormField from '@/src/components/ui/Form/FormField';
import { Feature } from '@/src/types/models/stepRecruitment/Feature';
import {
  PLACEHOLDERS,
  BUTTON_LABELS,
  FORM_DESCRIPTIONS,
  MAX_ITEMS,
} from '@/src/utils/constants/guestHouseEnrollment';

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
      description={`${FORM_DESCRIPTIONS.MAX_10_ITEMS}
        ${FORM_DESCRIPTIONS.CUSTOM_FACILITY_INFO}`}
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
        maxLimit={MAX_ITEMS.FACILITIES}
        buttonLabel={BUTTON_LABELS.ADD_FACILITY}
        placeholder={PLACEHOLDERS.FACILITY_CUSTOM}
        error={!!error}
        clearError={clearError}
      />
    </FormField>
  );
};

export default FacilitiesSelector;
