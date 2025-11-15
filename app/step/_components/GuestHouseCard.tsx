import Tag from '@/src/components/ui/Tag';
import { GuestHouse } from '@/src/types/step/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface GuestHouseCardProps {
  item: GuestHouse;
  isLiked: boolean;
  onPress?: () => void;
}

export default function GuestHouseCard({
  item,
  isLiked,

  onPress,
}: GuestHouseCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      className="px-4 pt-4 pb-4 bg-white rounded-xl border border-gray-200 mb-3"
    >
      <View className="flex-row">
        <View className="w-16 h-16 rounded-lg overflow-hidden">
          <Image
            source={{ uri: item.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        <View className="flex-1 ml-3 justify-start gap-0.5">
          <Text
            className="text-[#1d2838] text-sm font-normal leading-[21px]"
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text className="text-[#495565] text-xs font-normal leading-[18px]">
            {item.location}
          </Text>
          <Tag label={item.period} variant="info" size="sm" prefix="#" />
        </View>

        <TouchableOpacity className="w-6 h-6 items-center justify-center">
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={16}
            color={isLiked ? '#ef4444' : '#d1d5db'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
