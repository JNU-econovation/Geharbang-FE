import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import GuestHouseEnrollLayout from '@/app/guestHouse/enroll/_components/GuestHouseEnrollLayout';
import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import FormField from '@/src/components/ui/Form/FormField';
import MultiImagePicker from '@/src/components/ui/imagePicker/MultiImagePicker';
import TextInput from '@/src/components/ui/TextInput';
import TimePickerField from '@/src/components/ui/TimePickerField';
import { useGuestHousePartyValidation } from '@/src/hooks/guesthouse/useGuestHousePartyValidation';
import { useGuestHouseStore } from '@/src/stores/guestHouse/useGuestHouseStore';
import { File } from '@/src/types/File';
import {
  toggleInArray,
  toggleSingleSelect,
} from '@/src/utils/common/toggleUtils';

const PARTY_TYPES = ['술파티', '포틀럭', '디너 파티', '클럽 파티', '기타'];
const DAYS_OF_WEEK = ['월', '화', '수', '목', '금', '토', '일'];

export default function MakeParty() {
  const { editId } = useLocalSearchParams<{ editId?: string }>();
  const isEditMode = !!editId;

  const { addParty, updateParty, step2Data } = useGuestHouseStore();

  const [selectedPartyType, setSelectedPartyType] = useState<string>('');
  const [otherPartyType, setOtherPartyType] = useState<string>('');
  const [partyImages, setPartyImages] = useState<File[]>([]);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [partyLocation, setPartyLocation] = useState<string>('');
  const [partyMood, setPartyMood] = useState<string>('');
  const [allowExternal, setAllowExternal] = useState<boolean | null>(null);
  const [guestFee, setGuestFee] = useState<string>('');
  const [externalFee, setExternalFee] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (isEditMode && editId) {
      const existingParty = step2Data.parties.find((p) => p.id === editId);
      if (existingParty) {
        setSelectedPartyType(existingParty.type);
        setOtherPartyType(existingParty.customTypeName || '');
        setPartyImages(existingParty.images);
        setStartTime(existingParty.startTime);
        setEndTime(existingParty.endTime);
        setSelectedDays(existingParty.days);
        setPartyLocation(existingParty.location);
        setPartyMood(existingParty.mood);
        setAllowExternal(existingParty.allowExternal);
        setGuestFee(existingParty.guestFee);
        setExternalFee(existingParty.externalFee);
        setDescription(existingParty.description);
      }
    }
  }, [isEditMode, editId, step2Data.parties]);

  const partyData = {
    type: selectedPartyType,
    customTypeName: otherPartyType,
    images: partyImages,
    startTime,
    endTime,
    days: selectedDays,
    location: partyLocation,
    mood: partyMood,
    allowExternal,
    guestFee,
    externalFee,
    description,
  };

  const { errors, validateForm, clearError } =
    useGuestHousePartyValidation(partyData);

  const togglePartyType = (type: string) => {
    setSelectedPartyType(toggleSingleSelect(selectedPartyType, type));
    clearError('type');
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => toggleInArray(prev, day));
    clearError('days');
  };

  const handleNext = () => {
    if (validateForm()) {
      const partyPayload = {
        id: isEditMode ? editId : Date.now().toString(),
        type: selectedPartyType,
        customTypeName: otherPartyType,
        images: partyImages,
        startTime,
        endTime,
        days: selectedDays,
        location: partyLocation,
        mood: partyMood,
        allowExternal: allowExternal ?? false,
        guestFee,
        externalFee,
        description,
      };

      if (isEditMode && editId) {
        updateParty(editId, partyPayload);
      } else {
        addParty(partyPayload);
      }

      router.push('/guestHouse/enroll/step2');
    }
  };

  return (
    <GuestHouseEnrollLayout currentStep={2} stepTitle="파티 정보">
      <ScrollView
        className="bg-[#F9FAFB]"
        style={{ paddingTop: 16, paddingHorizontal: 12 }}
      >
        <View
          className="bg-white p-4 w-full rounded-lg"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          }}
        >
          <View className="flex-row justify-between items-center">
            <Text className="text-[#101828] text-[17px] font-bold">
              파티 정보
            </Text>
            <TouchableOpacity className="p-2" onPress={() => router.back()}>
              <Feather name="x" size={24} color="#101828" />
            </TouchableOpacity>
          </View>
          <View className="pt-2" />

          <View className="pt-5" style={{ gap: 5 }}>
            <FormField
              label="파티 종류"
              required={true}
              errorMessage={errors.type}
            >
              <View className="flex-row flex-wrap gap-2">
                {PARTY_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => togglePartyType(type)}
                    style={{ width: '48%' }}
                    className={`px-4 py-3 rounded-lg border ${
                      selectedPartyType === type
                        ? 'bg-sky-50 border-sky-500'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <Text
                      className={`text-sm text-center ${
                        selectedPartyType === type
                          ? 'text-sky-500 font-bold'
                          : 'text-[#364153]'
                      }`}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {selectedPartyType === '기타' && (
                <View className="mt-3">
                  <TextInput
                    value={otherPartyType}
                    onChangeText={(text) => {
                      setOtherPartyType(text);
                      clearError('customTypeName');
                    }}
                    placeholder="예: 테마 파티, 퀴즈 파티"
                    error={!!errors.customTypeName}
                  />
                </View>
              )}
            </FormField>

            <FormField
              label="파티 사진"
              required={true}
              description="최대 10장까지 등록할 수 있습니다"
              errorMessage={errors.images}
            >
              <MultiImagePicker
                selectedImageFiles={partyImages}
                setSelectedImageFiles={(files) => {
                  setPartyImages(files);
                  clearError('images');
                }}
                maxCount={10}
                error={!!errors.images}
                clearError={() => clearError('images')}
              />
            </FormField>

            <FormField
              label="파티 시간"
              required={true}
              errorMessage={errors.startTime || errors.endTime}
            >
              <Flex dir="row" items="center" gap={8}>
                <View className="flex-1">
                  <TimePickerField
                    value={startTime}
                    onChange={(time) => {
                      setStartTime(time);
                      clearError('startTime');
                    }}
                    error={!!errors.startTime}
                  />
                </View>
                <Text className="text-[#6a7282]">~</Text>
                <View className="flex-1">
                  <TimePickerField
                    value={endTime}
                    onChange={(time) => {
                      setEndTime(time);
                      clearError('endTime');
                    }}
                    error={!!errors.endTime}
                  />
                </View>
              </Flex>
            </FormField>

            <FormField
              label="진행일"
              required={true}
              description="중복 선택 가능"
              errorMessage={errors.days}
            >
              <View className="flex-row justify-between">
                {DAYS_OF_WEEK.map((day) => (
                  <TouchableOpacity
                    key={day}
                    onPress={() => toggleDay(day)}
                    className={`w-10 h-10 rounded-lg border justify-center items-center ${
                      selectedDays.includes(day)
                        ? 'bg-sky-50 border-sky-500'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <Text
                      className={`text-sm ${
                        selectedDays.includes(day)
                          ? 'text-sky-500 font-bold'
                          : 'text-[#364153]'
                      }`}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </FormField>

            <FormField
              label="파티 장소"
              required={true}
              errorMessage={errors.location}
            >
              <TextInput
                value={partyLocation}
                onChangeText={(text) => {
                  setPartyLocation(text);
                  clearError('location');
                }}
                placeholder="예: 1층 바 라운지"
                error={!!errors.location}
              />
            </FormField>

            <FormField
              label="파티 분위기"
              required={true}
              errorMessage={errors.mood}
            >
              <TextInput
                value={partyMood}
                onChangeText={(text) => {
                  setPartyMood(text);
                  clearError('mood');
                }}
                placeholder="예: 음악 / 술 / 소셜게임"
                error={!!errors.mood}
              />
            </FormField>

            <FormField
              label="외부인 참여 가능 여부"
              required={true}
              errorMessage={errors.allowExternal}
            >
              <Flex dir="row" gap={12}>
                <TouchableOpacity
                  onPress={() => {
                    setAllowExternal(false);
                    clearError('allowExternal');
                  }}
                  className={`flex-1 h-11 rounded-lg border justify-center items-center ${
                    allowExternal === false
                      ? 'bg-sky-50 border-sky-500'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <Text
                    className={`text-xs ${
                      allowExternal === false
                        ? 'text-sky-500 font-bold'
                        : 'text-[#364153]'
                    }`}
                  >
                    불가능 (숙박객 전용)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAllowExternal(true);
                    clearError('allowExternal');
                  }}
                  className={`flex-1 h-11 rounded-lg border justify-center items-center ${
                    allowExternal === true
                      ? 'bg-sky-50 border-sky-500'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <Text
                    className={`text-xs ${
                      allowExternal === true
                        ? 'text-sky-500 font-bold'
                        : 'text-[#364153]'
                    }`}
                  >
                    가능
                  </Text>
                </TouchableOpacity>
              </Flex>
            </FormField>

            <FormField
              label="파티비"
              required={true}
              errorMessage={errors.guestFee || errors.externalFee}
            >
              <View className="gap-3">
                <View>
                  <Text className="text-[#6a7282] text-xs mb-2">
                    숙박객 파티비
                  </Text>
                  <View className="flex-row items-center">
                    <TextInput
                      value={guestFee}
                      onChangeText={(text) => {
                        setGuestFee(text);
                        clearError('guestFee');
                      }}
                      placeholder="0"
                      keyboardType="numeric"
                      className="flex-1"
                      error={!!errors.guestFee}
                    />
                    <Text className="ml-2 text-[#6a7282] text-sm">원</Text>
                  </View>
                </View>
                <View>
                  <Text className="text-[#6a7282] text-xs mb-2">
                    외부인 파티비
                  </Text>
                  <View className="flex-row items-center">
                    <TextInput
                      value={externalFee}
                      onChangeText={(text) => {
                        setExternalFee(text);
                        clearError('externalFee');
                      }}
                      placeholder="0"
                      keyboardType="numeric"
                      className="flex-1"
                      error={!!errors.externalFee}
                    />
                    <Text className="ml-2 text-[#6a7282] text-sm">원</Text>
                  </View>
                </View>
              </View>
            </FormField>

            <FormField
              label="파티 설명"
              required={true}
              errorMessage={errors.description}
            >
              <TextInput
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  clearError('description');
                }}
                placeholder="파티에 대해 자유롭게 소개해주세요"
                multiline={true}
                height={120}
                error={!!errors.description}
              />
            </FormField>
          </View>
        </View>

        <Flex items="center">
          <Button
            variant="primary"
            width={360}
            height={50}
            textColor="white"
            content={isEditMode ? '파티 수정하기' : '파티 만들기'}
            onPress={handleNext}
            className="mt-4 mb-8"
          />
        </Flex>
      </ScrollView>
    </GuestHouseEnrollLayout>
  );
}
