import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { View } from "react-native";

import { CloseableConfirmModal } from "@/src/components/ui/Modal/CloseableConfirmModal";
import { useRequireLogin } from "@/src/hooks/common/useRequireLogin";
import { useStepRecruitmentResumeDraft } from "@/src/hooks/stepRecruitment/useStepRecruitmentResumeDraft";

export default function StepRecruitmentTab() {
  const { requireLogin } = useRequireLogin();
  const { checkAndNavigate, modalProps } = useStepRecruitmentResumeDraft();

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
