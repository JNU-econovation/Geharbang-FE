export interface PressSectionItems {
  section: string;
  content: string;
}

export const STEP_DETAIL: PressSectionItems[] = [
  { section: "address", content: "위치" },
  { section: "workInfo", content: "근무 정보" },
  { section: "intro", content: "소개" },
  { section: "feature", content: "모집 정보" },
  { section: "contact", content: "연락처" },
];

export const GUESTHOUSE: PressSectionItems[] = [
  { section: "address", content: "위치" },
  { section: "type", content: "객실타입" },
  { section: "intro", content: "게하소개" },
  { section: "info", content: "게하정보" },
  { section: "party", content: "파티" },
  { section: "contact", content: "연락처" },
];
