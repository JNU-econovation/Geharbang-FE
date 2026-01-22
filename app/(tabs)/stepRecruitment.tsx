import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { View } from 'react-native';

import { useRequireLogin } from '@/src/hooks/common/useRequireLogin';

export default function StepRecruitmentTab() {
  const { requireLogin } = useRequireLogin();

  useFocusEffect(
    useCallback(() => {
      requireLogin(() => {
        router.push('/step/recruitment/step1');
      });
    }, [requireLogin]),
  );

  return <View />;
}
