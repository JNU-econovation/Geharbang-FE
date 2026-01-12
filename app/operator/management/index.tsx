import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

import CustomSafeAreaView from '@/src/components/layout/CustomSafeAreaView';
import BackArrowHeader from '@/src/components/ui/BackArrowHeader';
import Button from '@/src/components/ui/Button/Button';

type TabType = 'pending' | 'approved' | 'rejected';

export default function OperatorManagementScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('pending');

  const handleBackPress = () => {
    router.back();
  };

  return (
    <CustomSafeAreaView pageColor="bg-white">
      <View className="p-3">
        <BackArrowHeader content="운영자 인증 관리" onPress={handleBackPress} />
      </View>

      <View className="w-full h-[42px] flex-row bg-white border-b border-gray-200">
        <TouchableOpacity
          className="flex-1 relative justify-center items-center h-full"
          onPress={() => setActiveTab('pending')}
        >
          <Text
            className={`text-center text-xs font-normal leading-[18.70px] ${
              activeTab === 'pending' ? 'text-sky-500' : 'text-[#99a1af]'
            }`}
          >
            검토 대기
          </Text>
          {activeTab === 'pending' && (
            <View className="absolute bottom-0 w-full h-[2px] bg-sky-500" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 justify-center items-center h-full"
          onPress={() => setActiveTab('approved')}
        >
          <Text
            className={`text-center text-xs font-normal leading-[18.70px] ${
              activeTab === 'approved' ? 'text-sky-500' : 'text-[#99a1af]'
            }`}
          >
            승인 완료
          </Text>
          {activeTab === 'approved' && (
            <View className="absolute bottom-0 w-full h-[2px] bg-sky-500" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 justify-center items-center h-full"
          onPress={() => setActiveTab('rejected')}
        >
          <Text
            className={`text-center text-xs font-normal leading-[18.70px] ${
              activeTab === 'rejected' ? 'text-sky-500' : 'text-[#99a1af]'
            }`}
          >
            거부됨
          </Text>
          {activeTab === 'rejected' && (
            <View className="absolute bottom-0 w-full h-[2px] bg-sky-500" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 bg-gray-50"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 40,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full bg-white rounded-xl border border-gray-200 p-4 flex-col gap-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-col gap-1">
              <Text className="text-[#101828] text-sm font-normal leading-5">
                바다뷰 게스트하우스
              </Text>
              <Text className="text-[#6a7282] text-xs font-normal leading-[17.40px]">
                김제주
              </Text>
            </View>
            <View className="px-3 py-1 bg-amber-50 rounded-full border border-[#fde585] justify-center items-center">
              <Text className="text-[#ba4c00] text-[10.63px] font-normal leading-4">
                검토 대기
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-1">
              <SvgUri
                width={14}
                height={14}
                uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-0b6e52c1-89ea-4f7a-ac7e-894c67f5c700.svg"
              />
              <Text className="text-[#99a1af] text-[10.63px] font-normal leading-4">
                영업신고증
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <SvgUri
                width={14}
                height={14}
                uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-e185f3ff-eea4-47cc-8d3e-cacb3be28876.svg"
              />
              <Text className="text-[#99a1af] text-[10.63px] font-normal leading-4">
                2024-01-15 14:30
              </Text>
            </View>
          </View>

          <View className="pt-3 border-t border-[#f2f4f6] flex-row gap-2">
            <View className="flex-1">
              <Button
                variant="white"
                height={35}
                textColor="#364153"
                content="거부"
                onPress={() => {}}
              />
            </View>
            <View className="flex-1">
              <Button
                variant="primary"
                height={35}
                textColor="white"
                content="승인"
                onPress={() => {}}
              />
            </View>
          </View>
        </View>

        <View className="w-full bg-white rounded-xl border border-gray-200 p-4 flex-col gap-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-col gap-1">
              <Text className="text-[#101828] text-sm font-normal leading-5">
                제주 힐링 하우스
              </Text>
              <Text className="text-[#6a7282] text-xs font-normal leading-[17.40px]">
                박서귀
              </Text>
            </View>
            <View className="px-3 py-1 bg-amber-50 rounded-full border border-[#fde585] justify-center items-center">
              <Text className="text-[#ba4c00] text-[10.63px] font-normal leading-4">
                검토 대기
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-1">
              <SvgUri
                width={14}
                height={14}
                uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-3491dbe4-6c74-4ed6-bc81-9e090f31ff4b.svg"
              />
              <Text className="text-[#99a1af] text-[10.63px] font-normal leading-4">
                관광숙박업 신고증
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <SvgUri
                width={14}
                height={14}
                uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-a67975f0-1545-450d-b62d-bb9bf152c88b.svg"
              />
              <Text className="text-[#99a1af] text-[10.63px] font-normal leading-4">
                2024-01-16 09:15
              </Text>
            </View>
          </View>

          <View className="pt-3 border-t border-[#f2f4f6] flex-row gap-2">
            <View className="flex-1">
              <Button
                variant="white"
                height={35}
                textColor="#364153"
                content="거부"
                onPress={() => {}}
              />
            </View>
            <View className="flex-1">
              <Button
                variant="primary"
                height={35}
                textColor="white"
                content="승인"
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
