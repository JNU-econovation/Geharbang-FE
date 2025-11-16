import { View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";
import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

import SectionYPosition from "../SectionYPosition";
import IntroImgSlider from "./IntroImgSlider";

export default function Intro({
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
        content='매일 아침 창문을 열면 펼쳐지는 에메랄드빛 제주 바다와 함께 하루를 시작할 수 있습니다. 애월 해안도로 바로 앞에 위치하여 출퇴근 시간마다 감탄이 절로 나오는 풍경을 만날 수 있어요.'
      />

      <View className='pt-6' />
      <IntroImgSlider />
    </SectionYPosition>
  );
}
