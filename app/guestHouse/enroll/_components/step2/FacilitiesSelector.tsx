import React from 'react';
import { View } from 'react-native';

import AppendableInputGroupContainer from '@/src/components/ui/Form/AppendableInputGroupContainer';
import FormField from '@/src/components/ui/Form/FormField';
import SelectableTag from '@/src/components/ui/SelectableTag';
import { Feature } from '@/src/types/models/stepRecruitment/Feature';
import {
  PLACEHOLDERS,
  BUTTON_LABELS,
  FORM_DESCRIPTIONS,
  MAX_ITEMS,
} from '@/src/utils/constants/guestHouseEnrollment';

interface FacilitiesSelectorProps {
  facilityOptions: readonly string[];
  selectedFacilities: string[];
  onToggleFacility: (facility: string) => void;
  customFacilities: Feature[];
  onCustomFacilitiesChange: (features: Feature[]) => void;
  error?: string;
  clearError?: () => void;
}

const FacilitiesSelector = ({
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
        <View className="flex-row flex-wrap mb-2">
          {facilityOptions.slice(0, 2).map((facility) => {
            const isSelected = selectedFacilities.indexOf(facility) !== -1;
            return (
              <SelectableTag
                key={facility}
                label={facility}
                selected={isSelected}
                onPress={() => onToggleFacility(facility)}
              />
            );
          })}
        </View>
        <View className="flex-row flex-wrap">
          {facilityOptions.slice(2).map((facility) => {
            const isSelected = selectedFacilities.indexOf(facility) !== -1;
            return (
              <SelectableTag
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
          if (typeof value === 'function') {
            onCustomFacilitiesChange(value(customFacilities));
          } else {
            onCustomFacilitiesChange(value);
          }
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
