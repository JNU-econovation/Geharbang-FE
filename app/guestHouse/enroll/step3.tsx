import { router } from 'expo-router';

import { Feather, Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import GuestHouseEnrollLayout from './_components/GuestHouseEnrollLayout';

export default function GuestHouseEnrollStep3() {
  const handleNext = () => {
    router.push('/guestHouse/enroll/step4');
  };

  const handlePrev = () => {
    router.back();
  };
  interface RoomCardProps {
    name: string;
    time: string;
    price: string;
    isRepresentative?: boolean;
    imageUrl: string;
  }

  const RoomCard = ({
    name,
    time,
    price,
    isRepresentative,
    imageUrl,
  }: RoomCardProps) => {
    return (
      <View className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
        <View className="w-full h-[180px] relative">
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* 대표 뱃지 */}
          {isRepresentative && (
            <View className="absolute left-2 top-2 px-3 py-1.5 bg-sky-500 rounded-full">
              <Text className="text-white text-[10px] font-bold">대표</Text>
            </View>
          )}

          {/* 우측 상단 아이콘 버튼들 */}
          <View className="absolute right-2 top-2 flex-row gap-2">
            <TouchableOpacity className="w-7 h-7 bg-white/90 rounded-[10px] justify-center items-center shadow-sm">
              <Feather name="edit-2" size={14} color="#4a5565" />
            </TouchableOpacity>
            <TouchableOpacity className="w-7 h-7 bg-white/90 rounded-[10px] justify-center items-center shadow-sm">
              <Feather name="trash-2" size={14} color="#fa2b36" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 정보 영역 */}
        <View className="p-4 gap-2">
          {/* 객실 이름 */}
          <View className="flex-row items-center gap-2">
            <Ionicons name="bed-outline" size={18} color="#101828" />
            <Text className="text-[#101828] text-[15px] font-medium">
              {name}
            </Text>
          </View>

          {/* 입/퇴실 시간 */}
          <View className="flex-row items-center gap-2">
            <Feather name="clock" size={14} color="#4a5565" />
            <Text className="text-[#4a5565] text-xs">{time}</Text>
          </View>

          {/* 가격 */}
          <View className="mt-1">
            <Text className="text-[#101828] text-xl font-bold">{price}</Text>
          </View>
        </View>
      </View>
    );
  };

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
  return (
    <GuestHouseEnrollLayout currentStep={3} stepTitle="객실 타입 등록">
      <ScrollView className="bg-[#F9FAFB]" style={{ paddingHorizontal: 12 }}>
        <View className="flex-1 bg-gray-50">
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              paddingVertical: 40,
            }}
          >
            <View className="w-full max-w-sm">
              <View className="w-full bg-white rounded-[10px] shadow-sm p-6 gap-5">
                {/* 1. 헤더 섹션 */}
                <View>
                  <View className="flex-row items-center mb-1">
                    <Text className="text-[#101828] text-lg font-bold">
                      객실 타입{' '}
                    </Text>
                    <Text className="text-[#fa2b36] text-lg font-bold">*</Text>
                  </View>
                  <Text className="text-[#6a7282] text-xs">
                    최대 10개까지 등록할 수 있습니다
                  </Text>
                </View>

                {/* 2. 등록된 객실 카드 (예시: 동백꽃) */}
                <RoomCard
                  name="동백꽃"
                  time="입실 15:00 - 퇴실 11:00"
                  price="32,550원"
                  isRepresentative={true}
                  imageUrl="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800"
                />

                {/* 3. 객실 타입 추가 버튼 */}
                <TouchableOpacity
                  className="w-full h-12 bg-sky-50 rounded-xl border border-sky-500 flex-row justify-center items-center gap-2"
                  activeOpacity={0.7}
                >
                  <Feather name="plus-square" size={18} color="#0ea5e9" />
                  <Text className="text-sky-500 text-sm font-medium">
                    객실 타입 추가
                  </Text>
                </TouchableOpacity>

                {/* 4. 안내 박스 (노란색) */}
                <NoticeBox />
              </View>
            </View>
          </ScrollView>
        </View>
        <Flex items="center">
          <Button
            variant="primary"
            width={360}
            height={50}
            textColor="white"
            content="다음"
            onPress={handleNext}
            className="mt-4"
          />
        </Flex>
      </ScrollView>
    </GuestHouseEnrollLayout>
  );
}
