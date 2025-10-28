import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function AdBanner() {
  return (
    <View className="bg-sky-500 p-6 relative overflow-hidden">
      <View className="relative z-10">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-lg font-bold text-white mb-1">
              제주 특가 숙소
            </Text>
            <Text className="text-sm text-white/80 mb-4">
              최대 30% 할인 혜택
            </Text>
            <TouchableOpacity className="bg-white self-start px-5 py-2.5 rounded-xl shadow-sm active:opacity-80">
              <Text className="text-sky-500 text-sm font-medium">
                지금 보기
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-20 h-20 bg-white rounded-2xl items-center justify-center shadow-sm ml-4">
            <Ionicons name="pricetag" size={24} color="#F59E0B" />
          </View>
        </View>
      </View>
    </View>
  );
}
