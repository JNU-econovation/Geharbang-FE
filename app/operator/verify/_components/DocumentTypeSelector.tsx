import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

type DocumentType = 'business' | 'tourism';

interface DocumentTypeSelectorProps {
  selectedType: DocumentType;
  onSelect: (type: DocumentType) => void;
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
          <SvgUri
            width={24}
            height={24}
            uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-8772f5e1-6fb9-40ed-bb6f-924d77d12ec1.svg"
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
          <SvgUri
            width={24}
            height={24}
            uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-610d2f86-5ff4-4b16-b673-e4a497e592ec.svg"
          />
          <Text
            className={`text-center text-sm font-normal ${
              selectedType === 'tourism' ? 'text-[#024a70]' : 'text-[#364153]'
            }`}
          >
            관광사업등록증
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
