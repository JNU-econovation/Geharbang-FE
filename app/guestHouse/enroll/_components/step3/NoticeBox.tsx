import React from 'react';
import { Text, View } from 'react-native';
import { NOTICE_TEXTS } from '@/src/utils/constants/guestHouseEnrollment';

const NoticeBox = () => {
  return (
    <View className="w-full bg-[#fff9e6] rounded-[10px] p-4 gap-2">
      <View className="flex-row items-center gap-1 mb-1">
        <Text>💡</Text>
        <Text className="text-[#8b7a00] text-[11px] font-bold">
          {NOTICE_TEXTS.ROOM_TYPE_TITLE}
        </Text>
      </View>
      <View className="gap-1">
        {NOTICE_TEXTS.ROOM_TYPE_MESSAGES.map((message, index) => (
          <Text key={index} className="text-[#8b7a00] text-[10px] leading-4">
            • {message}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default NoticeBox;
