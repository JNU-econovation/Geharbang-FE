import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

import CustomSafeAreaView from '@/src/components/layout/CustomSafeAreaView';
import BackArrowHeader from '@/src/components/ui/BackArrowHeader';
import Button from '@/src/components/ui/Button/Button';
import CustomTextInput from '@/src/components/ui/TextInput';

export default function OperatorAuthScreen() {
  const handleBackPress = () => {
    router.back();
  };

  const handleSubmit = () => {
    router.push('/operator/result' as any);
  };

  return (
    <CustomSafeAreaView pageColor="bg-white">
      <View className="p-3">
        <BackArrowHeader content="운영자 인증하기" onPress={handleBackPress} />
      </View>

      <ScrollView
        className="flex-1 bg-gray-50"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full px-4 pt-4 flex-col justify-start items-center gap-4">
          <View className="w-full h-[115.96px] px-[16.75px] pt-[16.75px] pb-[0.75px] bg-sky-50 rounded-[14px] border border-[#b8e6fe] flex-col justify-start items-start">
            <View className="w-full h-[82.46px] flex-row justify-start items-start gap-3">
              <SvgUri
                width={20}
                height={20}
                uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-af309ae3-0cae-4192-942d-d276f6895bfa.svg"
              />
              <View className="flex-1 h-[82.46px] flex-col justify-start items-start gap-1">
                <View className="h-5 justify-start items-center flex-row">
                  <Text className="text-[#024a70] text-sm font-normal leading-5">
                    운영자 인증이 필요합니다
                  </Text>
                </View>
                <View className="h-[58.47px] justify-start items-center flex-row">
                  <Text className="text-[#0068a8] text-xs font-normal leading-5">
                    사업자등록증 또는 관광숙박업 신고증을 제출하시면, 관리자
                    검토 후 승인됩니다.{'\n'}(평균 1-2일 소요)
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="w-full h-[160.97px] px-4 pt-4 bg-white rounded-[14px] flex-col justify-start items-start gap-3">
            <View className="h-[29.99px] justify-start items-start gap-1 flex-row">
              <Text className="text-[#101727] text-base font-normal leading-[30px]">
                증빙 서류 종류
              </Text>
              <Text className="text-[#fa2b36] text-xl font-normal leading-[30px]">
                *
              </Text>
            </View>

            <View className="w-full h-[86.99px] flex-row justify-start gap-3">
              <TouchableOpacity className="flex-1 h-[86.99px] p-[1.51px] bg-sky-50 rounded-[10px] border-2 border-[#00a6f4] justify-center items-center">
                <View className="w-full h-[83.98px] justify-center items-center gap-2">
                  <SvgUri
                    width={24}
                    height={24}
                    uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-8772f5e1-6fb9-40ed-bb6f-924d77d12ec1.svg"
                  />
                  <View className="h-5 justify-center items-center">
                    <Text className="text-center text-[#024a70] text-sm font-normal leading-5">
                      사업자등록증
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 h-[86.99px] p-[1.51px] bg-white rounded-[10px] border-2 border-gray-200 justify-center items-center">
                <View className="w-full h-[83.98px] justify-center items-center gap-2">
                  <SvgUri
                    width={24}
                    height={24}
                    uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-610d2f86-5ff4-4b16-b673-e4a497e592ec.svg"
                  />
                  <View className="h-5 justify-center items-center">
                    <Text className="text-center text-[#364153] text-sm font-normal leading-5">
                      관광숙박업 신고증
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-full h-[208.97px] px-4 pt-4 bg-white rounded-[14px] flex-col justify-start items-start gap-3">
            <View className="h-6 justify-start items-start gap-1 flex-row">
              <Text className="text-[#101727] text-base font-normal leading-6">
                서류 업로드
              </Text>
              <Text className="text-[#fa2b36] text-base font-normal leading-6">
                *
              </Text>
            </View>

            <TouchableOpacity className="w-full h-[140.99px] bg-sky-50 rounded-[10px] border-2 border-[#00a6f4] justify-center items-center relative">
              <View className="mb-2">
                <SvgUri
                  width={32}
                  height={32}
                  uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-18b4a31f-e3f7-405f-a834-2a21c0db2e7c.svg"
                />
              </View>
              <View className="h-5 justify-center items-center mb-1">
                <Text className="text-[#101727] text-sm font-normal leading-5">
                  첨부 1. 사업등록증.pdf
                </Text>
              </View>
              <View className="h-4 justify-start items-start">
                <Text className="text-[#697282] text-xs font-normal leading-4">
                  클릭하여 다시 선택
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="w-full px-4 pt-4 pb-4 bg-white rounded-[14px] flex-col justify-start items-start gap-4 mb-8">
            <View className="h-6 justify-start items-center flex-row">
              <Text className="text-[#101727] text-base font-normal leading-6">
                사업자 정보
              </Text>
            </View>

            <View className="w-full flex-col justify-start items-start gap-2">
              <View className="h-5 flex-row items-center">
                <Text className="text-[#354152] text-sm font-normal leading-5">
                  게스트하우스 이름
                </Text>
                <Text className="text-[#fb2c36] text-sm font-normal leading-5">
                  *
                </Text>
              </View>
              <CustomTextInput
                placeholder="예 : 제주 푸른 게스트하우스"
                height={45.49}
              />
            </View>

            <View className="w-full flex-col justify-start items-start gap-2">
              <View className="h-5 flex-row items-center">
                <Text className="text-[#354152] text-sm font-normal leading-5">
                  대표자명
                </Text>
                <Text className="text-[#fb2c36] text-sm font-normal leading-5">
                  *
                </Text>
              </View>
              <CustomTextInput placeholder="예 : 홍길동" height={45.49} />
            </View>

            <View className="w-full flex-col justify-start items-start gap-2">
              <View className="h-5 flex-row items-center">
                <Text className="text-[#354152] text-sm font-normal leading-5">
                  연락처{' '}
                </Text>
                <Text className="text-[#fb2c36] text-sm font-normal leading-5">
                  *
                </Text>
              </View>
              <CustomTextInput
                placeholder="예 : 010-1234-5678"
                keyboardType="phone-pad"
                height={45.49}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="w-full px-6 py-4 bg-white border-t border-gray-200">
        <Button
          variant="primary"
          height={52}
          textColor="white"
          content="운영자 인증하기"
          onPress={handleSubmit}
          className="w-full"
        />
      </View>
    </CustomSafeAreaView>
  );
}
