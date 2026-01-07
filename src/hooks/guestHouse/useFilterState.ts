import { FilterState } from "@/src/types/models/guestHouse/types";
import { useState } from "react";

interface UseFilterStateReturn {
  filters: FilterState;
  resetFilters: () => void;
  toggleFilter: <K extends keyof FilterState>(key: K, value: string) => void;
  setRoomPrice: (type: "lowest" | "highest", value: number | null) => void;
  setRoomPriceRange: (min: number | null, max: number | null) => void;
}

export function useFilterState(
  initialFilters: FilterState
): UseFilterStateReturn {
  const [filters, setFilters] = useState(initialFilters);

  const resetFilters = () => {
    setFilters({ ...initialFilters });
  };

  // 공통 토글 함수
  const toggleFilter = <K extends keyof FilterState>(key: K, value: string) => {
    setFilters((prev) => {
      const currentList = (prev[key] as string[]) || [];

      const newList = currentList.includes(value)
        ? currentList.filter((item) => item !== value)
        : [...currentList, value];

      return {
        ...prev,
        [key]: newList,
      };
    });
  };

  const setRoomPrice = (type: "lowest" | "highest", value: number | null) => {
    setFilters((prev) => ({
      ...prev,
      [type === "lowest" ? "lowestRoomPrice" : "highestRoomPrice"]: value,
    }));
  };

  const setRoomPriceRange = (min: number | null, max: number | null) => {
    setFilters((prev) => ({
      ...prev,
      lowestRoomPrice: min,
      highestRoomPrice: max,
    }));
  };

  return {
    filters,
    resetFilters,
    toggleFilter,
    setRoomPrice,
    setRoomPriceRange,
  };
}
