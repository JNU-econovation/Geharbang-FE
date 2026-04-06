import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";

import { CloseableConfirmModalProps } from "@/src/components/ui/Modal/CloseableConfirmModal";
import { useGuestHouseStore } from "@/src/stores/guestHouse/useGuestHouseStore";

const ENROLL_ROUTE = "/guestHouse/enroll/step1" as const;

export const isGuestHouseFormEmpty = () => {
  const s = useGuestHouseStore.getState();
  return (
    !s.step1Data.guestHouseName &&
    !s.step1Data.workingRegion &&
    !s.step1Data.location &&
    s.step2Data.mainImages.length === 0 &&
    !s.step2Data.introduction &&
    s.step2Data.facilities.length === 0 &&
    s.step2Data.atmosphere.length === 0 &&
    s.step3Data.parties.length === 0 &&
    s.step4Data.rooms.length === 0 &&
    !s.step5Data.instagram &&
    !s.step5Data.phone &&
    !s.step5Data.website &&
    !s.step5Data.ownerMessage
  );
};

export const useGuestHouseResumeDraft = () => {
  const { resetAllData } = useGuestHouseStore();
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  const checkAndNavigate = useCallback(() => {
    if (isVisibleRef.current) return;
    if (isGuestHouseFormEmpty()) {
      router.push(ENROLL_ROUTE);
    } else {
      isVisibleRef.current = true;
      setIsVisible(true);
    }
  }, []);

  const hide = useCallback(() => {
    isVisibleRef.current = false;
    setIsVisible(false);
  }, []);

  const modalProps: CloseableConfirmModalProps = {
    isVisible: isVisible,
    title: "이전에 작성 중인 내용이 있어요.",
    description: "이어서 작성하시겠어요?",
    onClose: hide,
    leftAction: {
      label: "새로쓰기",
      onPress: () => {
        hide();
        resetAllData();
        router.push(ENROLL_ROUTE);
      },
    },
    rightAction: {
      label: "이어쓰기",
      onPress: () => {
        hide();
        router.push(ENROLL_ROUTE);
      },
      variant: "primary",
    },
  };

  return { isVisible, checkAndNavigate, modalProps };
};
