import { View } from "react-native";

import Flex from "@/src/components/layout/Flex/Flex";
import TextSize from "@/src/components/ui/TextSize";
import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

import SectionYPosition from "../SectionYPosition";
import WorkDateWeek from "./WorkDateWeek";

export default function WorkDate({
  setSectionYPositions,
}: SetSectionYPositionProps) {
  return (
    <SectionYPosition
      section='workDate'
      content='근무일'
      setSectionYPositions={setSectionYPositions}
    >
      <View className='pt-6' />

      <View className='h-14 bg-[#F0F9FF] rounded-lg flex items-start justify-center pl-3'>
        <TextSize size={14} color='#101828' content='주 5일 근무' />
      </View>

      <View className='pt-3' />
      <Flex dir='row' gap={13}>
        <WorkDateWeek content='월' />
        <WorkDateWeek content='화' />
        <WorkDateWeek content='수' />
        <WorkDateWeek content='목' />
        <WorkDateWeek content='금' />
        <WorkDateWeek content='토' />
        <WorkDateWeek content='일' />
      </Flex>
    </SectionYPosition>
  );
}
