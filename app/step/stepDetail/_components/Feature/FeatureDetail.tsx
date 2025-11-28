import { View } from "react-native";

import Dot from "@/public/svgs/StepDetail/dot.svg";

import Flex from "@/src/components/layout/Flex/Flex";
import TextSize from "@/src/components/ui/TextSize";

interface FeatureDetailProps {
  title: string;
  featureDetail?: string | string[];
}

export default function FeatureDetail({
  title,
  featureDetail,
}: FeatureDetailProps) {
  const featureDetails = Array.isArray(featureDetail)
    ? featureDetail
    : [featureDetail];

  return (
    <>
      <TextSize color='#101828' size={16} content={title} />
      <View className='pt-2' />

      {featureDetails?.map((featureDetail, index) => (
        <Flex items='center' justify='start' dir='row' key={index}>
          <Dot width={12} height={12} />
          <TextSize color='#101828' size={15} content={`${featureDetail}`} />
          <View className='pt-1' />
        </Flex>
      ))}
    </>
  );
}
