import { View } from "react-native";

import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

import SectionYPosition from "../SectionYPosition";
import FeatureDetail from "./FeatureDetail";

interface FeatureProps extends SetSectionYPositionProps {
  feature?: {
    advantages: string[];
    employeeBenefits: string[];
    gender: string;
  };
}

export default function Feature({
  setSectionYPositions,
  feature,
}: FeatureProps) {
  return (
    <SectionYPosition
      section='feature'
      content='스텝 모집 정보'
      setSectionYPositions={setSectionYPositions}
    >
      <View className='pt-6' />
      <FeatureDetail title='성별' featureDetail={feature?.gender} />

      {feature?.advantages.length !== 0 && (
        <View className='pt-6'>
          <FeatureDetail
            title='우대 사항'
            featureDetail={feature?.advantages}
          />
        </View>
      )}

      {feature?.employeeBenefits.length !== 0 && (
        <View className='pt-6'>
          <FeatureDetail
            title='복지'
            featureDetail={feature?.employeeBenefits}
          />
        </View>
      )}
    </SectionYPosition>
  );
}
