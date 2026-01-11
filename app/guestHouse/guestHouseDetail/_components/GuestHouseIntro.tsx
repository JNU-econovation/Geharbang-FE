import { View } from "react-native";

import SectionYPosition from "@/app/step/stepDetail/_components/SectionYPosition";
import TextSize from "@/src/components/ui/TextSize";
import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

interface GuestHouseInfroProps extends SetSectionYPositionProps {
  introduction?: string;
}

export default function GuestHouseIntro({
  setSectionYPositions,
  introduction,
}: GuestHouseInfroProps) {
  return (
    <SectionYPosition
      section='intro'
      content='게스트하우스 소개'
      setSectionYPositions={setSectionYPositions}
    >
      <View className='pt-6' />
      <TextSize size={14} color='#364153' content={`${introduction}`} />
    </SectionYPosition>
  );
}
