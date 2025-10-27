import React from 'react';
import { Text, View } from 'react-native';

export default function ChatScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-medium text-gray-900">
          채팅 페이지입니다
        </Text>
      </View>
    </View>
  );
}
