import Flex from '@/src/components/layout/Flex/Flex';
import Button from '@/src/components/ui/Button/Button';
import MultiImagePicker from '@/src/components/ui/imagePicker/MultiImagePicker';
import TimePickerField from '@/src/components/ui/TimePickerField';
import { File } from '@/src/types/File';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
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

type RoomType = '여성 전용 도미토리' | '남성 전용 도미토리';
type Occupancy = '1인실' | '2인실' | '3인이상';

const SelectButton = ({
  label,
  selected,
  onPress,
  showCircle,
  circleColor,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  showCircle?: boolean;
  circleColor?: string;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`w-full py-3 rounded-lg border items-center justify-center ${
      selected
        ? 'bg-sky-50 border-sky-500'
        : 'bg-white border-gray-200'
    }`}
  >
    <View className="flex-row items-center gap-2">
      {showCircle && circleColor && (
        <View
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: circleColor }}
        />
      )}
      <Text
        className={`text-sm ${
          selected ? 'text-sky-500 font-medium' : 'text-[#364153]'
        }`}
      >
        {label}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function AddRoomForm() {
  const [roomName, setRoomName] = useState('');
  const [roomType, setRoomType] = useState<RoomType | null>(null);
  const [occupancy, setOccupancy] = useState<Occupancy | null>(null);
  const [checkInTime, setCheckInTime] = useState(new Date());
  const [checkOutTime, setCheckOutTime] = useState(new Date());
  const [price, setPrice] = useState('');
  const [roomImages, setRoomImages] = useState<File[]>([]);

  const handleAddRoom = () => {
    // TODO: Save room data to state management (Zustand/Context)
    // For now, just navigate back to step3
    router.push('/guestHouse/enroll/step3');
  };

  return (
    <GuestHouseEnrollLayout currentStep={3} stepTitle="객실 타입 등록">
      <ScrollView className="bg-[#F9FAFB]" style={{ paddingHorizontal: 12 }}>
        <View className="py-10">
          <View className="bg-white rounded-xl shadow-sm p-6 gap-6">
              {/* 헤더 */}
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-[#101828] text-lg font-bold">
                  객실타입추가
                </Text>
                <TouchableOpacity
                  className="p-2"
                  onPress={() => router.push('/guestHouse/enroll/step3')}
                >
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
                  value={roomName}
                  onChangeText={setRoomName}
                />
              </View>

              {/* 2. 객실 타입 */}
              <View>
                <FormLabel text="객실 타입" required />
                <View className="gap-2 mt-2">
                  <SelectButton
                    label="여성 전용 도미토리"
                    selected={roomType === '여성 전용 도미토리'}
                    onPress={() => setRoomType('여성 전용 도미토리')}
                    showCircle={true}
                    circleColor="#fa2b36"
                  />
                  <SelectButton
                    label="남성 전용 도미토리"
                    selected={roomType === '남성 전용 도미토리'}
                    onPress={() => setRoomType('남성 전용 도미토리')}
                    showCircle={true}
                    circleColor="#3b82f6"
                  />
                </View>
              </View>

              {/* 3. 객실 인원 */}
              <View>
                <FormLabel text="객실 인원" required />
                <View className="flex-row gap-2 mt-2">
                  {(['1인실', '2인실', '3인이상'] as const).map((label) => (
                    <TouchableOpacity
                      key={label}
                      onPress={() => setOccupancy(label)}
                      className={`flex-1 h-11 rounded-lg border justify-center items-center ${
                        occupancy === label
                          ? 'bg-sky-50 border-sky-500'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          occupancy === label
                            ? 'text-sky-500 font-medium'
                            : 'text-[#364153]'
                        }`}
                      >
                        {label}
                      </Text>
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
                    <TimePickerField
                      value={checkInTime}
                      onChange={setCheckInTime}
                    />
                  </View>
                  <Text className="text-[#364153] text-base mt-5">~</Text>
                  <View className="flex-1 gap-1">
                    <Text className="text-[#6a7282] text-xs">퇴실</Text>
                    <TimePickerField
                      value={checkOutTime}
                      onChange={setCheckOutTime}
                    />
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
                    value={price}
                    onChangeText={setPrice}
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
                <MultiImagePicker
                  selectedImageFiles={roomImages}
                  setSelectedImageFiles={setRoomImages}
                  maxCount={10}
                  error={false}
                  clearError={() => {}}
                />
              </View>
          </View>
        </View>
        <Flex items="center">
          <Button
            variant="primary"
            width={360}
            height={50}
            textColor="white"
            content="객실 추가"
            onPress={handleAddRoom}
            className="mt-4"
          />
        </Flex>
      </ScrollView>
    </GuestHouseEnrollLayout>
  );
}
