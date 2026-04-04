import Flex from "@/src/components/layout/Flex/Flex";
import Button from "@/src/components/ui/Button/Button";
import MultiImagePicker from "@/src/components/ui/imagePicker/MultiImagePicker";
import TimePickerField from "@/src/components/ui/TimePickerField";
import { useGuestHouseStep4Validation } from "@/src/hooks/guestHouse/useGuestHouseStep4Validation";
import { useGuestHouseStore } from "@/src/stores/guestHouse/useGuestHouseStore";
import { File } from "@/src/types/File";
import {
  BUTTON_LABELS,
  FORM_DESCRIPTIONS,
  OCCUPANCY_OPTIONS,
  PLACEHOLDERS,
  ROOM_TYPE_COLORS,
  ROOM_TYPES,
  VALIDATION_LIMITS,
} from "@/src/utils/constants/guestHouseEnrollment";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import GuestHouseEnrollLayout from "./_components/GuestHouseEnrollLayout";

const FormLabel = ({
  text,
  required,
}: {
  text: string;
  required?: boolean;
}) => (
  <View className='flex-row items-center'>
    <Text className='text-gray-text text-[13px] font-medium'>{text}</Text>
    {required && <Text className='text-primary-red text-[13px] ml-1'>*</Text>}
  </View>
);

