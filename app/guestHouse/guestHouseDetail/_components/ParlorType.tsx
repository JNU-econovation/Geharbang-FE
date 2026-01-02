import { View } from "react-native";

import Clock from "@/public/svgs/GuestHouse/clock.svg";
import Man from "@/public/svgs/GuestHouse/man.svg";

import GehaImage from "@/app/step/stepDetail/_components/GehaInfo/GehaImage";
import SectionYPosition from "@/app/step/stepDetail/_components/SectionYPosition";
import TextSize from "@/src/components/ui/TextSize";
import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

export default function ParlorType({
  setSectionYPositions,
}: SetSectionYPositionProps) {
  const data = {
    imgs: [
      require("@/public/images/test2.png"),
      require("@/public/images/test2.png"),
    ],
  };

  return (
    <SectionYPosition
      section='type'
      content='객실 타입'
      setSectionYPositions={setSectionYPositions}
    >
      <View className='pt-6' />
      <View className='border border-[#E5E7EB] rounded-lg overflow-hidden'>
        <GehaImage images={data.imgs} height={200} type={true} />

        <View className='p-4 gap-2'>
          <View className='flex-row items-center gap-3'>
            <Man width={12} height={12} />
            <TextSize content='남성전용 도미토리' color='#101828' size={16} />
          </View>
          <View className='flex-row items-center gap-2'>
            <Clock width={14} height={14} />
            <TextSize
              content='입실 15:00 ~ 퇴실 11:00'
              color='#4A5565'
              size={14}
            />
          </View>
          <TextSize content='32,550원' color='#101828' size={18} />
        </View>
      </View>
    </SectionYPosition>
  );
}
