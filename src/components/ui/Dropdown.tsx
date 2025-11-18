import React from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';

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

  const positionStyles: ViewStyle = {
    top: top ?? '150%',
    marginTop: 4,
    zIndex: 1000,
    elevation: 5,
    minWidth: 100,
  };

  if (position === 'right' && right !== undefined) {
    positionStyles.right = right;
  } else if (position === 'left' && left !== undefined) {
    positionStyles.left = left;
  } else if (position === 'center') {
    positionStyles.left = '50%';
    positionStyles.transform = [{ translateX: -50 }];
  }

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
