import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { View } from "react-native";

import { CloseableConfirmModal } from "@/src/components/ui/Modal/CloseableConfirmModal";
import { useRequireOwner } from "@/src/hooks/common/useRequireOwner";
import { useStepRecruitmentResumeDraft } from "@/src/hooks/stepRecruitment/useStepRecruitmentResumeDraft";

export default function StepRecruitmentTab() {
  const { requireOwner } = useRequireOwner();
  const { checkAndNavigate, modalProps } = useStepRecruitmentResumeDraft();

  const requireOwnerRef = useRef(requireOwner);
  requireOwnerRef.current = requireOwner;

  useFocusEffect(
    useCallback(() => {
      requireOwnerRef.current(checkAndNavigate);
    }, [checkAndNavigate]),
  );

  return (
    <>
      <View />
      <CloseableConfirmModal {...modalProps} />
    </>
  );
}
