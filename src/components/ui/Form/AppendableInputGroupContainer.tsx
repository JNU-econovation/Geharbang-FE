import React, { useCallback } from "react";
import { Alert, ScrollView } from "react-native";

import { useFeatures } from "@/src/hooks/form/useFeatures";
import { Feature } from "@/src/types/models/stepRecruitment/Feature";
import AppendableInputGroup from "./AppendableInputGroup";

interface AppendableInputGroupContainerProps {
  features: Feature[];
  setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
  maxLimit?: number;
  buttonLabel: string;
  placeholder: string;
  height?: number;
  error?: boolean;
  clearError?: () => void;
  scrollViewRef?: React.RefObject<ScrollView | null>;
}

export default function AppendableInputGroupContainer({
  features,
  setFeatures,
  maxLimit,
  buttonLabel,
  placeholder,
  height,
  error,
  clearError,
  scrollViewRef,
}: AppendableInputGroupContainerProps) {
  const { addFeatures, deleteFeature, updateFeature } = useFeatures({
    features,
    setFeatures,
  });

  const canAddMore = maxLimit == null ? true : features.length < maxLimit;

  const handleTextChange = useCallback(
    (id: string) => (text: string) => {
      updateFeature(id, text);
      clearError?.();
    },
    [updateFeature, clearError]
  );

  const handleDelete = useCallback(
    (id: string) => () => {
      deleteFeature(id);
      clearError?.();
    },
    [deleteFeature, clearError]
  );

  const handleAdd = useCallback(() => {
    if (!canAddMore) {
      Alert.alert("알림", `최대 ${maxLimit}개까지만 등록할 수 있습니다.`);
      return;
    }

    addFeatures();

    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [addFeatures, canAddMore, maxLimit, scrollViewRef]);

  return (
    <AppendableInputGroup
      features={features}
      buttonLabel={buttonLabel}
      placeholder={placeholder}
      height={height}
      error={error}
      handleTextChange={handleTextChange}
      handleDelete={handleDelete}
      handleAdd={handleAdd}
      canAddMore={canAddMore}
    />
  );
}
