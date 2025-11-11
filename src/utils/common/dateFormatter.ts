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