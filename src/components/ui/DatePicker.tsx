import { COLORS } from "@/src/utils/constants/colors";
import { Calendar, DateData } from "react-native-calendars";

interface DatePickerProps {
  onDayPress: (date: DateData) => void;
  selectedDate: string;
  minDate?: string;
  maxDate?: string;
}

export default function DatePicker({
  onDayPress,
  selectedDate,
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
      style={{ zIndex: 999 }}
      className="w-88"
      minDate={minDate}
      maxDate={maxDate}
    />
  );
}
