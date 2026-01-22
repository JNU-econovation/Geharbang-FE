import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgUri } from 'react-native-svg';

import CustomSafeAreaView from '@/src/components/layout/CustomSafeAreaView';
import BackArrowHeader from '@/src/components/ui/BackArrowHeader';
import { useCertificateDetail } from '@/src/hooks/operator/useCertificateDetail';
import { downloadFile } from '@/src/utils/operator/fileOperations';

export default function AuthDetailScreen() {
  const { id } = useLocalSearchParams();

  // API 훅
  const { data, isLoading, isError } = useCertificateDetail(String(id));

  const handleBackPress = () => {
    router.back();
  };

  // API 데이터 또는 기본값 사용
  const certificateData = data || {
    guestHouseName: '바다뷰 게스트하우스',
    ownerName: '김제주',
    phoneNumber: '010-1234-5678',
    certificateType: '영업신고증',
    fileUrl: 'https://example.com/documents/business-license.pdf',
    fileName: '영업신고증.pdf',
  };

  const handleDownload = async () => {
    await downloadFile(certificateData.fileUrl, certificateData.fileName);
  };

  return (
    <CustomSafeAreaView pageColor="bg-white">
      <View className="p-3">
        <BackArrowHeader content="인증 신청 상세" onPress={handleBackPress} />
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0ea5e9" />
          <Text className="text-gray-500 text-sm mt-4">로딩 중...</Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1 bg-white"
          contentContainerStyle={{ padding: 20, gap: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full p-5 bg-white rounded-xl border border-gray-200 flex-col gap-4">
            <Text className="text-[#101828] text-base font-normal">
              기본 정보
            </Text>

            <View className="flex-col gap-4">
              <View className="flex-col gap-1">
                <Text className="text-gray-500 text-sm font-normal">
                  게스트하우스명
                </Text>
                <Text className="text-[#101828] text-base font-normal">
                  {certificateData.guestHouseName}
                </Text>
              </View>

              <View className="flex-col gap-1">
                <Text className="text-gray-500 text-sm font-normal">
                  대표자명
                </Text>
                <Text className="text-[#101828] text-base font-normal">
                  {certificateData.ownerName}
                </Text>
              </View>

              <View className="flex-col gap-1">
                <Text className="text-gray-500 text-sm font-normal">연락처</Text>
                <Text className="text-[#101828] text-base font-normal">
                  {certificateData.phoneNumber}
                </Text>
              </View>
            </View>
          </View>

        <View className="w-full p-5 bg-white rounded-xl border border-gray-200 flex-col gap-4">
          <Text className="text-[#101828] text-base font-normal">
            제출 서류
          </Text>

          <View className="flex-col gap-2">
            <Text className="text-gray-500 text-sm font-normal">서류 종류</Text>
            <View className="self-start px-3 py-1.5 bg-sky-50 rounded-lg border border-sky-500">
              <Text className="text-sky-600 text-sm font-normal">
                {certificateData.certificateType}
              </Text>
            </View>
          </View>

          <View className="flex-col gap-2">
            <Text className="text-gray-500 text-sm font-normal">서류 파일</Text>

            <View className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
              <View className="w-full bg-gray-50 p-6 items-center justify-center gap-4">
                <View className="w-16 h-16 bg-[#ffe2e2] rounded-2xl items-center justify-center">
                  <SvgUri
                    width={32}
                    height={32}
                    uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-34ca47f0-2b7c-4a74-82e4-0c4b2c3d5ad9.svg"
                  />
                </View>

                <View className="items-center">
                  <Text className="text-[#101828] text-base font-normal mb-1">
                    {certificateData.fileName}
                  </Text>
                  <Text className="text-gray-500 text-sm font-normal">
                    PDF 파일
                  </Text>
                </View>

                <TouchableOpacity
                  className="w-full flex-row items-center justify-center h-[44px] bg-sky-500 rounded-lg gap-2 mt-2"
                  onPress={handleDownload}
                >
                  <SvgUri
                    width={14}
                    height={14}
                    uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-c4663120-0d4f-49a2-9485-2705f50f65f0.svg"
                  />
                  <Text className="text-white text-sm font-normal">
                    다운로드
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        </ScrollView>
      )}
    </CustomSafeAreaView>
  );
}
