import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const PartyComponent = () => {
  return (
    <View className="flex-1 ">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 40,
        }}
      >
        <View className="w-full max-w-sm">
          <View className="w-full bg-white rounded-[12px] shadow-sm p-6 mb-4">
            <View className="flex-row items-center mb-1">
              <Text className="text-[#101828] text-xl font-medium">파티 </Text>
              <Text className="text-[#fb2c36] text-xl font-bold">*</Text>
            </View>

            <Text className="text-[#697282] text-xs font-normal mb-3">
              최대 10개까지 등록할 수 있습니다
            </Text>

            <View className="w-full bg-white rounded-[12px] border border-gray-200 overflow-hidden">
              <View className="w-full h-48 relative">
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1519671482502-9759101d4561?auto=format&fit=crop&q=80&w=800',
                  }}
                  className="w-full h-full"
                  resizeMode="cover"
                />

                {/* 뱃지 */}
                <View className="absolute left-0 top-0 px-4 py-1.5 bg-sky-500 rounded-br-[12px]">
                  <Text className="text-white text-xs font-bold">대표</Text>
                </View>

                {/* 우측 상단 버튼 */}
                <View className="absolute right-3 top-3 flex-row gap-2">
                  <View className="w-8 h-8 bg-white/90 rounded-lg justify-center items-center shadow-sm">
                    <Feather name="edit-2" size={16} color="#4a5565" />
                  </View>
                  <View className="w-8 h-8 bg-white/90 rounded-lg justify-center items-center shadow-sm">
                    <Feather name="more-horizontal" size={16} color="#4a5565" />
                  </View>
                </View>
              </View>

              {/* 컨텐츠 영역 */}
              <View className="p-4 gap-3">
                {/* 제목 */}
                <Text className="text-[#101828] text-sm font-bold">
                  포틀럭 파티
                </Text>

                {/* 설명 박스 */}
                <View className="w-full p-3 bg-gray-50 rounded-lg">
                  <Text className="text-[#4a5565] text-xs leading-5">
                    각자 음식을 준비해 와서 나누어 먹는 파티입니다.{'\n'}
                    술게임과 담소를 나누며 다양한 게스트들과{'\n'}
                    친해질 수 있는 좋은 기회입니다.
                  </Text>
                </View>

                {/* 정보 리스트 */}
                <View className="gap-2">
                  <InfoRow
                    icon={<Feather name="clock" size={14} color="#9aa4b2" />}
                    text="21:00 ~ 23:30"
                  />
                  <InfoRow
                    icon={<Feather name="calendar" size={14} color="#9aa4b2" />}
                    label="진행 요일:"
                    value="금, 토"
                  />
                  <InfoRow
                    icon={<Feather name="map-pin" size={14} color="#9aa4b2" />}
                    label="파티 장소:"
                    value="공용 라운지"
                  />
                  <InfoRow
                    icon={
                      <Ionicons name="wine-outline" size={14} color="#9aa4b2" />
                    }
                    label="파티 분위기:"
                    value="술게임 / 담소 / 공연"
                  />
                  <InfoRow
                    icon={
                      <Feather name="user-check" size={14} color="#9aa4b2" />
                    }
                    label="외부인 참여:"
                    value="가능"
                    valueColor="text-emerald-500"
                  />
                </View>

                {/* 파티비 */}
                <View className="pt-3 border-t border-gray-100 flex-row mt-1">
                  <Text className="text-[#101828] text-xs font-medium mr-2">
                    파티비:
                  </Text>
                  <Text className="text-sky-500 text-xs font-medium">
                    숙박객 20,000원 / 외부인 20,000원
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              className="w-full h-12 mt-4 bg-sky-50 rounded-xl border border-sky-200 flex-row justify-center items-center gap-2"
              activeOpacity={0.7}
              onPress={() => router.push('/guestHouse/enroll/makeParty')}
            >
              <Feather name="plus" size={18} color="#0ea5e9" />
              <Text className="text-sky-600 text-sm font-medium">
                파티 추가
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
  text,
  valueColor = 'text-[#101828]',
}: any) => (
  <View className="flex-row items-center gap-2">
    {icon}
    {text ? (
      <Text className="text-[#101828] text-xs">{text}</Text>
    ) : (
      <View className="flex-row gap-1">
        <Text className="text-[#4a5565] text-xs">{label}</Text>
        <Text className={`${valueColor} text-xs font-medium`}>{value}</Text>
      </View>
    )}
  </View>
);

export default PartyComponent;
