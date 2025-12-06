import { COLORS } from "@/src/utils/constants/colors";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, Pressable } from "react-native";

interface AddInputButtonProps {
  buttonLabel: string;
  onPress: () => void;
}

export default function AddInputButton({
  buttonLabel,
  onPress,
}: AddInputButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className='w-full h-14 rounded-[10px] border-2 flex-row justify-center items-center gap-2 bg-white active:bg-gray-50'
      style={{ borderColor: COLORS.GRAY.BORDER }}
    >
      <Feather name='plus' size={20} color={COLORS.GRAY.TEXT} />
      <Text className='text-sm font-medium' style={{ color: COLORS.GRAY.TEXT }}>
        {buttonLabel}
      </Text>
    </Pressable>
  );
}
