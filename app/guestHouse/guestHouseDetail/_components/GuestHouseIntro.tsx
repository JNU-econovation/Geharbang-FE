import { View } from "react-native";

import SectionYPosition from "@/app/step/stepDetail/_components/SectionYPosition";
import TextSize from "@/src/components/ui/TextSize";
import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

export default function GuestHouseIntro({
  setSectionYPositions,
}: SetSectionYPositionProps) {
  return (
    <SectionYPosition
      section='intro'
      content='게스트하우스 소개'
      setSectionYPositions={setSectionYPositions}
    >
      <View className='pt-6' />
      <TextSize
        size={14}
        color='#364153'
        content='제주 바다뷰 게스트하우스는 아름다운 제주 바다가 한눈에 보이는 최고의 위치에 자리하고 있습니다. 
조용하고 깨끗한 환경에서 여행의 피로를 풀고 
편안한 휴식을 취하실 수 있습니다.'
      />
    </SectionYPosition>
  );
}
