import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { COLORS } from '@/src/utils/constants/colors';

interface AddQuestionButtonProps {
  onPress: () => void;
}

export default function AddQuestionButton({ onPress }: AddQuestionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full h-14 rounded-[10px] border-2 flex-row justify-center items-center gap-2 bg-white active:bg-gray-50"
      style={{ borderColor: COLORS.GRAY.BORDER }}
    >
      <Feather name="plus" size={20} color={COLORS.GRAY.TEXT} />
      <Text className="text-sm font-medium" style={{ color: COLORS.GRAY.TEXT }}>
        질문 추가하기
      </Text>
    </TouchableOpacity>
  );
}
