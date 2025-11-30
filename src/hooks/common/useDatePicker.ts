import { useState } from "react";

export const useDatePicker = (setSelectedDate: (date: string) => void) => {
  const [toggleCalendar, setToggleCalendar] = useState(false);

  const onDayPress = (date: string) => {
    setSelectedDate(date);
    setToggleCalendar(false);
  };

  return { toggleCalendar, setToggleCalendar, onDayPress };
};
