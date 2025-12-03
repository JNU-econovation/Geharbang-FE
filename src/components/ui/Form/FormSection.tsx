import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";
import React from "react";
import { View } from "react-native";

interface FormSectionProps {
  title: string;
  gap?: number;
  children: React.ReactNode;
  description?: string;
}

export default function FormSection({
  title,
  gap = 5,
  children,
  description,
}: FormSectionProps) {
  return (
    <View
      className='bg-white p-4 w-full rounded-lg'
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      }}
    >
      <TextSize size={17} weight='bold' content={title} />
      <View className='pt-2' />
      {description && (
        <TextSize size={14} color={COLORS.GRAY.TEXT} content={description} />
      )}

      <View className='pt-5' style={{ gap }}>
        {children}
      </View>
    </View>
  );
}
