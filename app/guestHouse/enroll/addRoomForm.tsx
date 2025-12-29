import Flex from '@/src/components/layout/Flex/Flex';
import Button from '@/src/components/ui/Button/Button';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import GuestHouseEnrollLayout from './_components/GuestHouseEnrollLayout';

const FormLabel = ({
  text,
  required,
}: {
  text: string;
  required?: boolean;
}) => (
  <View className="flex-row items-center">
    <Text className="text-[#4a5565] text-[13px] font-medium">{text}</Text>
    {required && <Text className="text-[#fa2b36] text-[13px] ml-1">*</Text>}
  </View>
);

const SelectButton = ({ label }: { label: string }) => (
  <TouchableOpacity className="w-full py-3 bg-white rounded-lg border border-gray-200 items-center justify-center">
    <Text className="text-[#364153] text-sm">{label}</Text>
  </TouchableOpacity>
);

export default function AddRoomForm() {
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
            <View className="flex-1 bg-white rounded-xl shadow-sm p-6 gap-6">
              {/* 헤더 */}
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-[#101828] text-lg font-bold">
                  객실타입추가
                </Text>
                <TouchableOpacity className="p-2">
                  <Feather name="x" size={24} color="#101828" />
                </TouchableOpacity>
              </View>

              {/* 1. 객실명 */}
              <View>
                <FormLabel text="객실명" required />
                <TextInput
                  className="w-full h-12 px-4 rounded-lg border border-gray-200 text-sm mt-2"
                  placeholder="예: 더블룸"
                  placeholderTextColor="#99a1af"
                />
              </View>

              {/* 2. 객실 타입 */}
              <View>
                <FormLabel text="객실 타입" required />
                <View className="gap-2 mt-2">
                  <SelectButton label="여성 전용 도미토리" />
                  <SelectButton label="남성 전용 도미토리" />
                </View>
              </View>

              {/* 3. 객실 인원 */}
              <View>
                <FormLabel text="객실 인원" required />
                <View className="flex-row gap-2 mt-2">
                  {['1인실', '2인실', '3인이상'].map((label, index) => (
                    <TouchableOpacity
                      key={index}
                      className="flex-1 h-11 bg-white rounded-lg border border-gray-200 justify-center items-center"
                    >
                      <Text className="text-[#364153] text-sm">{label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* 4. 입실/퇴실 시간 */}
              <View>
                <FormLabel text="입실/퇴실 시간" required />
                <View className="flex-row items-center gap-2 mt-2">
                  <View className="flex-1 gap-1">
                    <Text className="text-[#6a7282] text-xs">입실</Text>
                    <TouchableOpacity className="h-12 px-4 rounded-lg border border-gray-200 justify-center">
                      <Text className="text-[#99a1af] text-sm">11:00</Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-[#99a1af] text-base mt-5">~</Text>
                  <View className="flex-1 gap-1">
                    <Text className="text-[#6a7282] text-xs">퇴실</Text>
                    <TouchableOpacity className="h-12 px-4 rounded-lg border border-gray-200 justify-center">
                      <Text className="text-[#99a1af] text-sm">23:00</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* 5. 1박 가격 */}
              <View>
                <FormLabel text="1박 가격" required />
                <View className="flex-row items-center w-full h-12 px-4 rounded-lg border border-gray-200 mt-2">
                  <TextInput
                    className="flex-1 text-sm text-[#101828]"
                    placeholder="예 : 30000"
                    placeholderTextColor="#99a1af"
                    keyboardType="numeric"
                  />
                  <Text className="text-[#6a7282] text-sm ml-2">원</Text>
                </View>
              </View>

              {/* 6. 객실 사진 */}
              <View>
                <FormLabel text="객실 사진" />
                <Text className="text-[#697282] text-xs mt-1 mb-3">
                  최대 10장까지 등록할 수 있습니다
                </Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row gap-3">
                    {/* 대표 사진 */}
                    <View className="w-48 h-32 relative rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        source={{
                          uri: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800',
                        }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                      <View className="absolute left-2 top-2 px-2 py-1 bg-sky-500 rounded-full">
                        <Text className="text-white text-[10px]">대표</Text>
                      </View>
                      <TouchableOpacity className="absolute right-2 top-2 bg-black/50 p-1 rounded-full">
                        <Feather name="x" size={12} color="white" />
                      </TouchableOpacity>
                    </View>

                    {/* 추가 사진 슬롯 (빈 상태 예시) */}
                    {[1, 2].map((i) => (
                      <View
                        key={i}
                        className="w-48 h-32 bg-gray-100 rounded-xl justify-center items-center border border-dashed border-gray-300"
                      >
                        <Feather name="image" size={24} color="#9ca3af" />
                      </View>
                    ))}
                  </View>
                </ScrollView>
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
            className="mt-4"
          />
        </Flex>
      </ScrollView>
    </GuestHouseEnrollLayout>
  );
}
