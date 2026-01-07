import React, { useEffect, useMemo, useState } from 'react';

import { useGuestHouseStore } from '@/src/stores/guestHouse/useGuestHouseStore';
import { Feature } from '@/src/types/models/stepRecruitment/Feature';
import { FACILITY_OPTIONS } from '@/src/utils/constants/guestHouseEnrollment';

import FacilitiesSelector from './FacilitiesSelector';

interface FacilitiesFormProps {
  errors?: {
    facilities?: string;
  };
  clearError?: (field: 'facilities') => void;
}

const FacilitiesForm = ({ errors, clearError }: FacilitiesFormProps) => {
  const { step2Data, setStep2Update } = useGuestHouseStore();

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(() =>
    step2Data.facilities.filter((f) =>
      (FACILITY_OPTIONS as readonly string[]).includes(f),
    ),
  );

  useEffect(() => {
    const storeFacilities = step2Data.facilities.filter((f) =>
      (FACILITY_OPTIONS as readonly string[]).includes(f),
    );
    setSelectedFacilities(storeFacilities);
  }, [step2Data.facilities]);

  const toggleFacility = (facility: string) => {
    const newValue = selectedFacilities.includes(facility)
      ? selectedFacilities.filter((f) => f !== facility)
      : [...selectedFacilities, facility];

    setSelectedFacilities(newValue);

    setStep2Update('facilities', (storePrev) => {
      const tagFacilities = storePrev.filter(
        (f) => !(FACILITY_OPTIONS as readonly string[]).includes(f),
      );
      return [...newValue, ...tagFacilities];
    });

    clearError?.('facilities');
  };

  const customFacilitiesAsFeatures = useMemo(() => {
    const customFacilities = step2Data.facilities.filter(
      (f: string) => !(FACILITY_OPTIONS as readonly string[]).includes(f),
    );
    return customFacilities.map((text: string, index: number) => ({
      id: `custom-${index}`,
      text,
    }));
  }, [
    step2Data.facilities
      .filter((f) => !(FACILITY_OPTIONS as readonly string[]).includes(f))
      .join(','),
  ]);

  const handleCustomFacilitiesChange = (features: Feature[]) => {
    setStep2Update('facilities', (prev) => {
      const tagFacilities = prev.filter((f) =>
        (FACILITY_OPTIONS as readonly string[]).includes(f),
      );

      const customTexts = features.map((f) => f.text);
      return [...tagFacilities, ...customTexts];
    });
  };

  return (
    <FacilitiesSelector
      facilityOptions={FACILITY_OPTIONS}
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
