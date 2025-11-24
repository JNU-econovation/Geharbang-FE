import { View } from "react-native";

import Dot from "@/public/svgs/StepDetail/dot.svg";

import Flex from "@/src/components/layout/Flex/Flex";
import TextSize from "@/src/components/ui/TextSize";
import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

import SectionYPosition from "../SectionYPosition";

export default function Feature({
  setSectionYPositions,
}: SetSectionYPositionProps) {
  return (
    <SectionYPosition
      section='feature'
      content='스텝 모집 정보'
      setSectionYPositions={setSectionYPositions}
    >
      <View className='pt-6' />
      <TextSize color='#101828' size={14} content='성별' />
      <View className='pt-2' />

      <Flex items='center' justify='start' dir='row'>
        <Dot width={12} height={12} />
        <TextSize
          color='#101828'
          size={14}
          content='게스트 체크인/체크아웃 및 예약 관리'
        />
      </Flex>
    </SectionYPosition>
  );
}
