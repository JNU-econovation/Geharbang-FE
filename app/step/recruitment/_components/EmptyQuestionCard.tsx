import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '@/src/utils/constants/colors';

interface EmptyQuestionCardProps {
  onPress: () => void;
}

export default function EmptyQuestionCard({ onPress }: EmptyQuestionCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full h-[183px] rounded-[10px] border-2 flex-col justify-center items-center gap-3 bg-white active:bg-gray-50"
      style={{ borderColor: COLORS.GRAY.BORDER }}
    >
      <View className="opacity-60">
        <Feather name="plus-circle" size={32} color={COLORS.GRAY.TEXT} />
      </View>
      <View className="items-center">
        <Text
          className="text-sm font-medium mb-1"
          style={{ color: COLORS.GRAY.TEXT }}
        >
          첫 번째 질문 추가하기
        </Text>
        <Text className="text-xs" style={{ color: COLORS.GRAY.PLACEHOLDER }}>
          지원자에게 궁금한 점을 물어보세요
        </Text>
      </View>
    </TouchableOpacity>
  );
}
