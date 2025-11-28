import { getDropdownPositionStyles } from '@/src/utils/common/dropdownPosition';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface DropdownOption<T> {
  key: T;
  label: string;
}

interface DropdownProps<T> {
  visible: boolean;
  options: DropdownOption<T>[];
  selectedKey: T;
  onSelect: (key: T) => void;
  position?: 'left' | 'right' | 'center';
  top?: number;
  right?: number;
  left?: number;
}

export default function Dropdown<T extends string>({
  visible,
  options,
  selectedKey,
  onSelect,
  position = 'right',
  top,
  right,
  left,
}: DropdownProps<T>) {
  if (!visible) return null;

  const positionStyles = getDropdownPositionStyles({
    position,
    top,
    right,
    left,
  });

  return (
    <View
      className="absolute bg-white rounded-lg shadow-lg border border-gray-200"
      style={positionStyles}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={String(option.key)}
          className={`px-4 py-3 ${
            selectedKey === option.key ? 'bg-blue-50' : ''
          }`}
          onPress={() => onSelect(option.key)}
        >
          <Text
            className={`text-sm ${
              selectedKey === option.key
                ? 'text-primary-blue font-semibold'
                : 'text-gray-700'
            }`}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
