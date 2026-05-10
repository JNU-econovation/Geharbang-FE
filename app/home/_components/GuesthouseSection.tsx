import React from "react";

import GuestHouse from "@/public/svgs/Home/guestHouse.svg";
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
      title='게스트하우스 찾기'
      icon={<GuestHouse />}
      data={data}
      linkPath='/guestHouse'
      selectedRegion={selectedRegion}
      setSelectedRegion={setSelectedRegion}
      loading={isLoading}
      error={isError}
    />
  );
}
