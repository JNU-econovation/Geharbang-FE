import React from 'react';
import { Text, View } from 'react-native';

interface TagProps {
  label: string;
  selected?: boolean;
}

const Tag = ({ label, selected = false }: TagProps) => (
  <View
    className={`px-4 py-2 rounded-full mr-2 mb-2 ${
      selected ? 'bg-sky-500 shadow-sm shadow-black/10' : 'bg-gray-100'
    }`}
  >
    <Text
      className={`text-[13px] font-normal leading-5 ${
        selected ? 'text-white' : 'text-[#364153]'
      }`}
    >
      {label}
    </Text>
  </View>
);

const AtmosphereForm = () => {
  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-row items-center mb-2">
        <Text className="text-[#101727] text-sm font-normal leading-5">
          게스트하우스 분위기
        </Text>
        <Text className="text-[#fb2c36] text-sm font-normal leading-5 ml-1">
          *
        </Text>
      </View>

      <Text className="text-[#697282] text-xs font-normal leading-4 mb-3">
        최대 2개까지 선택할 수 있습니다
      </Text>

      <View className="bg-white rounded-xl border border-gray-200 p-4 mb-2">
        <View className="flex-row flex-wrap">
          <Tag label="#조용한" />
          <Tag label="#사교적" />
          <Tag label="#힐링" />
          <Tag label="#사색" />
          <Tag label="#활발한" />
          <Tag label="#잔잔한" selected />
          <Tag label="#감성" />
          <Tag label="#휴식" />
        </View>
      </View>
    </View>
  );
};

export default AtmosphereForm;
