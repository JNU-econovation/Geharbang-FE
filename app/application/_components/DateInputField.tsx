import DatePicker from "@/src/components/ui/DatePicker";
import { useDatePicker } from "@/src/hooks/useDatePicker";
import { COLORS } from "@/src/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import FieldLabel from "./FieldLabel";

interface DateInputFieldProps {
  setSelectedDate: (date: string) => void;
  selectedDate: string;
  label: string;
  isRequired?: boolean;
  labelSize?: number;
  errorMessage?: string;
  size: number;
  align: "left" | "right" | "center";
  width?: number;
  minDate?: string;
  maxDate?: string;
}

export default function DateInputField({
  setSelectedDate,
  selectedDate,
  label,
  isRequired,
  labelSize,
  errorMessage,
  size,
  align,
  width,
  minDate,
  maxDate,
}: DateInputFieldProps) {
  const { toggleCalendar, setToggleCalendar, onDayPress } =
    useDatePicker(setSelectedDate);

  return (
    <View>
      <FieldLabel
        label={label}
        isRequired={isRequired}
        fontSize={labelSize}
      ></FieldLabel>

      <View style={{ width: width, position: "relative" }}>
        <Pressable
          onPress={() => setToggleCalendar((prev) => !prev)}
          className={`flex-row justify-between border rounded-lg px-3 py-3 ${
            errorMessage ? "border-primary-red" : "border-gray-border"
          }`}
        >
          <Text
            className={`${
              selectedDate ? "text-black" : "text-gray-placeholder"
            } text-base`}
          >
            {selectedDate ? selectedDate : "yyyy-mm-dd"}
          </Text>
          <Ionicons
            name="calendar-clear-outline"
            color={COLORS.GRAY.PLACEHOLDER}
            size={20}
          ></Ionicons>
        </Pressable>

        {toggleCalendar && (
          <DatePicker
            onDayPress={onDayPress}
            size={size}
            align={align}
            selectedDate={selectedDate}
            minDate={minDate}
            maxDate={maxDate}
          ></DatePicker>
        )}

        <View className="mt-1 ml-1">
          <Text className="text-primary-red text-xs">
            {errorMessage ? errorMessage : " "}
          </Text>
        </View>
      </View>
    </View>
  );
}
