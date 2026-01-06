import { View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";
import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

import SectionYPosition from "@/app/step/stepDetail/_components/SectionYPosition";
import AddressMap from "./AddressMap";

interface AddressProps extends SetSectionYPositionProps {
  location?: {
    address: string;
    coordinates: number[];
  };
}

export default function Address({
  setSectionYPositions,
  location,
}: AddressProps) {
  return (
    <SectionYPosition
      section='address'
      content='위치'
      setSectionYPositions={setSectionYPositions}
    >
      <View className='pt-6' />
      <AddressMap coordinates={location?.coordinates} />

      <View className='pt-4' />
      <TextSize size={14} color='#364153' content={location?.address} />
    </SectionYPosition>
  );
}
