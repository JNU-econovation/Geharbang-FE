import { View } from "react-native";

import Calendar from "@/public/svgs/StepDetail/calendar.svg";
import Clock from "@/public/svgs/StepDetail/clock.svg";
import WorkBag from "@/public/svgs/StepDetail/workBag.svg";

import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

import SectionYPosition from "../SectionYPosition";
import WorkInfoDetail from "./WorkInfoDetail";

export default function WorkInfo({
  setSectionYPositions,
}: SetSectionYPositionProps) {
  return (
    <SectionYPosition
      section='workInfo'
      content='근무 정보'
      setSectionYPositions={setSectionYPositions}
    >
      <View className='pt-6' />

      <WorkInfoDetail
        icon={<Calendar width={16} height={16} />}
        workInfoTitle='근무 시작일'
        workInfoContent='2024년 3월 1일'
      />

      <View className='pt-3' />
      <WorkInfoDetail
        icon={<WorkBag width={16} height={16} />}
        workInfoTitle='근무 기간'
        workInfoContent='3개월 이상'
      />

      <View className='pt-3' />
      <WorkInfoDetail
        icon={<Clock width={16} height={16} />}
        workInfoTitle='근무 시간'
        workInfoContent='오전 9시 ~ 오후 6시 (8시간)'
      />
    </SectionYPosition>
  );
}
