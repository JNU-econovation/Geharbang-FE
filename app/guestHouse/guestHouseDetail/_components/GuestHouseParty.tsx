import { View } from "react-native";

import Clock from "@/public/svgs/GuestHouse/clock.svg";
import Dot from "@/public/svgs/GuestHouse/dot.svg";
import Location from "@/public/svgs/GuestHouse/location.svg";
import OutSider from "@/public/svgs/GuestHouse/outsider.svg";
import WideParty from "@/public/svgs/GuestHouse/wideparty.svg";

import GehaImage from "@/app/step/stepDetail/_components/GehaInfo/GehaImage";
import SectionYPosition from "@/app/step/stepDetail/_components/SectionYPosition";
import TextSize from "@/src/components/ui/TextSize";
import { PartiesInfo } from "@/src/types/guestHouseDetail/GuestHouseDetailResponse";
import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

interface GuestHousePartyProps extends SetSectionYPositionProps {
  parties?: PartiesInfo[];
}

export default function GuestHouseParty({
  setSectionYPositions,
  parties,
}: GuestHousePartyProps) {
  return (
    <SectionYPosition
      section='party'
      content='파티'
      setSectionYPositions={setSectionYPositions}
    >
      <View className='pt-6' />
      {parties &&
        parties.map((party, i) => (
          <View key={i} className='border border-[#E5E7EB] rounded-lg'>
            <GehaImage
              images={party.imageUrls}
              height={200}
              party={true}
              page={true}
            />

            <View className='p-4 gap-3'>
              <TextSize color='#101828' size={17} content={party.type} />

              <View className='bg-[#F9FAFB] rounded-lg p-3'>
                <TextSize
                  color='#4A5565'
                  size={14}
                  content='각자 음식을 준비해 와서 나누어 먹는 파티입니다 
술게임과 담소를 나누며 다양한 게스트들과 
친해질 수 있는 좋은 기회입니다. 
라이브 공연이 있는 날도 있습니다.'
                />
              </View>

              <View className='flex-row items-center gap-3'>
                <Clock width={14} height={14} />
                <TextSize
                  content={`${party.startTime.slice(
                    0,
                    5
                  )} ~ ${party.endTime.slice(0, 5)}`}
                  color='#101828'
                  size={14}
                />
              </View>
              <View className='flex-row items-center gap-3.5'>
                <Dot width={12} height={12} />
                <TextSize
                  content={`진행 요일: ${party.weeklyDays.join(", ")}`}
                  color='#101828'
                  size={14}
                />
              </View>
              <View className='flex-row items-center gap-3'>
                <Location width={14} height={14} />
                <TextSize
                  content={`파티 장소: ${party.place}`}
                  color='#101828'
                  size={14}
                />
              </View>
              <View className='flex-row items-center gap-3'>
                <WideParty width={14} height={14} color='#99A1AF' />
                <TextSize
                  content={`파티 분위기: ${party.moods.join(" , ")}`}
                  color='#101828'
                  size={14}
                />
              </View>
              <View className='flex-row items-center gap-3'>
                <OutSider width={14} height={14} />
                <TextSize content='외부인 참여:' color='#101828' size={14} />
                <View className='-m-2' />
                {party.isExternalGuestAllowed ? (
                  <TextSize content='가능' color='#10B981' size={14} />
                ) : (
                  <TextSize content='불가능' color='#EF4444' size={14} />
                )}
              </View>

              <View className='border border-[#F9FAFB]' />

              <View className='flex-row items-center gap-2'>
                <TextSize color='#101828' size={14} content='파티비:' />
                <TextSize
                  color='#0EA5E9'
                  size={14}
                  content={`숙박객 ${party.guestFee}원 ${
                    party.isExternalGuestAllowed
                      ? `외부인 ${party.externalGuestFee}원`
                      : ""
                  }`}
                />
              </View>
            </View>
          </View>
        ))}
    </SectionYPosition>
  );
}
