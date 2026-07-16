import { Text, View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";
import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

import SectionYPosition from "@/app/step/stepDetail/_components/SectionYPosition";
import AddressMap from "./AddressMap";

interface AddressProps extends SetSectionYPositionProps {
  location?: {
    address?: string;
    lotNumberAddress?: string;
    roadNameAddress?: string;
    coordinates: number[];
  };
  markerType?: 'guesthouse' | 'step';
}

export default function Address({
  setSectionYPositions,
  location,
  markerType,
}: AddressProps) {
  return (
    <SectionYPosition
      section='address'
      content='위치'
      setSectionYPositions={setSectionYPositions}
    >
      <View className='pt-6' />
      <AddressMap coordinates={location?.coordinates} markerType={markerType} />

      <View className='pt-4' />
      {location?.address ? (
        <TextSize size={14} color='#364153' content={location?.address} />
      ) : (
        <Text>
          <TextSize
            size={14}
            color='#364153'
            content={location?.roadNameAddress}
          />
          {"  "}
          <TextSize
            size={14}
            color='#364153'
            content={`(${location?.lotNumberAddress})`}
          />
        </Text>
      )}
    </SectionYPosition>
  );
}
