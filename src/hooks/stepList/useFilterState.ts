import { FilterState } from "@/src/types/models/step/types";
import { PerWorkingDay } from "@/src/types/models/stepRecruitment/PerWorkingDay";
import { useState } from "react";

interface UseFilterStateReturn {
  filters: FilterState;
  resetFilters: () => void;
  toggleRegion: (region: string) => void;
  togglePeriod: (period: string) => void;
  selectWorkType: (type: PerWorkingDay) => void;
  setRotationDays: (days: {
    work?: number | null;
    rest?: number | null;
  }) => void;
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
      workType: "",
      workDays: null,
      restDays: null,
      workScheduleType: [],
      gender: "",
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

  const selectWorkType = (type: PerWorkingDay) => {
    setFilters((prev) => ({
      ...prev,
      workType: type,
      workScheduleType: type === "로테이션" ? [] : prev.workScheduleType,
      workDays: type === "_7일_기준" ? null : prev.workDays,
      restDays: type === "_7일_기준" ? null : prev.restDays,
    }));
  };

  const setRotationDays = (days: {
    work?: number | null;
    rest?: number | null;
  }) => {
    setFilters((prev) => ({
      ...prev,
      workDays: days.work !== undefined ? days.work : prev.workDays,
      restDays: days.rest !== undefined ? days.rest : prev.restDays,
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
    selectWorkType,
    setRotationDays,
    toggleWorkScheduleType,
    selectGender,
  };
}
