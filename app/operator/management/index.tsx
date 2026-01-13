import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

import CustomSafeAreaView from '@/src/components/layout/CustomSafeAreaView';
import BackArrowHeader from '@/src/components/ui/BackArrowHeader';
import Button from '@/src/components/ui/Button/Button';

type TabType = 'pending' | 'approved' | 'rejected';

interface OperatorCard {
  id: string;
  guestHouseName: string;
  representativeName: string;
  documentType: string;
  submittedAt: string;
  status: TabType;
}

const mockData: OperatorCard[] = [
  {
    id: '1',
    guestHouseName: '바다뷰 게스트하우스',
    representativeName: '김제주',
    documentType: '영업신고증',
    submittedAt: '2024-01-15 14:30',
    status: 'pending',
  },
  {
    id: '2',
    guestHouseName: '제주 힐링 하우스',
    representativeName: '박서귀',
    documentType: '관광숙박업 신고증',
    submittedAt: '2024-01-16 09:15',
    status: 'pending',
  },
  {
    id: '3',
    guestHouseName: '제주 오션뷰',
    representativeName: '이제주',
    documentType: '영업신고증',
    submittedAt: '2024-01-14 11:20',
    status: 'approved',
  },
  {
    id: '4',
    guestHouseName: '한라산 게스트하우스',
    representativeName: '최제주',
    documentType: '관광숙박업 신고증',
    submittedAt: '2024-01-13 16:45',
    status: 'rejected',
  },
];

export default function OperatorManagementScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('pending');

  const handleBackPress = () => {
    router.back();
  };

  const filteredData = mockData.filter((card) => card.status === activeTab);

  const getStatusStyle = (status: TabType) => {
    switch (status) {
      case 'pending':
        return {
          container: 'bg-amber-50 border-[#fde585]',
          text: 'text-[#ba4c00]',
          label: '검토 대기',
        };
      case 'approved':
        return {
          container: 'bg-green-50 border-green-500',
          text: 'text-green-600',
          label: '승인 완료',
        };
      case 'rejected':
        return {
          container: 'bg-red-50 border-red-500',
          text: 'text-red-600',
          label: '거부됨',
        };
    }
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
        {filteredData.map((card) => {
          const statusStyle = getStatusStyle(card.status);
          return (
            <View
              key={card.id}
              className="w-full bg-white rounded-xl border border-gray-200 p-4 flex-col gap-3"
            >
              <View
                className="flex-row justify-between items-start"
                onTouchStart={() => router.push(`/operator/detail/${card.id}`)}
              >
                <View className="flex-col gap-1">
                  <Text className="text-[#101828] text-sm font-normal leading-5">
                    {card.guestHouseName}
                  </Text>
                  <Text className="text-[#6a7282] text-xs font-normal leading-[17.40px]">
                    {card.representativeName}
                  </Text>
                </View>
                <View
                  className={`px-3 py-1 rounded-full border justify-center items-center ${statusStyle.container}`}
                >
                  <Text
                    className={`text-[10.63px] font-normal leading-4 ${statusStyle.text}`}
                  >
                    {statusStyle.label}
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
                    {card.documentType}
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <SvgUri
                    width={14}
                    height={14}
                    uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-e185f3ff-eea4-47cc-8d3e-cacb3be28876.svg"
                  />
                  <Text className="text-[#99a1af] text-[10.63px] font-normal leading-4">
                    {card.submittedAt}
                  </Text>
                </View>
              </View>

              {card.status === 'pending' && (
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
              )}
            </View>
          );
        })}
      </ScrollView>
    </CustomSafeAreaView>
  );
}
