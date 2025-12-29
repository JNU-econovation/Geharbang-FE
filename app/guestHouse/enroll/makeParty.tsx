import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import GuestHouseEnrollLayout from '@/app/guestHouse/enroll/_components/GuestHouseEnrollLayout';
import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import FormField from '@/src/components/ui/Form/FormField';
import FormSection from '@/src/components/ui/Form/FormSection';
import MultiImagePicker from '@/src/components/ui/imagePicker/MultiImagePicker';
import TextInput from '@/src/components/ui/TextInput';
import TimePickerField from '@/src/components/ui/TimePickerField';
import { File } from '@/src/types/models/common/File';

const PARTY_TYPES = ['술파티', '포틀럭', '디너 파티', '클럽 파티', '기타'];
const DAYS_OF_WEEK = ['월', '화', '수', '목', '금', '토', '일'];

export default function MakeParty() {
  const [selectedPartyType, setSelectedPartyType] = useState<string>('');
  const [otherPartyType, setOtherPartyType] = useState<string>('');
  const [partyImages, setPartyImages] = useState<File[]>([]);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [partyLocation, setPartyLocation] = useState<string>('');
  const [partyMood, setPartyMood] = useState<string>('');
  const [allowExternal, setAllowExternal] = useState<boolean>(false);
  const [guestFee, setGuestFee] = useState<string>('');
  const [externalFee, setExternalFee] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const togglePartyType = (type: string) => {
    setSelectedPartyType(selectedPartyType === type ? '' : type);
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleNext = () => {
    // TODO: 유효성 검사 추가
    router.push('/guestHouse/enroll/step3');
  };

  return (
    <GuestHouseEnrollLayout currentStep={2} stepTitle="파티 정보">
      <ScrollView
        className="bg-[#F9FAFB]"
        style={{ paddingTop: 16, paddingHorizontal: 12 }}
      >
        <FormSection title="파티 정보">
          <FormField label="파티 종류" required={true}>
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
                  onChangeText={setOtherPartyType}
                  placeholder="예: 테마 파티, 퀴즈 파티"
                />
              </View>
            )}
          </FormField>

          <FormField
            label="파티 사진"
            required={true}
            description="최대 10장까지 등록할 수 있습니다"
          >
            <MultiImagePicker
              selectedImageFiles={partyImages}
              setSelectedImageFiles={setPartyImages}
              maxCount={10}
              error={false}
              clearError={() => {}}
            />
          </FormField>

          <FormField label="파티 시간" required={true}>
            <Flex dir="row" items="center" gap={8}>
              <View className="flex-1">
                <TimePickerField
                  value={startTime}
                  onChange={setStartTime}
                  error={false}
                />
              </View>
              <Text className="text-[#6a7282]">~</Text>
              <View className="flex-1">
                <TimePickerField
                  value={endTime}
                  onChange={setEndTime}
                  error={false}
                />
              </View>
            </Flex>
          </FormField>

          <FormField
            label="진행일"
            required={true}
            description="중복 선택 가능"
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

          <FormField label="파티 장소" required={true}>
            <TextInput
              value={partyLocation}
              onChangeText={setPartyLocation}
              placeholder="예: 1층 바 라운지"
            />
          </FormField>

          <FormField label="파티 분위기" required={true}>
            <TextInput
              value={partyMood}
              onChangeText={setPartyMood}
              placeholder="예: 음악 / 술 / 소셜게임"
            />
          </FormField>

          <FormField label="외부인 참여 가능 여부" required={true}>
            <Flex dir="row" gap={12}>
              <TouchableOpacity
                onPress={() => setAllowExternal(false)}
                className={`flex-1 h-11 rounded-lg border justify-center items-center ${
                  !allowExternal
                    ? 'bg-sky-50 border-sky-500'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Text
                  className={`text-xs ${
                    !allowExternal ? 'text-sky-500 font-bold' : 'text-[#364153]'
                  }`}
                >
                  불가능 (숙박객 전용)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAllowExternal(true)}
                className={`flex-1 h-11 rounded-lg border justify-center items-center ${
                  allowExternal
                    ? 'bg-sky-50 border-sky-500'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Text
                  className={`text-xs ${
                    allowExternal ? 'text-sky-500 font-bold' : 'text-[#364153]'
                  }`}
                >
                  가능
                </Text>
              </TouchableOpacity>
            </Flex>
          </FormField>

          <FormField label="파티비" required={true}>
            <View className="gap-3">
              <View>
                <Text className="text-[#6a7282] text-xs mb-2">
                  숙박객 파티비
                </Text>
                <View className="flex-row items-center">
                  <TextInput
                    value={guestFee}
                    onChangeText={setGuestFee}
                    placeholder="0"
                    keyboardType="numeric"
                    className="flex-1"
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
                    onChangeText={setExternalFee}
                    placeholder="0"
                    keyboardType="numeric"
                    className="flex-1"
                  />
                  <Text className="ml-2 text-[#6a7282] text-sm">원</Text>
                </View>
              </View>
            </View>
          </FormField>

          <FormField label="파티 설명" required={true}>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="파티에 대해 자유롭게 소개해주세요"
              multiline={true}
              height={120}
            />
          </FormField>
        </FormSection>

        <Flex items="center">
          <Button
            variant="primary"
            width={360}
            height={50}
            textColor="white"
            content="파티 만들기"
            onPress={handleNext}
            className="mt-4 mb-8"
          />
        </Flex>
      </ScrollView>
    </GuestHouseEnrollLayout>
  );
}
