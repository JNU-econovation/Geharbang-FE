import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  View,
} from "react-native";

import ApplicationIcon from "@/public/svgs/MyPage/applicationIcon.svg";
import ApplicationStatusIcon from "@/public/svgs/MyPage/applicationStatusIcon.svg";
import ArrowRoute from "@/public/svgs/MyPage/arrowRoute.svg";
import CheckIcon from "@/public/svgs/MyPage/checkIcon.svg";
import DangerIcon from "@/public/svgs/MyPage/dangerIcon.svg";
import LogOut from "@/public/svgs/MyPage/logOutIcon.svg";
import MyGuestHouseIcon from "@/public/svgs/MyPage/myGuestHouseIcon.svg";
import MyPageIcon from "@/public/svgs/MyPage/myPageIcon.svg";
import PresidentIcon from "@/public/svgs/MyPage/presidentIcon.svg";
import RecruitmentIcon from "@/public/svgs/MyPage/recruitmentIcon.svg";
import { Ionicons } from "@expo/vector-icons";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import Button from "@/src/components/ui/Button/Button";
import TextSize from "@/src/components/ui/TextSize";
import { buildAssetUrl } from "@/src/config/url";
import { useMyApplicationExist } from "@/src/hooks/application/myApplication/useMyApplicationExist";
import { useMyInfomation } from "@/src/hooks/application/myApplication/useMyInfomation";
import { useLogout } from "@/src/hooks/login/useLogout";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import { COLORS } from "@/src/utils/constants/colors";
import MyActivity from "../my/application/_components/MyActivity";

