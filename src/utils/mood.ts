import { MOOD_OPTIONS } from "./constants/filterOptions";

const MOOD_LABELS: Record<string, string> = Object.fromEntries(
  MOOD_OPTIONS.map((option) => [option.value, option.label.replace(/^#/, "")])
);

export const formatMoodLabel = (mood?: string | null) => {
  if (!mood) {
    return "";
  }

  return MOOD_LABELS[mood] ?? mood;
};

// 2026-07-19 분위기 개편 이전 값 -> 이후 값. 기기에 남아있는 임시저장 데이터를 위해 유지.
const LEGACY_MOOD_MIGRATION_MAP: Record<string, string> = {
  사교적: "소규모파티",
  힐링: "자연_숲",
  사색: "조용한",
  잔잔한: "조용한",
  감성: "감성_느좋",
  휴식: "한달살이",
};

export const migrateLegacyMoodValue = (mood: string) =>
  LEGACY_MOOD_MIGRATION_MAP[mood] ?? mood;

export const migrateLegacyMoodValues = (moods: string[]) =>
  Array.from(new Set(moods.map(migrateLegacyMoodValue)));
