import React, { useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useGuestHouseStore } from '@/src/stores/guestHouse/useGuestHouseStore';
import { Feature } from '@/src/types/models/stepRecruitment/Feature';
import { FACILITY_OPTIONS } from '@/src/utils/constants/guestHouseEnrollment';

import FacilitiesSelector from './FacilitiesSelector';

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

interface FacilitiesFormProps {
  errors?: {
    facilities?: string;
  };
  clearError?: (field: 'facilities') => void;
}

const FacilitiesForm = ({ errors, clearError }: FacilitiesFormProps) => {
  const { step2Data, setStep2Update } = useGuestHouseStore();

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(() =>
    step2Data.facilities.filter((f) => FACILITY_OPTIONS.includes(f)),
  );

  useEffect(() => {
    const storeFacilities = step2Data.facilities.filter((f) =>
      FACILITY_OPTIONS.includes(f),
    );
    setSelectedFacilities(storeFacilities);
  }, [step2Data.facilities]);

  const toggleFacility = (facility: string) => {
    setSelectedFacilities((prev) => {
      const newValue = prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility];

      return newValue;
    });

    setTimeout(() => {
      setStep2Update('facilities', (storePrev) => {
        const currentSelected = selectedFacilities.includes(facility)
          ? selectedFacilities.filter((f) => f !== facility)
          : [...selectedFacilities, facility];
        const tagFacilities = storePrev.filter(
          (f) => !FACILITY_OPTIONS.includes(f),
        );
        return [...currentSelected, ...tagFacilities];
      });
    }, 0);

    clearError?.('facilities');
  };

  const customFacilitiesAsFeatures = useMemo(() => {
    return step2Data.facilities
      .filter((f: string) => !FACILITY_OPTIONS.includes(f))
      .map((text: string, index: number) => ({
        id: `custom-${index}`,
        text,
      }));
  }, [step2Data.facilities]);

  const handleCustomFacilitiesChange = (features: Feature[]) => {
    setStep2Update('facilities', (prev) => {
      const tagFacilities = prev.filter((f) => FACILITY_OPTIONS.includes(f));

      const customTexts = features.map((f) => f.text);
      return [...tagFacilities, ...customTexts];
    });
  };

  return (
    <FacilitiesSelector
      Tag={Tag}
      facilityOptions={[...FACILITY_OPTIONS]}
      selectedFacilities={selectedFacilities}
      onToggleFacility={toggleFacility}
      customFacilities={customFacilitiesAsFeatures}
      onCustomFacilitiesChange={handleCustomFacilitiesChange}
      error={errors?.facilities}
      clearError={() => clearError?.('facilities')}
    />
  );
};

export default FacilitiesForm;
