import React from "react";
import { View } from "react-native";
import TextSize from "@/src/components/ui/TextSize";

interface FormSectionProps {
  title: string;
  gap?: number;
  children: React.ReactNode;
}

export default function FormSection({
  title,
  gap = 5,
  children,
}: FormSectionProps) {
  return (
    <View
      className="bg-white p-4 w-full rounded-lg"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      }}
    >
      <TextSize size={16} weight="bold" content={title} />
      
      <View className="pt-5" style={{ gap }}>{children}</View>
    </View>
  );
}
