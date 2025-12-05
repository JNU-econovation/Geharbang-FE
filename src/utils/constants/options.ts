import { Gender } from "@/src/types/Gender";
import { PerWorkingDay } from "@/src/types/models/stepRecruitment/PerWorkingDay";

import { Option } from "@/src/types/Option";

export const STYLE_OPTIONS: Option[] = [
  { value: "친근한", label: "#친근한" },
  { value: "활발한", label: "#활발한" },
  { value: "차분한", label: "#차분한" },
  { value: "성실한", label: "#성실한" },
  { value: "유머", label: "#유머" },
  { value: "책임감", label: "#책임감" },
];

export const GENDER_BASIC: Option<Gender>[] = [
  { value: "남", label: "남" },
  { value: "여", label: "여" },
];

export const GENDER_FULL: Option<Gender>[] = [
  { value: "무관", label: "무관" },
  { value: "남", label: "남" },
  { value: "여", label: "여" },
];

export const DAYS_OF_WEEK: Option[] = [
  { value: "월", label: "월" },
  { value: "화", label: "화" },
  { value: "수", label: "수" },
  { value: "목", label: "목" },
  { value: "금", label: "금" },
  { value: "토", label: "토" },
  { value: "일", label: "일" },
];

export const REGION_OPTION: Option[] = [
  { value: "제주시", label: "제주시" },
  { value: "서귀포시", label: "서귀포시" },
  { value: "서부권", label: "서부권" },
  { value: "동부권", label: "동부권" },
  { value: "중문_대정", label: "중문_대정" },
  { value: "도서지역", label: "도서지역" },
];

export const WORKING_PERIOD = [
  { value: "단기", label: "단기", content: "4주 이하" },
  { value: "중기", label: "중기", content: "1개월 ~ 3개월" },
  { value: "장기", label: "장기", content: "3개월 이상" },
];

export const PER_WORKING_DAY: Option<PerWorkingDay>[] = [
  { value: "로테이션", label: "로테이션" },
  { value: "_7일_기준", label: "7일 기준" },
];
