import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface RadioButtonProps {
  selected: boolean;
  onPress?: () => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export default function RadioButton({
  selected,
  onPress,
  label,
  size = 'md',
  disabled = false,
}: RadioButtonProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-[5px]',
    md: 'w-5 h-5 border-[6px]',
    lg: 'w-6 h-6 border-[7px]',
  };

  const RadioCircle = (
    <View
      className={`rounded-full border ${sizeClasses[size]} ${
        selected ? 'border-primary-blue' : 'border-gray-300'
      }`}
    />
  );

  if (!label) {
    return RadioCircle;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className="flex-row items-center gap-2"
      activeOpacity={0.7}
    >
      {RadioCircle}
      <Text
        className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-900'}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
