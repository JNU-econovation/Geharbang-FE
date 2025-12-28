import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import CustomSafeAreaView from '@/src/components/layout/CustomSafeAreaView';
import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import TextSize from '@/src/components/ui/TextSize';

type ResultStatus = 'pending' | 'success' | 'error';

export default function GuestHouseEnrollResult() {
  const params = useLocalSearchParams<{ status?: ResultStatus }>();
  const [status, setStatus] = useState<ResultStatus>(
    (params.status as ResultStatus) || 'pending'
  );

  const handleGoHome = () => {
    router.replace('/(tabs)');
  };

  const handleRetry = () => {
    router.replace('/guestHouse/enroll/step1');
  };

  if (status === 'pending') {
    return (
      <CustomSafeAreaView pageColor="bg-white">
        <Flex items="center" justify="center" className="flex-1">
          <ActivityIndicator size="large" color="#000" />
          <View className="pt-4" />
          <TextSize size={18} content="게하 등록 중입니다..." />
        </Flex>
      </CustomSafeAreaView>
    );
  }

  if (status === 'error') {
    return (
      <CustomSafeAreaView pageColor="bg-white">
        <Flex items="center" justify="center" className="flex-1 px-4">
          <TextSize size={24} content="❌" />
          <View className="pt-4" />
          <TextSize size={18} content="게하 등록에 실패했습니다" />
          <View className="pt-2" />
          <TextSize
            size={14}
            content="다시 시도해주세요"
            color="#6B7280"
          />
          <View className="pt-8" />
          <Flex items="center" gap={8}>
            <Button
              variant="primary"
              width={320}
              height={50}
              textColor="white"
              content="다시 시도"
              onPress={handleRetry}
            />
            <Button
              variant="gray"
              width={320}
              height={50}
              textColor="#000"
              content="홈으로"
              onPress={handleGoHome}
            />
          </Flex>
        </Flex>
      </CustomSafeAreaView>
    );
  }

  return (
    <CustomSafeAreaView pageColor="bg-white">
      <Flex items="center" justify="center" className="flex-1 px-4">
        <TextSize size={24} content="✅" />
        <View className="pt-4" />
        <TextSize size={18} content="게하 등록이 완료되었습니다" />
        <View className="pt-2" />
        <TextSize
          size={14}
          content="관리자 승인 후 게하 정보가 공개됩니다"
          color="#6B7280"
        />
        <View className="pt-8" />
        <Button
          variant="primary"
          width={320}
          height={50}
          textColor="white"
          content="확인"
          onPress={handleGoHome}
        />
      </Flex>
    </CustomSafeAreaView>
  );
}
