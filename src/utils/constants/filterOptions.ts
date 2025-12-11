export const REGION_OPTIONS = [
  "제주시",
  "서귀포시",
  "서부권",
  "동부권",
  "도서지역",
  "중문_대정",
] as const;

export const PERIOD_OPTIONS = [
  { label: "단기", desc: "4주 이하" },
  { label: "중기", desc: "1개월 ~ 3개월" },
  { label: "장기", desc: "3개월 이상" },
] as const;

export const WORK_SCHEDULE_OPTIONS = [
  { label: "주1일", desc: "주6일 휴무" },
  { label: "주2일", desc: "주5일 휴무" },
  { label: "주3일", desc: "주4일 휴무" },
  { label: "주4일", desc: "주3일 휴무" },
  { label: "주5일", desc: "주2일 휴무" },
] as const;

export const WORK_TYPES = [
  { label: "로테이션", value: "로테이션" },
  { label: "7일 기준", value: "_7일_기준" },
] as const;

export const GENDER_OPTIONS = ["무관", "남", "여"] as const;

// api 한글 값 전송하는 용도
export const SORT_OPTIONS = {
  views: "조회순",
  likes: "찜_많은순",
  recent: "최신순",
} as const;
