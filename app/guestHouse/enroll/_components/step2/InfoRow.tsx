import React from 'react';
import { Text, View } from 'react-native';

interface InfoRowProps {
  icon: React.ReactNode;
  label?: string;
  value?: string;
  text?: string;
  valueColor?: string;
}

const InfoRow = ({
  icon,
  label,
  value,
  text,
  valueColor = 'text-[#101828]',
}: InfoRowProps) => (
  <View className="flex-row items-center gap-2">
    {icon}
    {text ? (
      <Text className="text-[#101828] text-xs">{text}</Text>
    ) : (
      <View className="flex-row gap-1">
        <Text className="text-[#4a5565] text-xs">{label}</Text>
        <Text className={`${valueColor} text-xs font-medium`}>{value}</Text>
      </View>
    )}
  </View>
);

export default InfoRow;
