import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface CollapsibleSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
  showBorder?: boolean;
}

export default function CollapsibleSection({
  title,
  isExpanded,
  onToggle,
  children,
  showBorder = true,
}: CollapsibleSectionProps) {
  return (
    <View className={showBorder ? 'border-b border-gray-100 pb-4' : 'pb-4'}>
      <TouchableOpacity
        onPress={onToggle}
        className="w-full flex-row items-center justify-between py-2"
      >
        <Text
          className="font-medium text-gray-900"
          style={{ fontFamily: 'Noto Sans KR' }}
        >
          {title}
        </Text>
        <Text className="text-gray-500">
          {isExpanded ? '▼' : '▶'}
        </Text>
      </TouchableOpacity>

      {isExpanded && (
        <View className="mt-3">
          {children}
        </View>
      )}
    </View>
  );
}
