import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import TextInput from '@/src/components/ui/TextInput';
import { COLORS } from '@/src/utils/constants/colors';

interface QuestionItemProps {
  index: number;
  value: string;
  onChangeText: (text: string) => void;
  onDelete: () => void;
}

export default function QuestionItem({
  index,
  value,
  onChangeText,
  onDelete,
}: QuestionItemProps) {
  return (
    <View className="flex-row items-start gap-3">
      <View className="flex-1">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={`질문 ${index + 1}을(를) 입력해주세요`}
          multiline={true}
          height={86}
        />
      </View>
      <TouchableOpacity
        onPress={onDelete}
        className="w-8 h-8 items-center justify-center mt-2 active:opacity-50"
      >
        <Feather name="x" size={24} color={COLORS.GRAY.PLACEHOLDER} />
      </TouchableOpacity>
    </View>
  );
}
