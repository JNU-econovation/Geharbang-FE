import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ErrorMessageProps {
  message?: string;
  title?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  message = '데이터를 불러오는데 실패했습니다',
  title = '오류 발생',
  onRetry,
}: ErrorMessageProps) {
  return (
    <View className="flex-1 items-center justify-center py-20 px-8">
      <View className="w-16 h-16 bg-red-50 rounded-full items-center justify-center mb-4">
        <Ionicons name="alert-circle" size={32} color="#EF4444" />
      </View>

      <Text className="text-lg font-semibold text-gray-900 mb-2 text-center">
        {title}
      </Text>

      <Text className="text-sm text-gray-600 mb-6 text-center">{message}</Text>

      {onRetry && (
        <TouchableOpacity
          className="bg-primary-blue px-6 py-3 rounded-lg"
          onPress={onRetry}
          activeOpacity={0.7}
        >
          <Text
            className="text-white text-sm font-medium"
            style={{ fontFamily: 'Noto Sans KR' }}
          >
            다시 시도
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
