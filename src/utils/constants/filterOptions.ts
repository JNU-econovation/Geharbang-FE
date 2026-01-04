// 공통
export const REGION_OPTIONS = [
  "제주시",
  "서귀포시",
  "서부권",
  "동부권",
  "도서지역",
  "중문_대정",
] as const;

export const SORT_OPTIONS = {
  views: "조회순",
  likes: "찜_많은순",
  recent: "최신순",
} as const;

// 스텝 공고 목록
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

// 게하 목록
export const MOOD_OPTIONS = [
  { label: "#조용한", value: "조용한" },
  { label: "#사교적", value: "사교적" },
  { label: "#힐링", value: "힐링" },
  { label: "#사색", value: "사색" },
  { label: "#활발한", value: "활발한" },
  { label: "#잔잔한", value: "잔잔한" },
  { label: "#감성", value: "감성" },
  { label: "#휴식", value: "휴식" },
]

export const ROOM_PRICE_OPTIONS = [
  { label: "2만원 이하", min: null, max: 20000 },
  { label: "2~5만원", min: 20000, max: 50000 },
  { label: "5~10만원", min: 50000, max: 100000 },
];

export const PARTY_TYPE_OPTIONS = [
  { label: "술파티", value: "술파티" },
  { label: "포틀럭", value: "포틀럭" },
  { label: "디너 파티", value: "디너_파티" },
  { label: "클럽 파티", value: "클럽_파티" },
  { label: "기타", value: "기타" },
];

export const ROOM_TYPE_OPTIONS = [
  { label: "여성전용 도미토리", value: "여성전용" },
  { label: "남성전용 도미토리", value: "남성전용" },
];

export const HEAD_COUNT_TYPE_OPTIONS = [
  { label: "1인실", value: "_1인실" },
  { label: "2인실", value: "_2인실" },
  { label: "3인이상", value: "_3인이상" },
];

export const AMENITY_OPTIONS = [
  { label: "주차장", value: "주차장" },
  { label: "조식제공", value: "조식제공" },
  { label: "개별화장실", value: "개별화장실" },
  { label: "세탁시설", value: "세탁시설" },
  { label: "CCTV", value: "CCTV" },
];
