import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import CheckboxBox from './CheckboxBox';

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
  if (!label) {
    return <CheckboxBox checked={checked} size={size} />;
  }

  return (
    <TouchableOpacity
      onPress={onToggle}
      disabled={disabled}
      className="flex-row items-center gap-2"
      activeOpacity={0.7}
    >
      <CheckboxBox checked={checked} size={size} />
      <Text
        className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-900'}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
