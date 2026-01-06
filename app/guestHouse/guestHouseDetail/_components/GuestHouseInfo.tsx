import SectionYPosition from "@/app/step/stepDetail/_components/SectionYPosition";
import { View } from "react-native";

import CheckMark from "@/public/svgs/GuestHouse/checkMark.svg";
import Coffee from "@/public/svgs/GuestHouse/coffee.svg";
import Wind from "@/public/svgs/GuestHouse/wind.svg";
import TextSize from "@/src/components/ui/TextSize";
import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";
import { COLORS } from "@/src/utils/constants/colors";

export default function GuestHouseInfo({
  setSectionYPositions,
}: SetSectionYPositionProps) {
  return (
    <SectionYPosition
      section='info'
      content='게스트하우스 정보'
      setSectionYPositions={setSectionYPositions}
    >
      <View className='pt-6' />
      <View
        className={`p-4 border border-[${COLORS.GRAY.BORDER}] rounded-lg gap-2`}
      >
        <View className='flex-row items-center gap-3'>
          <Coffee width={16} height={16} />
          <TextSize size={17} color='#101828' content='제공 편의시설' />
        </View>

        <View className='flex-row items-center gap-3'>
          <CheckMark width={16} height={16} />
          <TextSize size={14} color='#4A5565' content='무료 조식 제공' />
        </View>

        <View className='pt-1' />
        <View className='flex-row items-center gap-3'>
          <Wind width={16} height={16} />
          <TextSize size={17} color='#101828' content='게스트하우스 분위기' />
        </View>

        <View className='flex-row gap-2'>
          <View
            className={`self-start px-3 py-2 rounded-2xl bg-[${COLORS.PRIMARY.BLUE}]/10`}
          >
            <TextSize
              color={`${COLORS.PRIMARY.BLUE}`}
              size={14}
              content='#조용한'
            />
          </View>
          <View
            className={`self-start px-3 py-2 rounded-2xl bg-[${COLORS.PRIMARY.BLUE}]/10`}
          >
            <TextSize
              color={`${COLORS.PRIMARY.BLUE}`}
              size={14}
              content='#조용한'
            />
          </View>
        </View>
      </View>
    </SectionYPosition>
  );
}
