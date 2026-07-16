import { REGION_OPTIONS } from "./constants/filterOptions";

const REGION_LABELS: Record<string, string> = Object.fromEntries(
  REGION_OPTIONS.map((option) => [option.value, option.label])
);

export const formatRegionLabel = (region?: string | null) => {
  if (!region) {
    return "";
  }

  return REGION_LABELS[region] ?? region;
};

// 2026-07-17 지역 개편 이전 값 -> 이후 값. 기기에 남아있는 임시저장 데이터를 위해 유지.
const LEGACY_REGION_MIGRATION_MAP: Record<string, string> = {
  서부권: "애월_협재",
  동부권: "성산_구좌",
  도서지역: "우도_기타",
  중문_대정: "중문",
};

export const migrateLegacyRegionValue = (region: string) =>
  LEGACY_REGION_MIGRATION_MAP[region] ?? region;
