import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

interface CheckboxBoxProps {
  checked: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function CheckboxBox({ checked, size = 'md' }: CheckboxBoxProps) {
  const sizeConfig = {
    sm: { box: 'w-3.5 h-3.5', icon: 10 },
    md: { box: 'w-4 h-4', icon: 12 },
    lg: { box: 'w-5 h-5', icon: 14 },
  };

  const { box, icon } = sizeConfig[size];

  return (
    <View
      className={`${box} rounded border items-center justify-center ${
        checked ? 'bg-primary-blue border-primary-blue' : 'border-gray-300'
      }`}
    >
      {checked && <Ionicons name="checkmark" size={icon} color="white" />}
    </View>
  );
}