type RoomType = "여성 전용 도미토리" | "남성 전용 도미토리";
type Occupancy = "1인실" | "2인실" | "3인이상";

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
      selected ? "bg-sky-50 border-sky-500" : "bg-white border-gray-200"
    }`}
  >
    <View className='flex-row items-center gap-2'>
      {showCircle && circleColor && (
        <View
          className='w-2 h-2 rounded-full'
          style={{ backgroundColor: circleColor }}
        />
      )}
      <Text
        className={`text-sm ${
          selected ? "text-sky-500 font-medium" : "text-[#364153]"
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

  const { addRoom, updateRoom, step4Data } = useGuestHouseStore();

  const scrollViewRef = useRef<ScrollView>(null);
  const fieldRefs = {
    name: useRef<View>(null),
    type: useRef<View>(null),
    occupancy: useRef<View>(null),
    checkInTime: useRef<View>(null),
    price: useRef<View>(null),
    images: useRef<View>(null),
  };

  const getDefaultCheckInTime = () => {
    const date = new Date();
    date.setHours(15, 0, 0, 0);
    return date;
  };

  const getDefaultCheckOutTime = () => {
    const date = new Date();
    date.setHours(11, 0, 0, 0);
    return date;
  };

  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState<RoomType | null>(null);
  const [occupancy, setOccupancy] = useState<Occupancy | null>(null);
  const [checkInTime, setCheckInTime] = useState(getDefaultCheckInTime());
  const [checkOutTime, setCheckOutTime] = useState(getDefaultCheckOutTime());
  const [price, setPrice] = useState("");
  const [roomImages, setRoomImages] = useState<File[]>([]);

  useEffect(() => {
    if (isEditMode && editId) {
      const existingRoom = step4Data.rooms.find((r) => r.id === editId);
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
  }, [isEditMode, editId, step4Data.rooms]);

  const roomData = {
    id: "",
    name: roomName,
    type: roomType || ("여성 전용 도미토리" as RoomType),
    occupancy: occupancy || ("1인실" as Occupancy),
    checkInTime,
    checkOutTime,
    price,
    images: roomImages,
  };

  const { roomErrors, clearRoomError, validateRoomField, validateRoomForm } =
    useGuestHouseStep4Validation({ rooms: [roomData] });

  const scrollToFirstError = (errors: typeof roomErrors) => {
    const fieldOrder = [
      "name",
      "type",
      "occupancy",
      "checkInTime",
      "price",
      "images",
    ] as const;

    setTimeout(() => {
      const firstErrField = fieldOrder.find((k) => !!errors[k]);
      const targetRef = firstErrField ? fieldRefs[firstErrField] : null;

      if (targetRef?.current && scrollViewRef.current) {
        targetRef.current.measureLayout(
          scrollViewRef.current as any,
          (_x: number, y: number) =>
            scrollViewRef.current?.scrollTo({
              y: Math.max(0, y - 16),
              animated: true,
            }),
          () => scrollViewRef.current?.scrollTo({ y: 0, animated: true }),
        );
      } else {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }
    }, 100);
  };

  const handleAddRoom = () => {
    const validationData = {
      ...roomData,
      type: roomType,
      occupancy: occupancy,
    };

    const isValid = validateRoomForm(validationData as any);
    if (!isValid) {
      scrollToFirstError(roomErrors);
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

    router.push("/guestHouse/enroll/step4");
  };

  const resetForm = () => {
    setRoomName("");
    setRoomType(null);
    setOccupancy(null);
    setCheckInTime(getDefaultCheckInTime());
    setCheckOutTime(getDefaultCheckOutTime());
    setPrice("");
    setRoomImages([]);
  };

  const handleBackPress = () => {
    if (!isEditMode) resetForm();
    router.push("/guestHouse/enroll/step4");
  };

  const handleClose = () => {
    if (!isEditMode) resetForm();
    router.push("/guestHouse/enroll/step4");
  };

  return (
    <GuestHouseEnrollLayout currentStep={4} stepTitle='객실 타입 등록'>
      <ScrollView
        ref={scrollViewRef}
        className='bg-[#F9FAFB]'
        style={{ paddingHorizontal: 12 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className='pt-4'>
          <View className='bg-white rounded-xl shadow-sm p-6 gap-6'>
            <View className='flex-row justify-between items-center mb-2'>
              <Text className='text-[#101828] text-lg font-bold'>
                객실타입추가
              </Text>
              <TouchableOpacity className='p-2' onPress={handleClose}>
                <Feather name='x' size={24} color='#101828' />
              </TouchableOpacity>
            </View>

            {/* 객실명 */}
            <View ref={fieldRefs.name}>
              <FormLabel text='객실명' required />
              <TextInput
                className={`w-full h-12 px-4 rounded-lg border text-sm mt-2 ${
                  roomErrors.name ? "border-red-500" : "border-gray-200"
                }`}
                placeholder={PLACEHOLDERS.ROOM_NAME}
                placeholderTextColor={ROOM_TYPE_COLORS.PLACEHOLDER}
                value={roomName}
                onChangeText={(text) => setRoomName(text)}
                onFocus={() => clearRoomError("name")}
                onBlur={() =>
                  validateRoomField({ ...roomData, name: roomName }, "name")
                }
              />
              {roomErrors.name && (
                <Text className='text-red-500 text-xs mt-1'>
                  {roomErrors.name}
                </Text>
              )}
            </View>

            {/* 객실 타입 */}
            <View ref={fieldRefs.type}>
              <FormLabel text='객실 타입' required />
              <View className='gap-2 mt-2'>
                {ROOM_TYPES.map((roomTypeOption) => (
                  <SelectButton
                    key={roomTypeOption.value}
                    label={roomTypeOption.label}
                    selected={roomType === roomTypeOption.value}
                    onPress={() => {
                      setRoomType(roomTypeOption.value as RoomType);
                      clearRoomError("type");
                    }}
                    showCircle={true}
                    circleColor={roomTypeOption.color}
                  />
                ))}
              </View>
              {roomErrors.type && (
                <Text className='text-red-500 text-xs mt-1'>
                  {roomErrors.type}
                </Text>
              )}
            </View>

            {/* 객실 인원 */}
            <View ref={fieldRefs.occupancy}>
              <FormLabel text='객실 인원' required />
              <View className='flex-row gap-2 mt-2'>
                {OCCUPANCY_OPTIONS.map((label) => (
                  <TouchableOpacity
                    key={label}
                    onPress={() => {
                      setOccupancy(label);
                      clearRoomError("occupancy");
                    }}
                    className={`flex-1 h-11 rounded-lg border justify-center items-center ${
                      occupancy === label
                        ? "bg-sky-50 border-sky-500"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-sm ${
                        occupancy === label
                          ? "text-sky-500 font-medium"
                          : "text-[#364153]"
                      }`}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {roomErrors.occupancy && (
                <Text className='text-red-500 text-xs mt-1'>
                  {roomErrors.occupancy}
                </Text>
              )}
            </View>

            {/* 입실/퇴실 시간 */}
            <View ref={fieldRefs.checkInTime}>
              <FormLabel text='입실/퇴실 시간' required />
              <View className='flex-row items-center gap-2 mt-2'>
                <View className='flex-1 gap-1'>
                  <Text className='text-[#6a7282] text-xs'>입실</Text>
                  <TimePickerField
                    value={checkInTime}
                    onChange={(time) => {
                      setCheckInTime(time);
                      clearRoomError("checkInTime");
                    }}
                    error={!!roomErrors.checkInTime}
                  />
                </View>
                <Text className='text-[#364153] text-base mt-5'>~</Text>
                <View className='flex-1 gap-1'>
                  <Text className='text-[#6a7282] text-xs'>퇴실</Text>
                  <TimePickerField
                    value={checkOutTime}
                    onChange={(time) => {
                      setCheckOutTime(time);
                      clearRoomError("checkOutTime");
                    }}
                    error={!!roomErrors.checkOutTime}
                  />
                </View>
              </View>
              {(roomErrors.checkInTime || roomErrors.checkOutTime) && (
                <Text className='text-red-500 text-xs mt-1'>
                  {roomErrors.checkInTime || roomErrors.checkOutTime}
                </Text>
              )}
            </View>

            {/* 1박 가격 */}
            <View ref={fieldRefs.price}>
              <FormLabel text='1박 가격' required />
              <View
                className={`flex-row items-center w-full h-12 px-4 rounded-lg border mt-2 ${
                  roomErrors.price ? "border-red-500" : "border-gray-200"
                }`}
              >
                <TextInput
                  className='flex-1 text-sm text-[#101828]'
                  placeholder={PLACEHOLDERS.ROOM_PRICE}
                  placeholderTextColor={ROOM_TYPE_COLORS.PLACEHOLDER}
                  keyboardType='numeric'
                  value={price}
                  onChangeText={(text) => setPrice(text)}
                  onFocus={() => clearRoomError("price")}
                  onBlur={() =>
                    validateRoomField({ ...roomData, price }, "price")
                  }
                />
                <Text className='text-[#6a7282] text-sm ml-2'>원</Text>
              </View>
              {roomErrors.price && (
                <Text className='text-red-500 text-xs mt-1'>
                  {roomErrors.price}
                </Text>
              )}
            </View>

            {/* 객실 사진 */}
            <View ref={fieldRefs.images}>
              <FormLabel text='객실 사진' required />
              <Text className='text-[#697282] text-xs mt-1 mb-3'>
                {FORM_DESCRIPTIONS.MAX_10_IMAGES}
              </Text>
              <MultiImagePicker
                selectedImageFiles={roomImages}
                setSelectedImageFiles={(files) => {
                  setRoomImages(files);
                  clearRoomError("images");
                }}
                maxCount={VALIDATION_LIMITS.ROOM_IMAGES.MAX}
                error={!!roomErrors.images}
                clearError={() => clearRoomError("images")}
              />
              {roomErrors.images && (
                <Text className='text-red-500 text-xs mt-1'>
                  {roomErrors.images}
                </Text>
              )}
            </View>
          </View>
        </View>
        <Flex items='center'>
          <Button
            variant='primary'
            width={360}
            height={50}
            textColor='white'
            content={
              isEditMode
                ? BUTTON_LABELS.EDIT_ROOM
                : BUTTON_LABELS.ADD_ROOM_SUBMIT
            }
            onPress={handleAddRoom}
            className='mt-4'
          />
        </Flex>
      </ScrollView>
    </GuestHouseEnrollLayout>
  );
}
