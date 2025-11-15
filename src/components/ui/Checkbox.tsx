import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface CheckboxProps {
  checked: boolean;
  onToggle?: () => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export default function Checkbox({
  checked,
  onToggle,
  label,
  size = 'md',
  disabled = false,
}: CheckboxProps) {
  const sizeConfig = {
    sm: { box: 'w-3.5 h-3.5', icon: 10 },
    md: { box: 'w-4 h-4', icon: 12 },
    lg: { box: 'w-5 h-5', icon: 14 },
  };

  const { box, icon } = sizeConfig[size];

  const CheckboxBox = (
    <View
      className={`${box} rounded border items-center justify-center ${
        checked ? 'bg-primary-blue border-primary-blue' : 'border-gray-300'
      }`}
    >
      {checked && <Ionicons name="checkmark" size={icon} color="white" />}
    </View>
  );

  if (!label) {
    return CheckboxBox;
  }

  return (
    <TouchableOpacity
      onPress={onToggle}
      disabled={disabled}
      className="flex-row items-center gap-2"
      activeOpacity={0.7}
    >
      {CheckboxBox}
      <Text
        className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-900'}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
