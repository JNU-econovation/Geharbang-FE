import { COLORS } from '@/src/utils/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, View } from 'react-native';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
}

export default function SearchInput({
  value,
  onChangeText,
  placeholder,
  iconName = 'search',
  iconSize = 16,
  iconColor = COLORS.GRAY.PLACEHOLDER,
}: SearchInputProps) {
  return (
    <View className="relative flex-row items-center">
      <TextInput
        className="flex-1 pl-9 pr-4 py-2.5 bg-white rounded-lg border border-gray-border text-[13px] text-gray-text"
        placeholder={placeholder}
        placeholderTextColor={COLORS.GRAY.PLACEHOLDER}
        value={value}
        onChangeText={onChangeText}
        style={{ fontFamily: 'Noto Sans KR' }}
      />
      <Ionicons
        className="absolute left-3"
        name={iconName}
        size={iconSize}
        color={iconColor}
      />
    </View>
  );
}
