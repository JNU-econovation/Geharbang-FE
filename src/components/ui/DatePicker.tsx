import { toISO } from "@/src/utils/common/dateFormatter";
import { COLORS } from "@/src/utils/constants/colors";
import { View } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";

interface DatePickerProps {
  onDayPress: (date: string) => void;
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
  const pickDate = selectedDate ? new Date(selectedDate) : new Date();

  return (
    <View className="mt-2">
      <DateTimePicker
        mode="single"
        date={pickDate}
        onChange={({ date }) => onDayPress(toISO(date))}
        locale="ko"
        initialView="day"
        minDate={minDate}
        maxDate={maxDate}
        className="bg-black"
        styles={CUSTOM_STYLES}
      />
    </View>
  );
}

const CUSTOM_STYLES = {
  today: { borderColor: COLORS.PRIMARY.BLUE, borderWidth: 2, borderRadius: 50 },

  header: { backgroundColor: "white" },
  days: { backgroundColor: "white" },
  months: { backgroundColor: "white" },
  years: { backgroundColor: "white" },

  // 선택된 일/월/일
  selected: { backgroundColor: COLORS.PRIMARY.BLUE, borderRadius: 50 },
  selected_label: { color: "white" },
  active_year: {
    borderColor: COLORS.PRIMARY.BLUE,
    borderWidth: 1.5,
    borderRadius: 10,
  },
  selected_month: {
    borderColor: COLORS.PRIMARY.BLUE,
    borderWidth: 1.5,
    borderRadius: 10,
  },

  disabled_label: { color: COLORS.GRAY.BORDER }, // 활성화 되지 않는 일/월/일

  // 개별 날짜
  day_label: { color: COLORS.GRAY.TEXT },
  year_label: { color: COLORS.GRAY.TEXT },
  month_label: { color: COLORS.GRAY.TEXT },

  button_prev_image: { tintColor: COLORS.PRIMARY.BLUE, width: 20, height: 20 }, // 왼쪽 화살표
  button_next_image: { tintColor: COLORS.PRIMARY.BLUE, width: 20, height: 20 }, // 오른쪽 화살표

  // 헤더
  month_selector_label: {
    color: COLORS.GRAY.TEXT,
    fontSize: 16,
    backgroundColor: "#e9eaebff",
    borderRadius: 10,
    padding: 10,
  },
  year_selector_label: {
    color: COLORS.GRAY.TEXT,
    fontSize: 16,
    backgroundColor: "#e9eaebff",
    borderRadius: 10,
    padding: 10,
  },
  //요일
  weekdays: { backgroundColor: "white" },
  weekday_label: { color: COLORS.GRAY.TEXT },
};
