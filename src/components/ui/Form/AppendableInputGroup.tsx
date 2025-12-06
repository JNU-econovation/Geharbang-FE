import React from "react";
import { View } from "react-native";

import { Feature } from "@/src/types/models/stepRecruitment/Feature";
import AddInputItemButton from "./AddInputButton";
import AppendableInput from "./AppendableInput";

interface AppendableInputGroupProps {
  features: Feature[];
  buttonLabel: string;
  placeholder: string;
  height?: number;
  error?: boolean;
  handleTextChange: (id: string) => (text: string) => void;
  handleDelete: (id: string) => () => void;
  handleAdd: () => void;
  canAddMore?: boolean; 
}

export default function AppendableInputGroup({
  features,
  buttonLabel,
  placeholder,
  height,
  error,
  handleTextChange,
  handleDelete,
  handleAdd,
  canAddMore,
}: AppendableInputGroupProps) {
  
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
          onPress={handleAdd}
        />
      )}
    </View>
  );
}