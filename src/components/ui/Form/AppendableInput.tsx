import TextInput from "@/src/components/ui/TextInput";
import { COLORS } from "@/src/utils/constants/colors";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";

interface AppendableInputProps {
  value: string;
  placeholder: string;
  height?: number;
  onChangeText: (text: string) => void;
  onDelete: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: boolean;
}

export default function AppendableInput({
  value,
  placeholder,
  height,
  onChangeText,
  onDelete,
  onBlur,
  onFocus,
  error
}: AppendableInputProps) {
  return (
    <View className='flex-row items-start gap-3'>
      <View className='flex-1'>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          multiline={true}
          height={height}
          error={error}
        />
      </View>
      <Pressable
        onPress={onDelete}
        className='w-8 h-8 items-center justify-center mt-2 active:opacity-50'
      >
        <Feather name='x' size={24} color={COLORS.GRAY.PLACEHOLDER} />
      </Pressable>
    </View>
  );
}
