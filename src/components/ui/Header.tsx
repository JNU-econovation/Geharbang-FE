import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Header() {
  return (
    <View className="bg-white px-4 pb-4 pt-2 shadow-sm border-b border-gray-100">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center" style={{ gap: 12 }}>
          <View className="w-12 h-12 bg-sky-500 rounded-full items-center justify-center shadow-lg">
            {/* 여기에 로고 넣기 */}
            <Ionicons name="logo-alipay" size={20} color="white" />
          </View>
          <Text className="text-xl font-bold text-gray-900">게하르방</Text>
        </View>
        <View className="flex-row items-center" style={{ gap: 12 }}>
          <TouchableOpacity className="p-2 active:bg-emerald-500/10 rounded-lg">
            <Ionicons name="settings-outline" size={22} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
