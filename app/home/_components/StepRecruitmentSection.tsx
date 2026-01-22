import React, { useState } from "react";

import Step from "@/public/svgs/Home/step.svg";
import { useStepRecommendation } from "@/src/hooks/home/useStepRecommendation ";
import { SlideSectionLayout } from "./SlideSectionLayout";

export function StepRecruitmentSection() {
  const [selectedRegion, setSelectedRegion] = useState("제주시");
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
