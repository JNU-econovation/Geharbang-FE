import { View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";
import SectionYPosition from "../SectionYPosition";
import AddressMap from "./AddressMap";

interface AddressProps {
  setSectionYPositions: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
}

export default function Address({ setSectionYPositions }: AddressProps) {
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
