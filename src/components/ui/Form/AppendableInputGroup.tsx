import React, { useCallback } from "react";
import { ScrollView, View } from "react-native";

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
          error= {!!error}
        />
      ))}

      {canAddMore && (
        <AddInputItemButton
          buttonLabel={buttonLabel}
          onPress={() => addFeatures(scrollViewRef)}
        />
      )}
    </View>
  );
}
