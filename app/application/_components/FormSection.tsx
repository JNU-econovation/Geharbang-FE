import React from 'react';
import { View, Text } from 'react-native';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function FormSection({ title, children }: FormSectionProps) {
  return (
    <View className="bg-white p-4 pb-6 mb-4 rounded-lg shadow-sm"> 
      <Text className="text-[16px] font-extrabold mb-6">
        {title}
      </Text>
      
      <View className="gap-2.5"> 
        {children}
      </View>
    </View>
  );
}
