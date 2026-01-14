import { DateType } from "react-native-ui-datepicker";

export const fmt = (d: Date): string => {
  if (isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
};

export const toISO = (input: DateType): string => {
  if (input instanceof Date) {
    return fmt(input);
  } else if (typeof input === "number") {
    return fmt(new Date(input));
  } else if (typeof input === "string") {
    return fmt(new Date(input));
  }
  return "";
};

/**
 * Date 객체를 HH:MM 형식의 시간 문자열로 변환합니다.
 * @param date - 변환할 Date 객체
 * @returns HH:MM 형식의 시간 문자열 (예: "14:30")
 */
export const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};