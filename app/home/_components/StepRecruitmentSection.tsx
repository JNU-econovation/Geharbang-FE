import React from "react";

import { useStepRecommendation } from "@/src/hooks/home/useStepRecommendation ";
import { SlideSectionLayout } from "./SlideSectionLayout";

interface StepRecruitmentSectionProps {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}

export function StepRecruitmentSection({ selectedRegion, setSelectedRegion }: StepRecruitmentSectionProps) {
  const {
    data = [],
    isLoading,
    isError,
  } = useStepRecommendation(selectedRegion);

  return (
    <SlideSectionLayout
      itemType='stepNotice'
      titleLine1='게스트하우스 스텝에'
      titleLine2='지금 지원해보세요'
      data={data}
      linkPath='/step'
      selectedRegion={selectedRegion}
      setSelectedRegion={setSelectedRegion}
      loading={isLoading}
      error={isError}
    />
  );
}

export default StepRecruitmentSection;
