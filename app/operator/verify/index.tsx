import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

import SubmitSuccessModal from '@/app/operator/_components/SubmitSuccessModal';
import CustomSafeAreaView from '@/src/components/layout/CustomSafeAreaView';
import BackArrowHeader from '@/src/components/ui/BackArrowHeader';
import Button from '@/src/components/ui/Button/Button';
import CustomTextInput from '@/src/components/ui/TextInput';
import { File } from '@/src/types/File';

type DocumentType = 'business' | 'tourism';

export default function OperatorAuthScreen() {
  const [guestHouseName, setGuestHouseName] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [documentType, setDocumentType] = useState<DocumentType>('business');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [errors, setErrors] = useState({
    guestHouseName: '',
    representativeName: '',
    phoneNumber: '',
    uploadedFile: '',
  });

  const handleBackPress = () => {
    router.back();
  };

  const handleDocumentTypeSelect = (type: DocumentType) => {
    setDocumentType(type);
    setUploadedFile(null);
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type:
          documentType === 'business'
            ? 'application/pdf'
            : ['application/pdf', 'image/jpeg', 'image/png'],
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];

      const maxSize = 10 * 1024 * 1024;
      if (file.size && file.size > maxSize) {
        Alert.alert('오류', '파일 크기는 최대 10MB까지 업로드 가능합니다.');
        return;
      }

      const uploadedFileData: File = {
        uri: file.uri,
        type: file.mimeType || 'application/pdf',
        name: file.name,
      };

      setUploadedFile(uploadedFileData);
    } catch (error) {
      Alert.alert('오류', '파일 업로드 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = () => {
    const newErrors = {
      guestHouseName: '',
      representativeName: '',
      phoneNumber: '',
      uploadedFile: '',
    };

    let hasError = false;

    if (!guestHouseName.trim()) {
      newErrors.guestHouseName = '게스트하우스 이름을 입력해주세요.';
      hasError = true;
    }
    if (!representativeName.trim()) {
      newErrors.representativeName = '대표자명을 입력해주세요.';
      hasError = true;
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = '연락처를 입력해주세요.';
      hasError = true;
    }
    // if (!uploadedFile) {
    //   newErrors.uploadedFile = '서류를 업로드해주세요.';
    //   hasError = true;
    // }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    // TODO: API 호출
    console.log({
      guestHouseName,
      representativeName,
      phoneNumber,
      documentType,
      uploadedFile,
    });

    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);

    router.replace('/');
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

          {/* 증빙 서류 종류 선택 */}
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
              <TouchableOpacity
                className={`flex-1 h-[86.99px] p-[1.51px] rounded-[10px] border-2 justify-center items-center ${
                  documentType === 'business'
                    ? 'bg-sky-50 border-[#00a6f4]'
                    : 'bg-white border-gray-200'
                }`}
                onPress={() => handleDocumentTypeSelect('business')}
              >
                <View className="w-full h-[83.98px] justify-center items-center gap-2">
                  <SvgUri
                    width={24}
                    height={24}
                    uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-8772f5e1-6fb9-40ed-bb6f-924d77d12ec1.svg"
                  />
                  <View className="h-5 justify-center items-center">
                    <Text
                      className={`text-center text-sm font-normal leading-5 ${
                        documentType === 'business'
                          ? 'text-[#024a70]'
                          : 'text-[#364153]'
                      }`}
                    >
                      사업자등록증
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 h-[86.99px] p-[1.51px] rounded-[10px] border-2 justify-center items-center ${
                  documentType === 'tourism'
                    ? 'bg-sky-50 border-[#00a6f4]'
                    : 'bg-white border-gray-200'
                }`}
                onPress={() => handleDocumentTypeSelect('tourism')}
              >
                <View className="w-full h-[83.98px] justify-center items-center gap-2">
                  <SvgUri
                    width={24}
                    height={24}
                    uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-610d2f86-5ff4-4b16-b673-e4a497e592ec.svg"
                  />
                  <View className="h-5 justify-center items-center">
                    <Text
                      className={`text-center text-sm font-normal leading-5 ${
                        documentType === 'tourism'
                          ? 'text-[#024a70]'
                          : 'text-[#364153]'
                      }`}
                    >
                      관광숙박업 신고증
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-full px-4 pt-4 bg-white rounded-[14px] flex-col justify-start items-start gap-3 pb-4">
            <View className="h-6 justify-start items-start gap-1 flex-row">
              <Text className="text-[#101727] text-base font-normal leading-6">
                서류 업로드
              </Text>
              <Text className="text-[#fa2b36] text-base font-normal leading-6">
                *
              </Text>
            </View>

            <TouchableOpacity
              className={`w-full h-[140.99px] rounded-[10px] border-2 justify-center items-center ${
                errors.uploadedFile
                  ? 'bg-gray-50 border-red-500'
                  : uploadedFile
                  ? 'bg-sky-50 border-[#00a6f4]'
                  : 'bg-gray-50 border-gray-300 border-dashed'
              }`}
              onPress={handleFileUpload}
            >
              {uploadedFile ? (
                <>
                  <View className="mb-2">
                    <SvgUri
                      width={32}
                      height={32}
                      uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-18b4a31f-e3f7-405f-a834-2a21c0db2e7c.svg"
                    />
                  </View>
                  <View className="h-5 justify-center items-center mb-1">
                    <Text className="text-[#101727] text-sm font-normal leading-5">
                      {uploadedFile.name}
                    </Text>
                  </View>
                  <View className="h-4 justify-start items-start">
                    <Text className="text-[#697282] text-xs font-normal leading-4">
                      클릭하여 다시 선택
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  {documentType === 'business' ? (
                    <>
                      <View className="mb-2">
                        <SvgUri
                          width={32}
                          height={32}
                          uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-18b4a31f-e3f7-405f-a834-2a21c0db2e7c.svg"
                        />
                      </View>
                      <View className="h-5 justify-center items-center mb-1">
                        <Text className="text-[#697282] text-sm font-normal leading-5">
                          PDF 파일을 선택해주세요
                        </Text>
                      </View>
                      <View className="h-4 justify-start items-start">
                        <Text className="text-[#99a1af] text-xs font-normal leading-4">
                          PDF (최대 10MB)
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <View className="mb-2">
                        <SvgUri
                          width={32}
                          height={32}
                          uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-18b4a31f-e3f7-405f-a834-2a21c0db2e7c.svg"
                        />
                      </View>
                      <View className="h-5 justify-center items-center mb-1">
                        <Text className="text-[#697282] text-sm font-normal leading-5">
                          파일을 선택하거나 드래그하세요
                        </Text>
                      </View>
                      <View className="h-4 justify-start items-start">
                        <Text className="text-[#99a1af] text-xs font-normal leading-4">
                          JPG, PNG, PDF (최대 10MB)
                        </Text>
                      </View>
                    </>
                  )}
                </>
              )}
            </TouchableOpacity>
            {errors.uploadedFile && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.uploadedFile}
              </Text>
            )}
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
                value={guestHouseName}
                onChangeText={setGuestHouseName}
                error={!!errors.guestHouseName}
                className="w-full"
              />
              {errors.guestHouseName && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.guestHouseName}
                </Text>
              )}
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
              <CustomTextInput
                placeholder="예 : 홍길동"
                height={45.49}
                value={representativeName}
                onChangeText={setRepresentativeName}
                error={!!errors.representativeName}
                className="w-full"
              />
              {errors.representativeName && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.representativeName}
                </Text>
              )}
            </View>

            <View className="w-full flex-col justify-start items-start gap-2">
              <View className="h-5 flex-row items-center">
                <Text className="text-[#354152] text-sm font-normal leading-5">
                  연락처
                </Text>
                <Text className="text-[#fb2c36] text-sm font-normal leading-5">
                  *
                </Text>
              </View>
              <CustomTextInput
                placeholder="예 : 010-1234-5678"
                keyboardType="phone-pad"
                height={45.49}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                error={!!errors.phoneNumber}
                className="w-full"
              />
              {errors.phoneNumber && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber}
                </Text>
              )}
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

      {/* 제출 성공 모달 */}
      <SubmitSuccessModal visible={isModalVisible} onClose={handleModalClose} />
    </CustomSafeAreaView>
  );
}
