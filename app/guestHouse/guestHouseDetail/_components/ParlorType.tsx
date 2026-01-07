import { View } from "react-native";

import Clock from "@/public/svgs/GuestHouse/clock.svg";
import Girl from "@/public/svgs/GuestHouse/girl.svg";
import Man from "@/public/svgs/GuestHouse/man.svg";

import GehaImage from "@/app/step/stepDetail/_components/GehaInfo/GehaImage";
import SectionYPosition from "@/app/step/stepDetail/_components/SectionYPosition";
import TextSize from "@/src/components/ui/TextSize";
import { RoomsInfo } from "@/src/types/guestHouseDetail/GuestHouseDetailResponse";
import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

interface ParlorTypeProps extends SetSectionYPositionProps {
  parlorType?: RoomsInfo[];
}

export default function ParlorType({
  setSectionYPositions,
  parlorType,
}: ParlorTypeProps) {
  return (
    <SectionYPosition
      section='type'
      content='객실 타입'
      setSectionYPositions={setSectionYPositions}
    >
      <View className='pt-6' />
      {parlorType?.map((room, i) => (
        <View
          key={i}
          className='border border-[#E5E7EB] rounded-lg overflow-hidden mb-3'
        >
          <GehaImage
            images={room.imageUrls}
            height={200}
            type={true}
            page={true}
            headCountType={room.headCountType}
          />

          <View className='p-4 gap-2'>
            <View className='flex-row items-center gap-3'>
              {room.type === "남성전용" ? (
                <Man width={12} height={12} />
              ) : (
                <Girl width={12} height={12} />
              )}
              <TextSize
                content={`${room.type} ${room.name}`}
                color='#101828'
                size={16}
              />
            </View>
            <View className='flex-row items-center gap-2'>
              <Clock width={14} height={14} />
              <TextSize
                content={`입실 ${room.checkInTime.slice(
                  0,
                  5
                )} ~ 퇴실 ${room.checkOutTime.slice(0, 5)}`}
                color='#4A5565'
                size={14}
              />
            </View>
            <TextSize
              content={`${room.pricePerNight}원`}
              color='#101828'
              size={18}
            />
          </View>
        </View>
      ))}
    </SectionYPosition>
  );
}
