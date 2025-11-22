import { View } from "react-native";

import Calendar from "@/public/svgs/StepDetail/calendar.svg";
import Clock from "@/public/svgs/StepDetail/clock.svg";
import WorkBag from "@/public/svgs/StepDetail/workBag.svg";

import TextSize from "@/src/components/ui/TextSize";
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
      >
        <TextSize size={15} color='#101828' content='2024년 3월 1일 ' />
      </WorkInfoDetail>

      <View className='pt-3' />
      <WorkInfoDetail
        icon={<WorkBag width={16} height={16} />}
        workInfoTitle='근무 기간'
      >
        <View className='flex'>
          <TextSize size={15} color='#101828' content='장기 (3개월 이상)' />
        </View>
      </WorkInfoDetail>

      <View className='pt-3' />
      <WorkInfoDetail
        icon={<Clock width={16} height={16} />}
        workInfoTitle='근무 시간 및 업무'
      >
        <TextSize
          size={15}
          color='#101828'
          content='오전 조 :  09:00 ~ 14:00 (5시간)'
        />
        <TextSize
          size={13}
          color='#4A5565'
          content='업무 : 체크인 준비, 침구 정리, 객실 청소 근무일 : 주 1일 휴무 6일'
        />

        <TextSize
          size={15}
          color='#101828'
          content='오후 조 : 09:00 ~ 14:00 (5시간)'
        />
        <TextSize
          size={13}
          color='#4A5565'
          content='업무 : 체크인 준비, 침구 정리, 객실 청소 근무일 : 주 2일  휴무5일 '
        />
      </WorkInfoDetail>
    </SectionYPosition>
  );
}