export default function ProfileScreen() {
  const handleLogout = useLogout();

  const isLogined = useAuthStore((state) => state.accessToken);

  const { data: isExist } = useMyApplicationExist();

  const myApplicationExist = isExist?.isExist ?? false;

  const { data, isLoading, isError, refetch } =
    useMyInfomation(myApplicationExist);
  const profileImageUri = buildAssetUrl(data?.imageUrl);

  return (
    <CustomSafeAreaView pageColor='bg-white' topOnly={true}>
      <View className='px-3 pt-3 pb-4 border-b-[1px] border-[#E5E5E5]'>
        <BackArrorHeader content='내 정보' />
      </View>

      {isLogined ? (
        isLoading ? (
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
          <ScrollView className='px-4'>
            <View className='px-6 py-4 mt-6 bg-[#E0F2FE] rounded-lg '>
              <View className='flex-row items-center gap-5'>
                {myApplicationExist ? (
                  <View className='flex-row items-center gap-5'>
                    {profileImageUri ? (
                      <Image
                        source={{
                          uri: profileImageUri,
                        }}
                        style={{ width: 80, height: 80, borderRadius: 100 }}
                        resizeMode='cover'
                      />
                    ) : (
                      <View className='w-20 h-20 bg-white rounded-full flex items-center justify-center'>
                        <MyPageIcon width={30} height={30} />
                      </View>
                    )}
                    <TextSize color='#101828' size={16} content={data?.name} />
                  </View>
                ) : (
                  <View className='flex-row items-center gap-5'>
                    <View className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
                      <MyPageIcon width={22} height={22} />
                    </View>
                    <View className='flex-col gap-1'>
                      <TextSize color='#101828' size={16} content='게하르방' />
                      <TextSize
                        color='#4A5565'
                        size={14}
                        content='지원서 작성 후, 프로필이 등록됩니다.'
                      />
                    </View>
                  </View>
                )}
                {data?.isOwner && (
                  <View className='-ml-2 px-2 py-1 bg-[#0EA5E9] rounded-xl'>
                    <TextSize color='#FFFFFF' size={12} content='인증 사장님' />
                  </View>
                )}
              </View>
              {myApplicationExist && (
                <Pressable onPress={() => router.push("/my/application")}>
                  <View className='mt-4 py-3 rounded-lg bg-white flex items-center'>
                    <TextSize
                      color='#101828'
                      size={16}
                      content='내 지원서 보기'
                    />
                  </View>
                </Pressable>
              )}
            </View>

            <View className='pt-8'>
              <TextSize color='#6A7282' size={18} content='내 활동' />
              <Pressable onPress={() => router.push("/application/create")}>
                <MyActivity
                  content='지원서 작성'
                  icon={<ApplicationIcon width={18} height={18} />}
                />
              </Pressable>

              <Pressable onPress={() => router.push("/my/application/status")}>
                <MyActivity
                  content='지원 내역'
                  icon={<ApplicationStatusIcon width={18} height={18} />}
                />
              </Pressable>

              <Pressable onPress={() => router.push("/my/wish/step")}>
                <MyActivity
                  content='찜한 스텝 공고'
                  icon={
                    <Ionicons name='heart-outline' size={18} color='#0EA5E9' />
                  }
                />
              </Pressable>

              <Pressable onPress={() => router.push("/my/wish/guestHouse")}>
                <MyActivity
                  content='찜한 게스트하우스'
                  icon={
                    <Ionicons name='home-outline' size={18} color='#0EA5E9' />
                  }
                />
              </Pressable>
            </View>

            <View className='pt-8'>
              <TextSize color='#6A7282' size={18} content='운영자 기능' />

              {data?.isOwner ? (
                <View>
                  <Pressable onPress={() => router.push("/my/guestHouse")}>
                    <MyActivity
                      content='내 게스트하우스 관리'
                      icon={<MyGuestHouseIcon width={18} height={18} />}
                    />
                  </Pressable>
                  <Pressable onPress={() => router.push("/my/stepRecruitment")}>
                    <MyActivity
                      content='내 구인 공고 관리'
                      icon={<RecruitmentIcon width={18} height={18} />}
                    />
                  </Pressable>
                </View>
              ) : (
                <Pressable onPress={() => router.push("/operator/verify")}>
                  <View className='mt-5 px-6 py-4 bg-[#F9FAFB] rounded-lg flex-row items-center'>
                    <View className='p-2 rounded-full bg-white'>
                      <PresidentIcon width={18} height={18} />
                    </View>
                    <View className='flex-1 ml-3'>
                      <TextSize
                        color='#101828'
                        size={16}
                        content='운영자이신가요?'
                      />
                      <View className='pt-2' />
                      <TextSize
                        color='#4A5565'
                        size={14}
                        content={`인증 후 게스트하우스를 \n등록하고 관리할 수 있어요`}
                      />
                    </View>
                    <ArrowRoute width={22} height={22} />
                  </View>
                </Pressable>
              )}
            </View>

            <View className='pt-8'>
              <TextSize color='#6A7282' size={18} content='설정' />
              {data?.isAdmin && (
                <Pressable onPress={() => router.push("/operator/management")}>
                  <MyActivity
                    content='관리자 기능'
                    icon={<DangerIcon width={18} height={18} />}
                  />
                </Pressable>
              )}
              <Pressable
                onPress={handleLogout}
                className='pt-10 flex-row gap-3'
              >
                <LogOut width={22} height={22} />
                <TextSize color='#E7000B' size={16} content='로그아웃' />
              </Pressable>
            </View>
          </ScrollView>
        )
      ) : (
        <ScrollView className='px-4'>
          <View className='px-6 py-4 mt-6 bg-[#E0F2FE] rounded-lg border border-[#0EA5E9]'>
            <View className='flex-row items-center gap-5'>
              <View className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
                <MyPageIcon width={22} height={22} />
              </View>
              <View className='flex-col gap-1'>
                <TextSize
                  color='#101828'
                  size={16}
                  content='로그인이 필요해요'
                />
                <TextSize
                  color='#4A5565'
                  size={14}
                  content={`회원님만의 특별한 기능을 \n이용해보세요!`}
                />
              </View>
            </View>
            <Pressable onPress={() => router.push("/login")}>
              <View className='mt-6 py-3 rounded-lg bg-[#0EA5E9] flex items-center'>
                <TextSize
                  color='#FFFFFF'
                  size={16}
                  content='로그인 / 회원가입'
                />
              </View>
            </Pressable>
          </View>

          <View className='mt-6'>
            <TextSize
              color='#6A7282'
              size={18}
              content='로그인하면 이런 게 좋아요'
            />

            <View className='px-6 py-4 mt-4 bg-[#F9FAFB] rounded-lg flex-row gap-2'>
              <CheckIcon width={22} height={22} />
              <View className='flex-col gap-1'>
                <TextSize color='#101828' size={16} content='지원서 관리' />
                <TextSize
                  color='#4A5565'
                  size={14}
                  content={`지원서를 작성하고 여러 공고에 \n간편 지원 할 수 있어요`}
                />
              </View>
            </View>
            <View className='px-6 py-4 mt-4 bg-[#F9FAFB] rounded-lg flex-row gap-2'>
              <CheckIcon width={22} height={22} />
              <View className='flex-col gap-1'>
                <TextSize
                  color='#101828'
                  size={16}
                  content='운영자 기능 이용 가능'
                />
                <TextSize
                  color='#4A5565'
                  size={14}
                  content={`인증 후 게스트하우스를 등록하고 \n직접 스텝을 모집할 수 있어요`}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </CustomSafeAreaView>
  );
}
