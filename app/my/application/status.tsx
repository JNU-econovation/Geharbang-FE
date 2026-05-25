import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import CachedImage from "@/src/components/ui/CachedImage";

import Location from "@/public/svgs/GuestHouse/location.svg";
import Calender from "@/public/svgs/MyPage/calender.svg";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import Button from "@/src/components/ui/Button/Button";
import TextSize from "@/src/components/ui/TextSize";
import { buildAssetUrl } from "@/src/config/url";
import { useMyApplicationStatus } from "@/src/hooks/application/myApplication/useMyApplicationStatus";
import { useCreateChatRoom } from "@/src/hooks/chat/useChat";
import { COLORS } from "@/src/utils/constants/colors";
import { router } from "expo-router";

type FilterType = "ALL" | "ACCEPTED";

export default function MyApplicationStatus() {
  const [filter, setFilter] = useState<FilterType>("ALL");

  const { data, isLoading, isError, refetch } = useMyApplicationStatus(filter);
  const { mutate: createChatRoom, isPending: isCreatingChatRoom } =
    useCreateChatRoom();

  const filteredApplicationStatus =
    filter === "ACCEPTED"
      ? data?.applicationRecords.filter((item) => item.isAccepted)
      : data?.applicationRecords;

  const handleChatPress = (applicationRecordId: number, title: string) => {
    createChatRoom(applicationRecordId, {
      onSuccess: ({ chatRoomId }) => {
        router.push({
          pathname: "/chats/[roomId]",
          params: {
            roomId: String(chatRoomId),
            title,
          },
        });
      },
    });
  };

  return (
    <CustomSafeAreaView pageColor='bg-[#F9FAFB]'>
      <View className='px-3 pt-3 pb-4 border-b-[1px] border-[#E5E5E5]'>
        <BackArrorHeader content='지원 현황' />
      </View>

      <View className='p-4 flex-row gap-4 bg-white'>
        <Pressable onPress={() => setFilter("ALL")}>
          <View
            className={`px-8 py-3 rounded-lg ${
              filter === "ALL" ? "bg-[#0EA5E9]" : "bg-[#F3F4F6]"
            }`}
          >
            <TextSize
              color={filter === "ALL" ? "#FFFFFF" : "#4A5565"}
              size={16}
              content='전체'
            />
          </View>
        </Pressable>
        <Pressable onPress={() => setFilter("ACCEPTED")}>
          <View
            className={`px-8 py-3 rounded-lg ${
              filter === "ACCEPTED" ? "bg-[#0EA5E9]" : "bg-[#F3F4F6]"
            }`}
          >
            <TextSize
              color={filter === "ACCEPTED" ? "#FFFFFF" : "#4A5565"}
              size={16}
              content='합격'
            />
          </View>
        </Pressable>
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
          {filteredApplicationStatus?.map((applicationStatus) => {
            const imageUri = buildAssetUrl(applicationStatus.imageUrl);
            return (
              <View
                key={applicationStatus.id}
                className='mt-4 mx-4 p-4 bg-white rounded-lg'
              >
                <Pressable
                  onPress={() =>
                    router.push(
                      `/step/stepDetail/${applicationStatus.staffRecruitmentId}`,
                    )
                  }
                >
                  <View className='flex-row  gap-3'>
                    <View className='flex-row items-center gap-4'>
                      {imageUri ? (
                        <CachedImage
                          uri={imageUri}
                          style={{ width: 70, height: 70, borderRadius: 100 }}
                        />
                      ) : (
                        <View className='w-[70px] h-[70px] rounded-full bg-[#E5E7EB]' />
                      )}

                      <View className='flex gap-3'>
                        <TextSize
                          color='#101828'
                          size={16}
                          content={applicationStatus.title}
                        />
                        <View className='flex-row gap-2'>
                          <Location width={14} height={14} />
                          <TextSize
                            color='#6A7282'
                            size={13}
                            content={applicationStatus.region}
                          />
                        </View>
                      </View>
                    </View>

                    {applicationStatus.isAccepted ? (
                      <View className='p-2 bg-[#D1FAE5] rounded-lg self-start ml-auto'>
                        <TextSize color='#065F46' size={13} content='합격' />
                      </View>
                    ) : (
                      <View className='p-2 bg-[#FFFBEB] rounded-lg self-start ml-auto'>
                        <TextSize color='#BB4D00' size={13} content='대기중' />
                      </View>
                    )}
                  </View>

                  <View className='h-5 border-b-[1px] border-[#F3F4F6]' />
                  <View className='pt-3 flex-row gap-4'>
                    <Calender width={14} height={14} />
                    <TextSize
                      color='#6A7282'
                      size={13}
                      content={applicationStatus.appliedAt}
                    />
                  </View>
                </Pressable>
                <View className='pt-4'>
                  <Button
                    height={42}
                    content='채팅하기'
                    textColor={COLORS.PRIMARY.BLUE}
                    className='bg-white border border-primary-blue'
                    isPending={isCreatingChatRoom}
                    onPress={() =>
                      handleChatPress(
                        applicationStatus.id,
                        applicationStatus.title,
                      )
                    }
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </CustomSafeAreaView>
  );
}
