import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import ManagementTabs from '@/app/operator/management/_components/ManagementTabs';
import OperatorCard from '@/app/operator/management/_components/OperatorCard';
import CustomSafeAreaView from '@/src/components/layout/CustomSafeAreaView';
import BackArrowHeader from '@/src/components/ui/BackArrowHeader';
import { useCertificates } from '@/src/hooks/operator/useCertificates';
import { useUpdateCertificateStatus } from '@/src/hooks/operator/useUpdateCertificateStatus';
import {
  OperatorCardData,
  TabType,
  convertCertificateToCardData,
} from '@/src/types/operator';
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

  // API 훅
  const { data: apiData, isLoading, isError } = useCertificates();
  const updateStatusMutation = useUpdateCertificateStatus();

  const handleBackPress = () => {
    router.back();
  };

  const certificatesData = useMemo(() => {
    // API 에러가 발생하거나 데이터가 없으면 목데이터 사용
    if (isError || !apiData || apiData.length === 0) {
      return mockData;
    }
    return apiData.map(convertCertificateToCardData);
  }, [apiData, isError]);

  const filteredData = certificatesData.filter(
    (card) => card.status === activeTab,
  );

  const handleApprove = (id: string) => {
    updateStatusMutation.mutate({ id, approved: true });
  };

  const handleReject = (id: string) => {
    updateStatusMutation.mutate({ id, approved: false });
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
        {isLoading ? (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#0ea5e9" />
            <Text className="text-gray-500 text-sm mt-4">로딩 중...</Text>
          </View>
        ) : filteredData.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-gray-500 text-sm">
              {activeTab === 'pending'
                ? '검토 대기 중인 신청이 없습니다.'
                : activeTab === 'approved'
                ? '승인된 신청이 없습니다.'
                : '거부된 신청이 없습니다.'}
            </Text>
          </View>
        ) : (
          filteredData.map((card) => (
            <OperatorCard
              key={card.id}
              card={card}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        )}
      </ScrollView>
    </CustomSafeAreaView>
  );
}
