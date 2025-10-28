import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function QuickServices() {
  return (
    <View className="mb-8">
      <Text className="text-xl font-bold text-gray-900 mb-5">빠른 서비스</Text>
      <View className="flex-row" style={{ gap: 16 }}>
        <TouchableOpacity className="flex-1 active:opacity-90">
          <View className="bg-white border-2 border-emerald-500/30 p-6 rounded-2xl shadow-sm">
            <View className="flex-row items-center" style={{ gap: 16 }}>
              <View className="w-12 h-12 bg-emerald-500/10 rounded-xl items-center justify-center">
                <Ionicons name="briefcase" size={24} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900">
                  숙소 찾기
                </Text>
                <Text className="text-sm text-gray-600">스텝 지원하기</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 active:opacity-90">
          <View className="bg-white border-2 border-emerald-500/30 p-6 rounded-2xl shadow-sm">
            <View className="flex-row items-center" style={{ gap: 16 }}>
              <View className="w-12 h-12 bg-emerald-500/10 rounded-xl items-center justify-center">
                <Ionicons name="briefcase" size={24} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900">
                  일자리 찾기
                </Text>
                <Text className="text-sm text-gray-600">스텝 지원하기</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
