import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";

import { CloseableConfirmModalProps } from "@/src/components/ui/Modal/CloseableConfirmModal";
import { useStepRecruitmentStore } from "@/src/stores/stepRecruitment/useStepRecruitmentStore";

const ENROLL_ROUTE = "/step/recruitment/step1" as const;

export const isStepRecruitmentFormEmpty = () => {
  const s = useStepRecruitmentStore.getState();
  const wtw = s.step2Data.workingTimeAndWork;
  const isWtwEmpty =
    wtw.length === 0 ||
    (wtw.length === 1 &&
      !wtw[0].workingTimeName &&
      !wtw[0].thatTimeWork &&
      !wtw[0].perWorkingDay &&
      !wtw[0].workingCount &&
      !wtw[0].closedCount);

  return (
    !s.step1Data.guestHouseName &&
    !s.step1Data.workingRegion &&
    !s.step1Data.location &&
    !s.step2Data.workingStartDate &&
    s.step2Data.workingPeriod === "" &&
    isWtwEmpty &&
    s.step2Data.gender === "" &&
    !s.step3Data.title &&
    !s.step3Data.introduction &&
    s.step3Data.mainImageFiles.length === 0 &&
    s.step3Data.introImageFiles.length === 0 &&
    s.step3Data.advantages.length === 0 &&
    s.step3Data.employeeBenefits.length === 0 &&
    !s.step4Data.instagram &&
    !s.step4Data.phone &&
    !s.step4Data.email &&
    !s.step4Data.website &&
    !s.step4Data.ownerMessage &&
    s.step5Data.questions.length === 0
  );
};

export const useStepRecruitmentResumeDraft = () => {
  const { resetAllData } = useStepRecruitmentStore();
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  const checkAndNavigate = useCallback(() => {
    if (isVisibleRef.current) return;
    if (isStepRecruitmentFormEmpty()) {
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
