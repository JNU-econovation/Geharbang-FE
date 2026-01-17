import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import ManagementTabs from '@/app/operator/management/_components/ManagementTabs';
import OperatorCard from '@/app/operator/management/_components/OperatorCard';
import CustomSafeAreaView from '@/src/components/layout/CustomSafeAreaView';
import BackArrowHeader from '@/src/components/ui/BackArrowHeader';
import { useCertificates } from '@/src/hooks/operator/useCertificates';
import { useUpdateCertificateStatus } from '@/src/hooks/operator/useUpdateCertificateStatus';
import { TabType, convertCertificateToCardData } from '@/src/types/operator';

export default function OperatorManagementScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('pending');

  // API 훅
  const { data: apiData, isLoading, isError, error } = useCertificates();
  const updateStatusMutation = useUpdateCertificateStatus();

  useEffect(() => {
    if (isError) {
      console.error('========== 인증서 목록 조회 실패 ==========');
      console.error('에러:', error);
      console.error('에러 메시지:', error?.message);
      console.error('에러 전체 객체:', JSON.stringify(error, null, 2));
      console.error('====================================');
    }
  }, [isError, error]);

  const handleBackPress = () => {
    router.back();
  };

  const certificatesData = useMemo(() => {
    if (!apiData) {
      return [];
    }

    const converted = apiData.map(convertCertificateToCardData);

    return converted;
  }, [apiData]);

  const filteredData = useMemo(() => {
    const filtered = certificatesData.filter(
      (card) => card.status === activeTab,
    );

    return filtered;
  }, [certificatesData, activeTab]);

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
