import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { View } from 'react-native';

import { useRequireLogin } from '@/src/hooks/common/useRequireLogin';

export default function GuestHouseEnrollTab() {
  const { requireLogin } = useRequireLogin();

  useFocusEffect(
    useCallback(() => {
      requireLogin(() => {
        router.push('/guestHouse/enroll');
      });
    }, [requireLogin]),
  );

  return <View />;
}
