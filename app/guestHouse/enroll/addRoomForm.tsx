import Flex from '@/src/components/layout/Flex/Flex';
import Button from '@/src/components/ui/Button/Button';
import MultiImagePicker from '@/src/components/ui/imagePicker/MultiImagePicker';
import TimePickerField from '@/src/components/ui/TimePickerField';
import { useGuestHouseStep3Validation } from '@/src/hooks/guesthouse/useGuestHouseStep3Validation';
import { useGuestHouseStore } from '@/src/stores/guestHouse/useGuestHouseStore';
import { File } from '@/src/types/File';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import GuestHouseEnrollLayout from './_components/GuestHouseEnrollLayout';
import {
  ROOM_TYPES,
  OCCUPANCY_OPTIONS,
  PLACEHOLDERS,
  BUTTON_LABELS,
  ROOM_TYPE_COLORS,
  FORM_DESCRIPTIONS,
  VALIDATION_LIMITS,
} from '@/src/utils/constants/guestHouseEnrollment';

const FormLabel = ({
  text,
  required,
}: {
  text: string;
  required?: boolean;
}) => (
  <View className="flex-row items-center">
    <Text className="text-gray-text text-[13px] font-medium">{text}</Text>
    {required && <Text className="text-primary-red text-[13px] ml-1">*</Text>}
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
      selected ? 'bg-sky-50 border-sky-500' : 'bg-white border-gray-200'
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
  const { editId } = useLocalSearchParams<{ editId?: string }>();
  const isEditMode = !!editId;

  const { addRoom, updateRoom, step3Data } = useGuestHouseStore();

  const [roomName, setRoomName] = useState('');
  const [roomType, setRoomType] = useState<RoomType | null>(null);
  const [occupancy, setOccupancy] = useState<Occupancy | null>(null);
  const [checkInTime, setCheckInTime] = useState(new Date());
  const [checkOutTime, setCheckOutTime] = useState(new Date());
  const [price, setPrice] = useState('');
  const [roomImages, setRoomImages] = useState<File[]>([]);

  useEffect(() => {
    if (isEditMode && editId) {
      const existingRoom = step3Data.rooms.find((r) => r.id === editId);
      if (existingRoom) {
        setRoomName(existingRoom.name);
        setRoomType(existingRoom.type);
        setOccupancy(existingRoom.occupancy);
        setCheckInTime(existingRoom.checkInTime);
        setCheckOutTime(existingRoom.checkOutTime);
        setPrice(existingRoom.price);
        setRoomImages(existingRoom.images);
      }
    }
  }, [isEditMode, editId, step3Data.rooms]);

  const roomData = {
    id: '',
    name: roomName,
    type: roomType || ('여성 전용 도미토리' as RoomType),
    occupancy: occupancy || ('1인실' as Occupancy),
    checkInTime,
    checkOutTime,
    price,
    images: roomImages,
  };

  const { validateRoom } = useGuestHouseStep3Validation({ rooms: [roomData] });
  const [error, setError] = useState<string>('');

  const handleAddRoom = () => {
    const validationError = validateRoom(roomData);
    if (validationError) {
      setError(validationError);
      return;
    }

    const roomPayload = {
      ...roomData,
      id: isEditMode ? editId : Date.now().toString(),
    };

    if (isEditMode && editId) {
      updateRoom(editId, roomPayload);
    } else {
      addRoom(roomPayload);
    }

    router.push('/guestHouse/enroll/step3');
  };

  return (
    <GuestHouseEnrollLayout currentStep={3} stepTitle="객실 타입 등록">
      <ScrollView className="bg-[#F9FAFB]" style={{ paddingHorizontal: 12 }}>
        <View className="pt-4">
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

            {error && (
              <View className="bg-red-50 border border-red-200 rounded-lg p-3">
                <Text className="text-red-600 text-sm">{error}</Text>
              </View>
            )}

            <View>
              <FormLabel text="객실명" required />
              <TextInput
                className="w-full h-12 px-4 rounded-lg border border-gray-200 text-sm mt-2"
                placeholder={PLACEHOLDERS.ROOM_NAME}
                placeholderTextColor={ROOM_TYPE_COLORS.PLACEHOLDER}
                value={roomName}
                onChangeText={(text) => {
                  setRoomName(text);
                  setError('');
                }}
              />
            </View>

            <View>
              <FormLabel text="객실 타입" required />
              <View className="gap-2 mt-2">
                {ROOM_TYPES.map((roomTypeOption) => (
                  <SelectButton
                    key={roomTypeOption.value}
                    label={roomTypeOption.label}
                    selected={roomType === roomTypeOption.value}
                    onPress={() => {
                      setRoomType(roomTypeOption.value as RoomType);
                      setError('');
                    }}
                    showCircle={true}
                    circleColor={roomTypeOption.color}
                  />
                ))}
              </View>
            </View>

            <View>
              <FormLabel text="객실 인원" required />
              <View className="flex-row gap-2 mt-2">
                {OCCUPANCY_OPTIONS.map((label) => (
                  <TouchableOpacity
                    key={label}
                    onPress={() => {
                      setOccupancy(label);
                      setError('');
                    }}
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

            <View>
              <FormLabel text="입실/퇴실 시간" required />
              <View className="flex-row items-center gap-2 mt-2">
                <View className="flex-1 gap-1">
                  <Text className="text-[#6a7282] text-xs">입실</Text>
                  <TimePickerField
                    value={checkInTime}
                    onChange={(time) => {
                      setCheckInTime(time);
                      setError('');
                    }}
                  />
                </View>
                <Text className="text-[#364153] text-base mt-5">~</Text>
                <View className="flex-1 gap-1">
                  <Text className="text-[#6a7282] text-xs">퇴실</Text>
                  <TimePickerField
                    value={checkOutTime}
                    onChange={(time) => {
                      setCheckOutTime(time);
                      setError('');
                    }}
                  />
                </View>
              </View>
            </View>

            <View>
              <FormLabel text="1박 가격" required />
              <View className="flex-row items-center w-full h-12 px-4 rounded-lg border border-gray-200 mt-2">
                <TextInput
                  className="flex-1 text-sm text-[#101828]"
                  placeholder={PLACEHOLDERS.ROOM_PRICE}
                  placeholderTextColor={ROOM_TYPE_COLORS.PLACEHOLDER}
                  keyboardType="numeric"
                  value={price}
                  onChangeText={(text) => {
                    setPrice(text);
                    setError('');
                  }}
                />
                <Text className="text-[#6a7282] text-sm ml-2">원</Text>
              </View>
            </View>

            <View>
              <FormLabel text="객실 사진" required />
              <Text className="text-[#697282] text-xs mt-1 mb-3">
                {FORM_DESCRIPTIONS.MAX_10_IMAGES}
              </Text>
              <MultiImagePicker
                selectedImageFiles={roomImages}
                setSelectedImageFiles={(files) => {
                  setRoomImages(files);
                  setError('');
                }}
                maxCount={VALIDATION_LIMITS.ROOM_IMAGES.MAX}
                error={false}
                clearError={() => setError('')}
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
            content={isEditMode ? BUTTON_LABELS.EDIT_ROOM : BUTTON_LABELS.ADD_ROOM_SUBMIT}
            onPress={handleAddRoom}
            className="mt-4"
          />
        </Flex>
      </ScrollView>
    </GuestHouseEnrollLayout>
  );
}
