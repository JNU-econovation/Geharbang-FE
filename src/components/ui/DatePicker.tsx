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
        { width: size, zIndex: 999, position: "absolute" },

        align === "left" ? { left: 0 } : null,
        align === "right" ? { right: 0 } : null,
        align === "center" ? { alignSelf: "center" } : null,
      ]}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
}
