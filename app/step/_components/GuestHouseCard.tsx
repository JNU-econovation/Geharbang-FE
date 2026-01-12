import Tag from "@/src/components/ui/Tag/Tag";
import { GuestHousePost } from "@/src/types/models/guestHouse/types";
import { StaffRecruitmentPost } from "@/src/types/models/step/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

interface GuestHouseCardProps {
  type: "stepRecruitment" | "guestHouse";
  item: StaffRecruitmentPost | GuestHousePost;
  onPress?: () => void;
}

export default function GuestHouseCard({
  type,
  item,
  onPress,
}: GuestHouseCardProps) {
  const isStepRecruitment = type === "stepRecruitment";

  const displayTitle = isStepRecruitment
    ? (item as StaffRecruitmentPost).title
    : (item as GuestHousePost).guestHouseName;

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    if (isStepRecruitment) {
      router.push(`/step/stepDetail/${item.id}`);
    } else {
      router.push(`/guestHouse/guestHouseDetail/${item.id}`);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className='mx-4 px-4 pt-4 pb-4 bg-white rounded-xl border border-gray-200 mb-3 -z-10'
    >
      <View className='flex-row'>
        <View className='w-16 h-16 rounded-lg overflow-hidden bg-gray-100 items-center justify-center'>
          {item.imageUrl ? (
            <Image
              source={{ uri: `${baseURL}${item.imageUrl}` }}
              className='w-full h-full'
              resizeMode='cover'
            />
          ) : (
            <Ionicons name='image-outline' size={24} color='#9ca3af' />
          )}
        </View>

        <View className='flex-1 ml-3 justify-start gap-0.5'>
          <Text
            className='text-[#1d2838] text-sm font-normal leading-[21px]'
            numberOfLines={1}
          >
            {displayTitle}
          </Text>
          <Text className='text-[#495565] text-xs font-normal leading-[18px]'>
            {item.region}
          </Text>
          <View className='flex-row gap-1'>
            {item.tags.map((tag, index) => (
              <Tag
                key={index}
                label={tag}
                variant='info'
                size='sm'
                prefix='#'
              />
            ))}
          </View>
        </View>

        <TouchableOpacity className='w-6 h-6 items-center justify-center'>
          <Ionicons
            name={item.isWished ? "heart" : "heart-outline"}
            size={16}
            color={item.isWished ? "#ef4444" : "#d1d5db"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
