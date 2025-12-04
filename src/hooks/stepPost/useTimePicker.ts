import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform } from "react-native";

export const useTimePicker = (
  initialDate: Date,
  onChangeCallback?: (date: Date) => void
) => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(initialDate);

  const openPicker = () => setOpen(true);
  const closePicker = () => setOpen(false);

  const onTimeChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === "android") {
      closePicker();
      if (selected) {
        setTime(selected);
        onChangeCallback?.(selected);
      }
    } else {
      if (selected) {
        setTime(selected);
        onChangeCallback?.(selected);
      }
    }
  };

  return {
    open,
    time,
    openPicker,
    closePicker,
    onTimeChange,
  };
};
