import { View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";
import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

import SectionYPosition from "../SectionYPosition";
import AddressMap from "./AddressMap";

export default function Address({
  setSectionYPositions,
}: SetSectionYPositionProps) {
  return (
    <SectionYPosition
      section='address'
      content='위치'
      setSectionYPositions={setSectionYPositions}
    >
      <View className='pt-6' />
      <AddressMap />

      <View className='pt-4' />
      <TextSize
        size={14}
        color='#364153'
        content='제주특별자치도 제주시 애월읍 하귀2리 123-45'
      />
    </SectionYPosition>
  );
}
