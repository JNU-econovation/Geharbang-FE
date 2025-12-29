import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import AppendableInputGroupContainer from '@/src/components/ui/Form/AppendableInputGroupContainer';
import FormField from '@/src/components/ui/Form/FormField';
import { Feature } from '@/src/types/models/stepRecruitment/Feature';

interface TagProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

const Tag = ({ label, selected = false, onPress }: TagProps) => (
  <Pressable
    onPress={onPress}
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
  </Pressable>
);

const FACILITY_OPTIONS = [
  '세탁시설',
  '개별 화장실',
  '조식제공',
  'CCTV',
  '주차장',
  '공용주방',
  'Wi-Fi',
  '에어컨',
];

const ATMOSPHERE_OPTIONS = [
  '조용한',
  '활기찬',
  '아늑한',
  '모던한',
  '전통적인',
  '자유로운',
];

const FacilitiesForm = () => {
  const [facilities, setFacilities] = useState<Feature[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedAtmospheres, setSelectedAtmospheres] = useState<string[]>([]);

  const toggleFacility = (facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  const toggleAtmosphere = (atmosphere: string) => {
    if (selectedAtmospheres.includes(atmosphere)) {
      setSelectedAtmospheres((prev) => prev.filter((a) => a !== atmosphere));
    } else if (selectedAtmospheres.length < 2) {
      setSelectedAtmospheres((prev) => [...prev, atmosphere]);
    }
  };

  return (
    <View className="gap-6">
      <FormField
        label="제공 편의시설"
        required={true}
        description="최대 10개까지 등록할 수 있습니다
        목록에 없는 시설은 직접 입력해 추가할 수 있습니다"
      >
        <View className="bg-white rounded-xl border border-gray-200 p-4 mb-2">
          <View className="flex-row flex-wrap">
            {FACILITY_OPTIONS.map((facility) => (
              <Tag
                key={facility}
                label={facility}
                selected={selectedFacilities.includes(facility)}
                onPress={() => toggleFacility(facility)}
              />
            ))}
          </View>
        </View>
        <AppendableInputGroupContainer
          features={facilities}
          setFeatures={setFacilities}
          maxLimit={10}
          buttonLabel="편의시설 추가"
          placeholder="예: 공용주방, 세탁시설"
          error={false}
          clearError={() => {}}
        />
      </FormField>

      <FormField
        label="게스트하우스 분위기"
        required={true}
        description="최대 2개까지 선택할 수 있습니다"
      >
        <View className="bg-white rounded-xl border border-gray-200 p-4">
          <View className="flex-row flex-wrap">
            {ATMOSPHERE_OPTIONS.map((atmosphere) => (
              <Tag
                key={atmosphere}
                label={atmosphere}
                selected={selectedAtmospheres.includes(atmosphere)}
                onPress={() => toggleAtmosphere(atmosphere)}
              />
            ))}
          </View>
        </View>
      </FormField>
    </View>
  );
};

export default FacilitiesForm;
