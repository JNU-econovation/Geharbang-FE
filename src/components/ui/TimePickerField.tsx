import DateTimePicker from "@react-native-community/datetimepicker";
import { Modal, Platform, Pressable, View } from "react-native";

import { useTimePicker } from "@/src/hooks/stepPost/useTimePicker";
import { formatToAMPM } from "@/src/utils/stepPost/time";
import TextSize from "./TextSize";

interface TimePickerFieldProps {
  value: Date;
  onChange: (date: Date) => void;
  width?: number;
  placeholder?: string;
}

export default function TimePickerField({
  value,
  onChange,
  width,
}: TimePickerFieldProps) {
  const { open, time, openPicker, closePicker, onTimeChange } = useTimePicker(
    value,
    onChange
  );

  return (
    <>
      <Pressable onPress={openPicker}>
        <View
          className='h-12 rounded-lg border border-gray-border px-3 justify-center bg-white'
          style={{ width }}
        >
          <TextSize size={16} color='#364153' content={formatToAMPM(time)} />
        </View>
      </Pressable>

      <Modal visible={open} transparent animationType='fade'>
        <View className='flex-1 bg-black/40 justify-center px-6'>
          <View className='bg-white rounded-xl py-5 px-3'>
            <DateTimePicker
              mode='time'
              display={Platform.OS === "ios" ? "spinner" : "clock"}
              value={time}
              onChange={onTimeChange}
              is24Hour={false}
            />

            {Platform.OS === "ios" && (
              <Pressable className='py-3 items-center' onPress={closePicker}>
                <TextSize size={16} content='완료' color='#007AFF' />
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
