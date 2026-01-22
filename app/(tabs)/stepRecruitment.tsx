import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { View } from 'react-native';

import { useRequireLogin } from '@/src/hooks/common/useRequireLogin';

export default function StepRecruitmentTab() {
  const { requireLogin } = useRequireLogin();

  useFocusEffect(
    useCallback(() => {
      // 탭이 포커스될 때마다 로그인 체크 후 스텝 모집 등록 화면으로 이동
      requireLogin(() => {
        router.push('/step/recruitment/step1');
      });
    }, [requireLogin]),
  );

  // 빈 화면 (실제로는 바로 리다이렉트됨)
  return <View />;
}
