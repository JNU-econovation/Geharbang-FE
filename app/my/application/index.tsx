import { ActivityIndicator, Image, ScrollView, View } from "react-native";

import CalenderIcon from "@/public/svgs/MyPage/calenderIcon.svg";
import CalenderIconGreen from "@/public/svgs/MyPage/calenderIconGreen.svg";
import ContactIcon from "@/public/svgs/MyPage/contactIcon.svg";
import HeartIcon from "@/public/svgs/MyPage/heartIcon.svg";
import InstaIcon from "@/public/svgs/MyPage/instaIcon.svg";
import StarIcon from "@/public/svgs/MyPage/starIcon.svg";
import WorkWeekIcon from "@/public/svgs/MyPage/workWeekIcon.svg";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import Button from "@/src/components/ui/Button/Button";
import TextSize from "@/src/components/ui/TextSize";
import { buildAssetUrl } from "@/src/config/url";
import { useMyApplication } from "@/src/hooks/application/myApplication/useMyApplication";
import { COLORS } from "@/src/utils/constants/colors";
import MyApplicationCompoLayout from "./_components/MyApplicationCompoLayout";

export default function MyApplication() {
  const { data, isLoading, isError, refetch } = useMyApplication();
  const profileImageUri = buildAssetUrl(data?.imageUrl);

  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <View className='px-3 pt-3 pb-4 border-b-[1px] border-[#E5E5E5]'>
        <BackArrorHeader content='내 지원서' />
      </View>

      {isLoading ? (
        <View className='pt-2 h-64'>
          <ActivityIndicator size={80} color={COLORS.PRIMARY.BLUE} />
        </View>
      ) : isError ? (
        <View className='py-8 items-center'>
          <TextSize
            size={18}
            color={COLORS.GRAY.TEXT}
            content='잠시 오류가 발생했어요'
          />
          <View className='pt-4' />
          <Button
            variant='gray'
            height={56}
            width={320}
            content='다시 시도'
            textColor='#000'
            onPress={() => refetch()}
          />
        </View>
      ) : (
        <ScrollView>
          <View className='py-6 flex items-center gap-5'>
            {profileImageUri ? (
              <Image
                source={{
                  uri: profileImageUri,
                }}
                style={{ width: 100, height: 100, borderRadius: 100 }}
                resizeMode='cover'
              />
            ) : (
              <View className='w-[100px] h-[100px] rounded-full bg-[#E5E7EB]' />
            )}
            <TextSize color='#101828' size={20} content={data?.name} />
            <TextSize
              color='#4A5565'
              size={16}
              content={data?.gender === "FEMALE" ? "여성" : "남성"}
            />
          </View>

          <View className='px-4'>
            <View className='pt-5'>
              <TextSize color='#6A7282' size={18} content='기본 정보' />

              <View className='pt-5' />
              <MyApplicationCompoLayout
                icon={<ContactIcon width={18} height={18} />}
                bgColor='#DFF2FE'
                titleContent='연락처'
                chidren={
                  <TextSize
                    color='#101828'
                    size={16}
                    content={data?.phoneNumber}
                  />
                }
              />

              <View className='pt-4' />
              <MyApplicationCompoLayout
                icon={<CalenderIcon width={18} height={18} />}
                bgColor='#DFF2FE'
                titleContent='생년월일'
                chidren={
                  <TextSize
                    color='#101828'
                    size={16}
                    content={data?.birthDate}
                  />
                }
              />
            </View>

            <View className='pt-8'>
              <TextSize color='#6A7282' size={18} content='근무 일정' />

              {data?.availableStartDate && (
                <View className='pt-5'>
                  <MyApplicationCompoLayout
                    icon={<CalenderIconGreen width={18} height={18} />}
                    bgColor='#DCFCE7'
                    titleContent='근무 시작 가능일'
                    chidren={
                      <TextSize
                        color='#101828'
                        size={16}
                        content={data?.availableStartDate}
                      />
                    }
                  />
                </View>
              )}

              <View className='pt-4' />
              {Array.isArray(data?.availableDayOfWeek) &&
                data.availableDayOfWeek.length > 0 && (
                  <MyApplicationCompoLayout
                    icon={<WorkWeekIcon width={18} height={18} />}
                    bgColor='#DCFCE7'
                    titleContent='근무 가능 요일'
                    chidren={data.availableDayOfWeek.map((week, i) => (
                      <View key={i} className='w-7 p-2 rounded-lg bg-[#DFF2FE]'>
                        <TextSize color='#0069A8' size={14} content={week} />
                      </View>
                    ))}
                  />
                )}
            </View>

            <View className='pt-8'>
              <TextSize color='#6A7282' size={18} content='자기소개' />

              <View className='pt-5' />
              <TextSize
                color='#101828'
                size={16}
                content={data?.introduction}
              />
            </View>

            <View className='pt-8'>
              <TextSize color='#6A7282' size={18} content='개인 정보' />

              <View className='pt-5' />
              <MyApplicationCompoLayout
                icon={<StarIcon width={18} height={18} />}
                bgColor='#F3E8FF'
                titleContent='MBTI'
                chidren={
                  <TextSize color='#101828' size={16} content={data?.mbti} />
                }
              />

              <View className='pt-4' />
              {data?.instagramId && (
                <MyApplicationCompoLayout
                  icon={<InstaIcon width={18} height={18} />}
                  bgColor='#FCE7F3'
                  titleContent='Instagram'
                  chidren={
                    <TextSize
                      color='#101828'
                      size={16}
                      content={data?.instagramId}
                    />
                  }
                />
              )}

              <View className='pt-4' />
              {Array.isArray(data?.styles) && data.styles.length > 0 && (
                <MyApplicationCompoLayout
                  icon={<HeartIcon width={18} height={18} />}
                  bgColor='#FEF3C6'
                  titleContent='나의 스타일'
                  chidren={data.styles.map((style, i) => (
                    <View key={i} className='p-2 rounded-lg bg-[#FFFBEB]'>
                      <TextSize color='#BB4D00' size={14} content={style} />
                    </View>
                  ))}
                />
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </CustomSafeAreaView>
  );
}
