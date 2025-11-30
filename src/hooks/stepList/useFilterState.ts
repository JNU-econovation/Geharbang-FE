import { FilterState } from '@/src/types/step/types';
import { useState } from 'react';

interface UseFilterStateReturn {
  filters: FilterState;
  resetFilters: () => void;
  toggleRegion: (region: string) => void;
  togglePeriod: (period: string) => void;
  toggleWorkScheduleType: (workScheduleType: string) => void;
  selectGender: (gender: string) => void;
}

export function useFilterState(
  initialFilters: FilterState
): UseFilterStateReturn {
  const [filters, setFilters] = useState(initialFilters);

  const resetFilters = () => {
    setFilters({
      region: [],
      period: [],
      workScheduleType: [],
      gender: '',
    });
  };

  const toggleRegion = (region: string) => {
    setFilters((prev) => ({
      ...prev,
      region: prev.region.includes(region)
        ? prev.region.filter((r) => r !== region)
        : [...prev.region, region],
    }));
  };

  const togglePeriod = (period: string) => {
    setFilters((prev) => ({
      ...prev,
      period: prev.period.includes(period)
        ? prev.period.filter((p) => p !== period)
        : [...prev.period, period],
    }));
  };

  const toggleWorkScheduleType = (workScheduleType: string) => {
    setFilters((prev) => ({
      ...prev,
      workScheduleType: prev.workScheduleType.includes(workScheduleType)
        ? prev.workScheduleType.filter((w) => w !== workScheduleType)
        : [...prev.workScheduleType, workScheduleType],
    }));
  };

  const selectGender = (gender: string) => {
    setFilters((prev) => ({ ...prev, gender }));
  };

  return {
    filters,
    resetFilters,
    toggleRegion,
    togglePeriod,
    toggleWorkScheduleType,
    selectGender,
  };
}
