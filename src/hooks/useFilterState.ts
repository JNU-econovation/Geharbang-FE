import { FilterState } from '@/src/types/step/types';
import { useState } from 'react';

interface UseFilterStateReturn {
  filters: FilterState;
  resetFilters: () => void;
  toggleLocation: (location: string) => void;
  togglePeriod: (period: string) => void;
  toggleWorkdays: (workdays: string) => void;
  selectGender: (gender: string) => void;
}

export function useFilterState(
  initialFilters: FilterState
): UseFilterStateReturn {
  const [filters, setFilters] = useState(initialFilters);

  const resetFilters = () => {
    setFilters({
      location: [],
      period: [],
      workdays: [],
      gender: '',
    });
  };

  const toggleLocation = (location: string) => {
    setFilters((prev) => ({
      ...prev,
      location: prev.location.includes(location)
        ? prev.location.filter((loc) => loc !== location)
        : [...prev.location, location],
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

  const toggleWorkdays = (workdays: string) => {
    setFilters((prev) => ({
      ...prev,
      workdays: prev.workdays.includes(workdays)
        ? prev.workdays.filter((w) => w !== workdays)
        : [...prev.workdays, workdays],
    }));
  };

  const selectGender = (gender: string) => {
    setFilters((prev) => ({ ...prev, gender }));
  };

  return {
    filters,
    resetFilters,
    toggleLocation,
    togglePeriod,
    toggleWorkdays,
    selectGender,
  };
}
