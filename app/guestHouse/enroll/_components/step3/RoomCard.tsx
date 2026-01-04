import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { formatTime } from '@/src/utils/common/dateFormatter';

interface RoomCardProps {
  room: {
    id: string;
    name: string;
    type: '여성 전용 도미토리' | '남성 전용 도미토리';
    occupancy: '1인실' | '2인실' | '3인이상';
    checkInTime: Date;
    checkOutTime: Date;
    price: string;
    images: Array<{ uri: string }>;
  };
  isRepresentative?: boolean;
  onEdit: () => void;
  onRemove: () => void;
}

const RoomCard = ({
  room,
  isRepresentative,
  onEdit,
  onRemove,
}: RoomCardProps) => {
  return (
    <View className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
      <View className="w-full h-[180px] relative">
        {room.images.length > 0 ? (
          <Image
            source={{ uri: room.images[0].uri }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full bg-gray-200 justify-center items-center">
            <Feather name="image" size={40} color="#9aa4b2" />
          </View>
        )}

        {isRepresentative && (
          <View className="absolute left-2 top-2 px-3 py-1.5 bg-sky-500 rounded-full">
            <Text className="text-white text-[10px] font-bold">대표</Text>
          </View>
        )}

        <View className="absolute right-2 top-2 flex-row gap-2">
          <TouchableOpacity
            className="w-7 h-7 bg-white/90 rounded-[10px] justify-center items-center shadow-sm"
            onPress={onEdit}
          >
            <Feather name="edit-2" size={14} color="#4a5565" />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-7 h-7 bg-white/90 rounded-[10px] justify-center items-center shadow-sm"
            onPress={onRemove}
          >
            <Feather name="trash-2" size={14} color="#fa2b36" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-4 gap-2">
        <View className="gap-1">
          <View className="flex-row items-center gap-2">
            <Ionicons name="bed-outline" size={18} color="#101828" />
            <Text className="text-[#101828] text-[15px] font-medium">
              {room.name}
            </Text>
          </View>
          <View className="flex-row items-center gap-2 ml-6">
            <View
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor:
                  room.type === '여성 전용 도미토리' ? '#fa2b36' : '#3b82f6',
              }}
            />
            <Text className="text-[#6a7282] text-xs">
              {room.type} · {room.occupancy}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <Feather name="clock" size={14} color="#4a5565" />
          <Text className="text-[#4a5565] text-xs">
            입실 {formatTime(room.checkInTime)} - 퇴실{' '}
            {formatTime(room.checkOutTime)}
          </Text>
        </View>

        <View className="mt-1">
          <Text className="text-[#101828] text-xl font-bold">
            {room.price}원
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RoomCard;
