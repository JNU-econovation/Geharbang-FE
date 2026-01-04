import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { formatTime } from '@/src/utils/common/dateFormatter';

import InfoRow from './InfoRow';

interface PartyCardProps {
  party: {
    id: string;
    type: string;
    customTypeName?: string;
    description: string;
    startTime: Date;
    endTime: Date;
    days: string[];
    location: string;
    mood: string;
    allowExternal: boolean;
    guestFee: string;
    externalFee: string;
    images: Array<{ uri: string }>;
  };
  isRepresentative?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const PartyCard = ({
  party,
  isRepresentative,
  onEdit,
  onDelete,
}: PartyCardProps) => {
  return (
    <View className="w-full bg-white rounded-[12px] border border-gray-200 overflow-hidden mb-4">
      <View className="w-full h-48 relative">
        {party.images.length > 0 ? (
          <Image
            source={{ uri: party.images[0].uri }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full bg-gray-200 justify-center items-center">
            <Feather name="image" size={40} color="#9aa4b2" />
          </View>
        )}

        {isRepresentative && (
          <View className="absolute left-0 top-0 px-4 py-1.5 bg-sky-500 rounded-br-[12px]">
            <Text className="text-white text-xs font-bold">대표</Text>
          </View>
        )}

        <View className="absolute right-3 top-3 flex-row gap-2">
          <TouchableOpacity
            className="w-8 h-8 bg-white/90 rounded-lg justify-center items-center shadow-sm"
            onPress={onEdit}
          >
            <Feather name="edit-2" size={16} color="#4a5565" />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-8 h-8 bg-white/90 rounded-lg justify-center items-center shadow-sm"
            onPress={onDelete}
          >
            <Feather name="trash-2" size={16} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-4 gap-3">
        <Text className="text-[#101828] text-sm font-bold">
          {party.type === '기타' ? party.customTypeName : party.type}
        </Text>

        <View className="w-full p-3 bg-gray-50 rounded-lg">
          <Text className="text-[#4a5565] text-xs leading-5">
            {party.description}
          </Text>
        </View>

        <View className="gap-2">
          <InfoRow
            icon={<Feather name="clock" size={14} color="#9aa4b2" />}
            text={`${formatTime(party.startTime)} ~ ${formatTime(
              party.endTime,
            )}`}
          />
          <InfoRow
            icon={<Feather name="calendar" size={14} color="#9aa4b2" />}
            label="진행 요일:"
            value={party.days.join(', ')}
          />
          <InfoRow
            icon={<Feather name="map-pin" size={14} color="#9aa4b2" />}
            label="파티 장소:"
            value={party.location}
          />
          <InfoRow
            icon={<Ionicons name="wine-outline" size={14} color="#9aa4b2" />}
            label="파티 분위기:"
            value={party.mood}
          />
          <InfoRow
            icon={<Feather name="user-check" size={14} color="#9aa4b2" />}
            label="외부인 참여:"
            value={party.allowExternal ? '가능' : '불가능'}
            valueColor={
              party.allowExternal ? 'text-emerald-500' : 'text-red-500'
            }
          />
        </View>

        <View className="pt-3 border-t border-gray-100 flex-row mt-1">
          <Text className="text-[#101828] text-xs font-medium mr-2">
            파티비:
          </Text>
          <Text className="text-sky-500 text-xs font-medium">
            숙박객 {party.guestFee}원
            {party.allowExternal && ` / 외부인 ${party.externalFee}원`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PartyCard;
