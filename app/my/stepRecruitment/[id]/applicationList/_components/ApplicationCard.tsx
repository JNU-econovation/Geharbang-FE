import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button/Button";
import TextSize from "@/src/components/ui/TextSize";
import { buildAssetUrl } from "@/src/config/url";
import { useCreateChatRoom } from "@/src/hooks/chat/useChat";
import { COLORS } from "@/src/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import CachedImage from "@/src/components/ui/CachedImage";
import ApplicantStatusBadge from "./ApplicationStatusBadge";

export type ApplicationStatusType = "대기중" | "합격";

interface ApplicationCardProps {
  stepRecruitmentId: number;
  applicationId: number;
  name: string;
  imageUrl: string;
  appliedAt: string;
  applicationStatus: ApplicationStatusType;
  onPass: () => void;
}

export default function ApplicationCard({
  stepRecruitmentId,
  applicationId,
  name,
  imageUrl,
  appliedAt,
  applicationStatus,
  onPass,
}: ApplicationCardProps) {
  const imageUri = buildAssetUrl(imageUrl);
  const { mutate: createChatRoom, isPending: isCreatingChatRoom } =
    useCreateChatRoom();

  const handleChatPress = () => {
    createChatRoom({ applicationRecordId: applicationId }, {
      onSuccess: ({ chatRoomId }) => {
        router.push({
          pathname: "/chats/[roomId]",
          params: {
            roomId: String(chatRoomId),
            title: name,
          },
        });
      },
    });
  };

  return (
    <View className='w-full bg-white border border-gray-border rounded-2xl p-4 gap-4'>
      <Flex dir='row' justify='start' items='center' gap={14}>
        {imageUri ? (
          <CachedImage uri={imageUri} className='rounded-full w-12 h-12' />
        ) : (
          <View className='rounded-full w-12 h-12 bg-gray-100' />
        )}
        <View className='gap-1.5'>
          <Flex dir='row' justify='start' items='center' gap={7}>
            <TextSize size={18} content={name} />
            <ApplicantStatusBadge status={applicationStatus} />
          </Flex>
          <Flex dir='row' justify='start' items='center' gap={8}>
            <Ionicons name='calendar-clear-outline' color='gray' />
            <TextSize
              size={13}
              color={COLORS.GRAY.TEXT}
              content={`${appliedAt} 지원`}
            />
          </Flex>
        </View>
      </Flex>
      <Flex dir='row' justify='between' items='center' gap={10}>
        <Button
          height={40}
          content='지원서 보기'
          textColor={COLORS.PRIMARY.BLUE}
          className='flex-1 bg-white border border-primary-blue'
          onPress={() =>
            router.push(
              `/my/stepRecruitment/${stepRecruitmentId}/applicationList/${applicationId}/profile`
            )
          }
        />
        <Button
          height={40}
          content='추가 질문 답변 보기'
          textColor={COLORS.PURPLE.TEXT}
          className='flex-1 bg-white border border-purple-text'
          onPress={() =>
            router.push(
              `/my/stepRecruitment/${stepRecruitmentId}/applicationList/${applicationId}/answers`
            )
          }
        />
      </Flex>
      <Button
        variant='blue'
        height={40}
        content='채팅하기'
        textColor={COLORS.PRIMARY.BLUE}
        className='flex-1 bg-white border border-primary-blue'
        isPending={isCreatingChatRoom}
        icon={
          <Ionicons
            name='chatbubble-ellipses-outline'
            size={18}
            color={COLORS.PRIMARY.BLUE}
          />
        }
        onPress={handleChatPress}
      />
      {applicationStatus == "대기중" ? (
        <Button
          variant='green'
          height={40}
          content='합격 처리 하기'
          textColor={COLORS.GREEN.TEXT}
          className='flex-1'
          icon={
            <Ionicons
              name='checkmark-circle-outline'
              size={20}
              color={COLORS.GREEN.TEXT}
            />
          }
          onPress={onPass}
        />
      ) : (
        <Button
          variant='green'
          height={40}
          content='합격자로 선택됨'
          textColor={COLORS.GREEN.TEXT}
          className='flex-1 border-0'
        />
      )}
    </View>
  );
}
