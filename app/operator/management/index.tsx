import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import ManagementTabs from '@/app/operator/management/_components/ManagementTabs';
import OperatorCard from '@/app/operator/management/_components/OperatorCard';
import CustomSafeAreaView from '@/src/components/layout/CustomSafeAreaView';
import BackArrowHeader from '@/src/components/ui/BackArrowHeader';
import { OperatorCardData, TabType } from '@/src/types/operator';
// 연동후 없앨게용
const mockData: OperatorCardData[] = [
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

  const handleApprove = (id: string) => {
    // TODO: API 호출 - 승인 처리
    console.log('Approve:', id);
  };

  const handleReject = (id: string) => {
    // TODO: API 호출 - 거부 처리
    console.log('Reject:', id);
  };

  return (
    <CustomSafeAreaView pageColor="bg-white">
      <View className="p-3">
        <BackArrowHeader content="운영자 인증 관리" onPress={handleBackPress} />
      </View>

      <ManagementTabs activeTab={activeTab} onTabChange={setActiveTab} />

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
        {filteredData.map((card) => (
          <OperatorCard
            key={card.id}
            card={card}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </ScrollView>
    </CustomSafeAreaView>
  );
}
