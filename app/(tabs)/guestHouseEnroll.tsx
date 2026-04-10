import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';

import { CloseableConfirmModal } from '@/src/components/ui/Modal/CloseableConfirmModal';
import { useRequireOwner } from '@/src/hooks/common/useRequireOwner';
import { useGuestHouseResumeDraft } from '@/src/hooks/guestHouse/useGuestHouseResumeDraft';

export default function GuestHouseEnrollTab() {
  const { requireOwner, isLoading } = useRequireOwner();
  const { checkAndNavigate, modalProps } = useGuestHouseResumeDraft();

  const requireOwnerRef = useRef(requireOwner);
  requireOwnerRef.current = requireOwner;

  const isFocusedRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      isFocusedRef.current = true;
      requireOwnerRef.current(checkAndNavigate);
      return () => {
        isFocusedRef.current = false;
      };
    }, [checkAndNavigate]),
  );

  useEffect(() => {
    if (!isLoading && isFocusedRef.current) {
      requireOwnerRef.current(checkAndNavigate);
    }
  }, [isLoading, checkAndNavigate]);

  return (
    <>
      <View />
      <CloseableConfirmModal {...modalProps} />
    </>
  );
}
