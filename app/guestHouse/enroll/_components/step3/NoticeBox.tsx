import React from 'react';
import { Text, View } from 'react-native';

const NoticeBox = () => {
  return (
    <View className="w-full bg-[#fff9e6] rounded-[10px] p-4 gap-2">
      <View className="flex-row items-center gap-1 mb-1">
        <Text>💡</Text>
        <Text className="text-[#8b7a00] text-[11px] font-bold">
          객실 타입 등록 안내
        </Text>
      </View>
      <View className="gap-1">
        <Text className="text-[#8b7a00] text-[10px] leading-4">
          • 도미토리, 개인실, 더블룸 등 각 타입별로 등록해주세요
        </Text>
        <Text className="text-[#8b7a00] text-[10px] leading-4">
          • 같은 타입이라도 가격이 다르면 별도로 등록해주세요
        </Text>
      </View>
    </View>
  );
};

export default NoticeBox;
