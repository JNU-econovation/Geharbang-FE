import { useState } from "react";

import { DateData } from "react-native-calendars";

export function useDatePicker(setSelectedDate: (date: string) => void) {
  const [toggleCalendar, setToggleCalendar] = useState(false);

  const onDayPress = (date: DateData) => {
    setSelectedDate(date.dateString);

    setToggleCalendar(false);
  };

  return { toggleCalendar, setToggleCalendar, onDayPress };
}
