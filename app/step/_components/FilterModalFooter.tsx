import TextSize from '@/src/components/ui/TextSize';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface FilterModalFooterProps {
  onReset: () => void;
  onApply: () => void;
}

const FilterModalFooter = React.memo(
  ({ onReset, onApply }: FilterModalFooterProps) => {
    return (
      <View className="p-4 mb-4 flex-row gap-3">
        <TouchableOpacity
          onPress={onReset}
          className="flex-1 py-3 border border-gray-300 rounded-lg items-center"
        >
          <TextSize size={14} content="초기화" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onApply}
          className="flex-1 py-3 bg-primary-blue rounded-lg items-center"
        >
          <TextSize size={14} content="적용하기" color="white" />
        </TouchableOpacity>
      </View>
    );
  },
);

FilterModalFooter.displayName = 'FilterModalFooter';

export default FilterModalFooter;
