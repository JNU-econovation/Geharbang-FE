import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateCrewScreen() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center justify-between px-4 py-3">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">지원서 생성하기</Text>
          <View className="w-8" />
        </View>

        <View className="flex-1 items-center justify-center">
          <Text className="text-lg font-medium text-gray-900">
            지원서 생성하기 페이지입니다
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}
