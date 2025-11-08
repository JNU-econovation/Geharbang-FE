import { Option } from "@/src/types/Option";
import { Gender } from "@/src/types/Gender";

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
  { value: "남", label: "남" },
  { value: "여", label: "여" },
  { value: "무관", label: "무관" },
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