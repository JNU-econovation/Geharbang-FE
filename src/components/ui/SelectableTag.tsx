import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface SelectableTagProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

const SelectableTag = React.memo(
  ({ label, selected = false, onPress }: SelectableTagProps) => {
    const bgColor = selected ? 'bg-sky-500' : 'bg-gray-100';
    const textColor = selected ? 'text-white' : 'text-[#364153]';

    return (
      <TouchableOpacity
        onPress={onPress}
        className={`px-4 py-2 rounded-full mr-2 mb-2 ${bgColor}`}
        style={
          selected
            ? {
                shadowColor: 'rgb(0, 0, 0)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }
            : undefined
        }
      >
        <Text className={`text-[13px] font-normal leading-5 ${textColor}`}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
);

SelectableTag.displayName = 'SelectableTag';

export default SelectableTag;
