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

  const [localCustomFacilities, setLocalCustomFacilities] = useState<Feature[]>(
    [],
  );

  useEffect(() => {
    const customFacilities = step2Data.facilities.filter(
      (f: string) => !(FACILITY_OPTIONS as readonly string[]).includes(f),
    );
    const features = customFacilities.map((text: string, index: number) => ({
      id: `custom-${index}`,
      text,
    }));
    setLocalCustomFacilities(features);
  }, [
    step2Data.facilities
      .filter((f) => !(FACILITY_OPTIONS as readonly string[]).includes(f))
      .join(','),
  ]);

  const selectedFacilities = useMemo(
    () =>
      step2Data.facilities.filter((f) =>
        (FACILITY_OPTIONS as readonly string[]).includes(f),
      ),
    [step2Data.facilities],
  );

  const toggleFacility = (facility: string) => {
    const customTexts = localCustomFacilities
      .map((f) => f.text)
      .filter((text) => text.trim() !== '');

    let newSelectedFacilities: string[];
    if (selectedFacilities.includes(facility)) {
      newSelectedFacilities = selectedFacilities.filter((f) => f !== facility);
    } else {
      newSelectedFacilities = [...selectedFacilities, facility];
    }

    setStep2Update('facilities', [...newSelectedFacilities, ...customTexts]);
    clearError?.('facilities');
  };

  const handleCustomFacilitiesChange = (features: Feature[]) => {
    setLocalCustomFacilities(features);

    setStep2Update('facilities', (prev) => {
      const tagFacilities = prev.filter((f) =>
        (FACILITY_OPTIONS as readonly string[]).includes(f),
      );

      const customTexts = features
        .map((f) => f.text)
        .filter((text) => text.trim() !== '');
      return [...tagFacilities, ...customTexts];
    });

    clearError?.('facilities');
  };

  return (
    <FacilitiesSelector
      facilityOptions={FACILITY_OPTIONS}
      selectedFacilities={selectedFacilities}
      onToggleFacility={toggleFacility}
      customFacilities={localCustomFacilities}
      onCustomFacilitiesChange={handleCustomFacilitiesChange}
      error={errors?.facilities}
      clearError={() => clearError?.('facilities')}
    />
  );
};

export default FacilitiesForm;
