import React, { useCallback } from "react";
import { Alert, ScrollView, View } from "react-native";

import { useFeatures } from "@/src/hooks/form/useFeatures";
import { Feature } from "@/src/types/models/stepRecruitment/Feature";
import AddInputItemButton from "./AddInputButton";
import AppendableInput from "./AppendableInput";

interface AppendableInputGroupProps {
  features: Feature[];
  setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
  maxLimit: number;
  buttonLabel: string;
  placeholder: string;
  height?: number;
  error?: boolean;
  clearError?: () => void;
  scrollViewRef?: React.RefObject<ScrollView | null>;
}

export default function AppendableInputGroup({
  features,
  setFeatures,
  maxLimit,
  buttonLabel,
  placeholder,
  height,
  error,
  clearError,
  scrollViewRef,
}: AppendableInputGroupProps) {
  const { addFeatures, deleteFeature, updateFeature, canAddMore } = useFeatures(
    { features, setFeatures, maxLimit }
  );

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
  }, [addFeatures, canAddMore, clearError, maxLimit, scrollViewRef]);

  return (
    <View className='flex-col gap-4'>
      {features.map((feature) => (
        <AppendableInput
          key={feature.id}
          placeholder={placeholder}
          height={height}
          value={feature.text}
          onChangeText={handleTextChange(feature.id)}
          onDelete={handleDelete(feature.id)}
          error={!!error}
        />
      ))}

      {canAddMore && (
        <AddInputItemButton
          buttonLabel={buttonLabel}
          onPress={() => handleAdd()}
        />
      )}
    </View>
  );
}
