import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import CustomSafeAreaView from '@/src/components/layout/CustomSafeAreaView';
import ResultLayout from '@/src/components/layout/ResultLayout';
import TextSize from '@/src/components/ui/TextSize';

type ResultStatus = 'pending' | 'success' | 'error';

export default function GuestHouseEnrollResult() {
  const { status = 'pending', guestHouseId, error } = useLocalSearchParams<{
    status?: ResultStatus;
    guestHouseId?: string;
    error?: string;
  }>();

  const goHome = () => {
    router.replace('/(tabs)');
  };

  const handleRetry = () => {
    router.replace('/guestHouse/enroll/step1');
  };

  return (
    <CustomSafeAreaView pageColor="bg-white">
      <View className="p-3 items-center">
        <TextSize size={18} content="게스트하우스 등록" />
      </View>

      <View className="h-full px-3 pt-8 bg-[#F9FAFB]">
        {status === 'pending' && (
          <ResultLayout
            status="pending"
            title="등록 중..."
            description="게스트하우스를 등록하고 있습니다"
            primary={{ label: '등록 중...' }}
          />
        )}

        {status === 'success' && (
          <ResultLayout
            status="success"
            title="게하 등록 완료!"
            description="관리자 승인 후 게하 정보가 공개됩니다.\n승인까지 보통 1-3일 소요됩니다."
            primary={{
              label: '홈으로 돌아가기',
              onPress: goHome,
            }}
            tertiary={{
              label: '확인',
              onPress: goHome,
              icon: 'home-outline',
            }}
          />
        )}

        {status === 'error' && (
          <ResultLayout
            status="error"
            title="등록 실패"
            description={
              error ||
              '게하 등록 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.'
            }
            primary={{
              label: '다시 시도',
              onPress: handleRetry,
            }}
            tertiary={{
              label: '홈으로 돌아가기',
              onPress: goHome,
              icon: 'home-outline',
            }}
          />
        )}
      </View>
    </CustomSafeAreaView>
  );
}
