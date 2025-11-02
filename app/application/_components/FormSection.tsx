import React from 'react';
import { View, Text } from 'react-native';

interface FormSectionProps {
  title: string;
  gap?: number;
  children: React.ReactNode;
}

export default function FormSection({ title, gap=5, children }: FormSectionProps) {
  return (
    <View className="bg-white p-4 mb-4 rounded-lg shadow-sm "> 
      <Text className="text-[16px] font-extrabold mb-6">
        {title}
      </Text>
      
      <View style={{gap}}> 
        {children}
      </View>
    </View>
  );
}
