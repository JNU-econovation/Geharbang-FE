import { Pressable, View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import DatePicker from "@/src/components/ui/DatePicker";
import TextSize from "@/src/components/ui/TextSize";
import { useDatePicker } from "@/src/hooks/useDatePicker";
import { COLORS } from "@/src/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";

interface DateInputFieldProps {
  setSelectedDate: (date: string) => void;
  selectedDate: string;
  error?: boolean;
  width?: number;
  minDate?: string;
  maxDate?: string;
}

export default function DateInputField({
  setSelectedDate,
  selectedDate,
  error,
  width,
  minDate,
  maxDate,
}: DateInputFieldProps) {
  const { toggleCalendar, setToggleCalendar, onDayPress } =
    useDatePicker(setSelectedDate);

  return (
    <View className="relative" style={{ width }}>
      <Pressable
        onPress={() => setToggleCalendar((prev) => !prev)}
        className={`border rounded-lg p-3 ${
          error ? "border-primary-red" : "border-gray-border"
        }`}
      >
        <Flex items="center" justify="between" flexDir="row">
          <TextSize
            size={16}
            color={selectedDate ? "black" : COLORS.GRAY.PLACEHOLDER}
            content={selectedDate ? selectedDate : "yyyy-mm-dd"}
          />
          <Ionicons
            name="calendar-clear-outline"
            color={COLORS.GRAY.PLACEHOLDER}
            size={22}
          />
        </Flex>
      </Pressable>

      {toggleCalendar && (
        <DatePicker
          onDayPress={onDayPress}
          selectedDate={selectedDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
    </View>
  );
}
