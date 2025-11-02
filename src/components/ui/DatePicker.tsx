import { COLORS } from "@/src/utils/constants/colors"
import { Calendar, DateData } from "react-native-calendars";

interface DatePickerProps {
  onDayPress: (date: DateData) => void;
  selectedDate: string;
  size: number;
  align?: string;
  minDate?: string;
  maxDate?: string;
}

export default function DatePicker({
  onDayPress,
  selectedDate,
  size,
  align = "center",
  minDate,
  maxDate,
}: DatePickerProps) {
  return (
    <Calendar
      onDayPress={onDayPress}
      monthFormat="yyyy년 MM월"
      markedDates={{
        [selectedDate]: {
          selected: true,
          selectedColor: COLORS.PRIMARY.BLUE,
        },
      }}
      style={[
        { width: size, zIndex: 999 },

        align === "left" ? { alignSelf: "flex-start" } : null,
        align === "right" ? { alignSelf: "flex-end" } : null,
        align === "center" ? { alignSelf: "center" } : null,
      ]}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
}
