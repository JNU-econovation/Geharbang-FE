import { View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";
import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

import SectionYPosition from "../SectionYPosition";
import IntroImgSlider from "./IntroImgSlider";

interface IntroProps extends SetSectionYPositionProps {
  introduction?: {
    content: string;
    images: string[];
  };
}

export default function Intro({
  setSectionYPositions,
  introduction,
}: IntroProps) {
  return (
    <SectionYPosition
      section='intro'
      content='게스트하우스 소개'
      setSectionYPositions={setSectionYPositions}
    >
      <View className='pt-6' />
      <TextSize size={14} color='#364153' content={introduction?.content} />

      <View className='pt-6' />
      <IntroImgSlider images={introduction?.images} />
    </SectionYPosition>
  );
}
