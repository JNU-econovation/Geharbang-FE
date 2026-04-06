import { useFocusEffect } from 'expo-router';
import { useCallback, useRef } from 'react';
import { View } from 'react-native';

import {CloseableConfirmModal} from '@/src/components/ui/Modal/CloseableConfirmModal';
import { useRequireLogin } from '@/src/hooks/common/useRequireLogin';
import { useGuestHouseResumeDraft } from '@/src/hooks/guestHouse/useGuestHouseResumeDraft';

export default function GuestHouseEnrollTab() {
  const { requireLogin } = useRequireLogin();
  const { checkAndNavigate, modalProps } = useGuestHouseResumeDraft();

  const requireLoginRef = useRef(requireLogin);
  requireLoginRef.current = requireLogin;

  useFocusEffect(
    useCallback(() => {
      requireLoginRef.current(checkAndNavigate);
    }, [checkAndNavigate]),
  );

  return (
    <>
      <View />
      <CloseableConfirmModal {...modalProps} />
    </>
  );
}
