import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '@/src/utils/constants/colors';
type DocumentType = 'business' | 'tourism' | null;

interface DocumentTypeSelectorProps {
  selectedType: DocumentType;
  onSelect: (type: 'business' | 'tourism') => void;
  error?: boolean;
}

export default function DocumentTypeSelector({
  selectedType,
  onSelect,
  error = false,
}: DocumentTypeSelectorProps) {
  return (
    <View className="w-full flex-row justify-start gap-3">
      <TouchableOpacity
        className={`flex-1 py-4 px-2 rounded-[10px] border-2 justify-center items-center ${
          error
            ? 'bg-white border-red-500'
            : selectedType === 'business'
            ? 'bg-sky-50 border-[#00a6f4]'
            : 'bg-white border-gray-200'
        }`}
        onPress={() => onSelect('business')}
      >
        <View className="w-full justify-center items-center gap-2">
          <MaterialCommunityIcons
            name="store-outline"
            size={28}
            color={selectedType === 'business' ? COLORS.PRIMARY.BLUE: '#99a1af'}
          />
          <Text
            className={`text-center text-sm font-normal ${
              selectedType === 'business' ? 'text-[#024a70]' : 'text-[#364153]'
            }`}
          >
            영업신고증
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className={`flex-1 py-4 px-2 rounded-[10px] border-2 justify-center items-center ${
          error
            ? 'bg-white border-red-500'
            : selectedType === 'tourism'
            ? 'bg-sky-50 border-[#00a6f4]'
            : 'bg-white border-gray-200'
        }`}
        onPress={() => onSelect('tourism')}
      >
        <View className="w-full justify-center items-center gap-2">
          <Feather
            name="file-text"
            size={26}
            color={selectedType === 'tourism' ? COLORS.PRIMARY.BLUE: '#99a1af'}
          />
          <Text
            className={`text-center text-sm font-normal ${
              selectedType === 'tourism' ? 'text-[#024a70]' : 'text-[#364153]'
            }`}
          >
            관광숙박업 신고증
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
