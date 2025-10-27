import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import AdBanner from '../../components/home/AdBanner';
import QuickServices from '../../components/home/QuickServices';

export default function HomeScreen() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 bg-white">
        <Header />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <AdBanner />

          <View className="px-4 py-6 pb-24">
            <QuickServices />

            {/* Features Grid */}
            <View>
              <Text className="text-lg font-semibold text-gray-900 mb-4">
                주요 기능
              </Text>
              <View className="flex-row" style={{ flexWrap: 'wrap', gap: 16 }}>
                <TouchableOpacity
                  className="bg-white border border-gray-200 rounded-xl p-4 items-center active:opacity-70"
                  style={{ width: '47%' }}
                  onPress={() => router.push('/login')}
                >
                  <View className="w-12 h-12 bg-sky-500/10 rounded-full items-center justify-center mb-3">
                    <Ionicons name="map" size={20} color="#0EA5E9" />
                  </View>
                  <Text className="text-sm font-medium text-gray-900 text-center">
                    로그인
                  </Text>
                  <Text className="text-xs text-gray-600 mt-1 text-center">
                    원하는 지역 찾기
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-white border border-gray-200 rounded-xl p-4 items-center active:opacity-70"
                  style={{ width: '47%' }}
                  onPress={() => router.push('/create-crew')}
                >
                  <View className="w-12 h-12 bg-amber-500/10 rounded-full items-center justify-center mb-3">
                    <Ionicons name="star" size={20} color="#F59E0B" />
                  </View>
                  <Text className="text-sm font-medium text-gray-900 text-center">
                    크루만들기
                  </Text>
                  <Text className="text-xs text-gray-600 mt-1 text-center">
                    실제 후기 보기
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-white border border-gray-200 rounded-xl p-4 items-center active:opacity-70"
                  style={{ width: '47%' }}
                >
                  <View className="w-12 h-12 bg-emerald-500/10 rounded-full items-center justify-center mb-3">
                    <Ionicons name="calendar" size={20} color="#10B981" />
                  </View>
                  <Text className="text-sm font-medium text-gray-900 text-center">
                    실시간 예약
                  </Text>
                  <Text className="text-xs text-gray-600 mt-1 text-center">
                    즉시 예약 가능
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-white border border-gray-200 rounded-xl p-4 items-center active:opacity-70"
                  style={{ width: '47%' }}
                >
                  <View className="w-12 h-12 bg-sky-500/10 rounded-full items-center justify-center mb-3">
                    <Ionicons name="people" size={20} color="#0EA5E9" />
                  </View>
                  <Text className="text-sm font-medium text-gray-900 text-center">
                    커뮤니티
                  </Text>
                  <Text className="text-xs text-gray-600 mt-1 text-center">
                    여행자 소통
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
