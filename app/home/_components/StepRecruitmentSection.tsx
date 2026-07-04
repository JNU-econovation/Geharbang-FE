import React from "react";

import Step from "@/public/svgs/Home/step.svg";
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
      title='스텝 공고 찾기'
      icon={<Step />}
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
