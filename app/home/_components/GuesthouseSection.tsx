import React from "react";

import { useGuestHouseRecommendation } from "@/src/hooks/home/useGuestHouseRecommendation";
import { SlideSectionLayout } from "./SlideSectionLayout";

interface GuesthouseSectionProps {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}

export function GuesthouseSection({ selectedRegion, setSelectedRegion }: GuesthouseSectionProps) {
  const {
    data = [],
    isLoading,
    isError,
  } = useGuestHouseRecommendation(selectedRegion);

  return (
    <SlideSectionLayout
      itemType='guestHouse'
      titleLine1='당신을 위한'
      titleLine2='게스트하우스 찾기'
      data={data}
      linkPath='/guestHouse'
      selectedRegion={selectedRegion}
      setSelectedRegion={setSelectedRegion}
      loading={isLoading}
      error={isError}
    />
  );
}

export default GuesthouseSection;
