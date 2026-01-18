import GehaDetailInfo from "@/app/step/stepDetail/_components/GehaInfo/GehaDetailInfo";
import GehaLocation from "@/public/svgs/StepDetail/gehaLocation.svg";
import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button/Button";
import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, View } from "react-native";
import StatusBadge from "./StatusBadge";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

interface ManagementCardProps {
  id: number;
  type: "guestHouse" | "stepRecruitment";
  title: string;
  roadNameAddress: string;
  imageUrl: string;
  isClosed: boolean;
  onDelete: () => void;
  onToggleActive: () => void;
}

export default function ManagementCard({
  id,
  type,
  title,
  roadNameAddress,
  imageUrl,
  isClosed,
  onDelete,
  onToggleActive,
}: ManagementCardProps) {
  const onDetail = () => {
    if (type == "guestHouse") {
      router.push(`/guestHouse/guestHouseDetail/${id}`);
    } else {
      router.push(`/step/stepDetail/${id}`);
    }
  };

  return (
    <Pressable
      onPress={onDetail}
      className='w-full bg-white rounded-2xl gap-2 border border-gray-border overflow-hidden'
    >
      <View className='relative w-full h-44'>
        <Image
          source={{ uri: `${baseURL}${imageUrl}` }}
          className='w-full h-full'
          resizeMode='cover'
        />

        <StatusBadge type={type} isClosed={isClosed} />

        <Pressable
          className='absolute top-3 right-3 bg-primary-red p-2 rounded-full'
          onPress={onDelete}
        >
          <Ionicons name='trash-outline' color='white' size={15} />
        </Pressable>
      </View>

      <View className='px-3 pt-2 pb-4 gap-4'>
        <View className='gap-2'>
          <Flex justify='between' items='center' dir='row'>
            <TextSize size={18} color='#1F2937' content={title} weight='bold' />
            <Ionicons name='arrow-forward-outline' color='gray' size={18} />
          </Flex>

          <GehaDetailInfo
            icon={<GehaLocation width={14} height={14} />}
            content={roadNameAddress}
          />
        </View>

        <Flex dir='row' justify='between' items='center' gap={10}>
          {isClosed ? (
            <Button
              variant='green'
              height={40}
              content='활성화 하기'
              textColor={COLORS.GREEN.TEXT}
              onPress={onToggleActive}
              className='flex-1'
            />
          ) : (
            <Button
              variant='gray'
              height={40}
              content='비활성화 하기'
              textColor={COLORS.GRAY.TEXT}
              onPress={onToggleActive}
              className='flex-1 border border-gray-400'
            />
          )}

          {type === "stepRecruitment" && (
            <Button
              variant='blue'
              height={40}
              content='받은 지원서 보기'
              textColor={COLORS.PRIMARY.BLUE}
              className='flex-1'
              onPress={() =>
                router.push(`/my/stepRecruitment/${id}/applicationList`)
              }
            />
          )}
        </Flex>
      </View>
    </Pressable>
  );
}
