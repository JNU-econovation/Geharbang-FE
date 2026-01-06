import React, { useState } from "react";

import GuestHouse from "@/public/svgs/Home/guestHouse.svg";
import { useGuestHouseRecommendation } from "@/src/hooks/home/useGuestHouseRecommendation";
import { SlideSectionLayout } from "./SlideSectionLayout";

export function GuesthouseSection() {
  const [selectedRegion, setSelectedRegion] = useState("제주시");
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
