import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

import DocumentTypeSelector from '@/app/operator/verify/_components/DocumentTypeSelector';
import SubmitSuccessModal from '@/app/operator/verify/_components/SubmitSuccessModal';
import CustomSafeAreaView from '@/src/components/layout/CustomSafeAreaView';
import BackArrowHeader from '@/src/components/ui/BackArrowHeader';
import Button from '@/src/components/ui/Button/Button';
import CustomTextInput from '@/src/components/ui/TextInput';
import { useSubmitCertificate } from '@/src/hooks/operator/useSubmitCertificate';
import { useUploadCertificateFile } from '@/src/hooks/operator/useUploadCertificateFile';
import { File } from '@/src/types/File';
import { mapCertificateTypeToApi } from '@/src/types/operator';
import { formatPhoneNumber } from '@/src/utils/common/phoneNumberFormatter';
import { uploadDocument } from '@/src/utils/operator/documentUpload';
import { validateOperatorVerify } from '@/src/utils/operator/operatorVerifyValidation';

type DocumentType = 'business' | 'tourism' | null;

export default function OperatorAuthScreen() {
  const [guestHouseName, setGuestHouseName] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [documentType, setDocumentType] = useState<DocumentType>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [errors, setErrors] = useState({
    documentType: '',
    guestHouseName: '',
    representativeName: '',
    phoneNumber: '',
    uploadedFile: '',
  });

  const uploadFileMutation = useUploadCertificateFile();
  const submitCertificateMutation = useSubmitCertificate();

  const handleBackPress = () => {
    router.back();
  };

  const handleDocumentTypeSelect = (type: 'business' | 'tourism') => {
    setDocumentType(type);
  };

  const handleFileUpload = async () => {
    if (!documentType) return;
    const file = await uploadDocument(documentType);
    if (file) {
      setUploadedFile(file);
    }
  };

  const handlePhoneNumberChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  const handleSubmit = async () => {
    const { isValid, errors: validationErrors } = validateOperatorVerify({
      documentType,
      guestHouseName,
      representativeName,
      phoneNumber,
      uploadedFile,
    });

    setErrors(validationErrors);

    if (!isValid || !uploadedFile || !documentType) {
      return;
    }

    try {
      const fileExtension = uploadedFile.name.split('.').pop() || 'pdf';
      const uploadResult = await uploadFileMutation.mutateAsync({
        file: uploadedFile,
        fileType: fileExtension,
        fileName: uploadedFile.name,
      });

      await submitCertificateMutation.mutateAsync({
        certificateType: mapCertificateTypeToApi(documentType),
        guestHouseName,
        ownerName: representativeName,
        phoneNumber,
        fileUrl: uploadResult.fileUrl,
      });

      setIsModalVisible(true);
    } catch (error) {
      console.error('인증서 제출 실패:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    router.replace('/');
  };

  return (
    <CustomSafeAreaView pageColor="bg-white">
      <View className="p-3">
        <BackArrowHeader content="사장님 인증하기" onPress={handleBackPress} />
      </View>

      <ScrollView
        className="flex-1 bg-gray-50"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full px-4 pt-4 flex-col justify-start items-center gap-4">
          <View className="w-full px-4 py-4 bg-sky-50 rounded-[14px] border border-[#b8e6fe] flex-col justify-start items-start">
            <View className="w-full flex-row justify-start items-start gap-3">
              <SvgUri
                width={20}
                height={20}
                uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-af309ae3-0cae-4192-942d-d276f6895bfa.svg"
              />
              <View className="flex-1 flex-col justify-start items-start gap-1">
                <Text className="text-[#024a70] text-sm font-normal leading-5">
                  사장님 인증이 필요합니다
                </Text>
                <Text className="text-[#0068a8] text-xs font-normal leading-5">
                  영업신고증 또는 관광숙박업 신고증을 제출하시면,{'\n'}
                  관리자 검토 후 승인됩니다.
                  {'\n'}(평균 1-2일 소요)
                </Text>
              </View>
            </View>
          </View>

          <View className="w-full px-4 py-4 bg-white rounded-[14px] flex-col justify-start items-start gap-3">
            <View className="flex-row items-center gap-1">
              <Text className="text-[#101727] text-base font-normal">
                증빙 서류 종류
              </Text>
              <Text className="text-[#fa2b36] text-xl font-normal">*</Text>
            </View>

            <DocumentTypeSelector
              selectedType={documentType}
              onSelect={handleDocumentTypeSelect}
              error={!!errors.documentType}
            />
            {errors.documentType && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.documentType}
              </Text>
            )}
          </View>

          <View className="w-full px-4 py-4 bg-white rounded-[14px] flex-col justify-start items-start gap-3">
            <View className="flex-row items-center gap-1">
              <Text className="text-[#101727] text-base font-normal">
                서류 업로드
              </Text>
              <Text className="text-[#fa2b36] text-base font-normal">*</Text>
            </View>

            <TouchableOpacity
              className={`w-full min-h-[140px] py-6 px-4 rounded-[10px] border-2 justify-center items-center ${
                errors.uploadedFile
                  ? 'bg-gray-50 border-red-500'
                  : uploadedFile
                  ? 'bg-sky-50 border-[#00a6f4]'
                  : 'bg-gray-50 border-gray-300'
              }`}
              onPress={handleFileUpload}
            >
              {uploadedFile ? (
                <>
                  <SvgUri
                    width={32}
                    height={32}
                    uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-18b4a31f-e3f7-405f-a834-2a21c0db2e7c.svg"
                  />
                  <Text
                    className="text-[#101727] text-sm font-normal mt-2 text-center"
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {uploadedFile.name}
                  </Text>
                  <Text className="text-[#697282] text-xs font-normal mt-1 text-center">
                    클릭하여 다시 선택
                  </Text>
                </>
              ) : (
                <>
                  <SvgUri
                    width={32}
                    height={32}
                    uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-18b4a31f-e3f7-405f-a834-2a21c0db2e7c.svg"
                  />
                  <Text className="text-[#697282] text-sm font-normal mt-2 text-center">
                    PDF 파일을 선택해주세요
                  </Text>
                  <Text className="text-[#99a1af] text-xs font-normal mt-1 text-center">
                    PDF (최대 10MB)
                  </Text>
                </>
              )}
            </TouchableOpacity>
            {errors.uploadedFile && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.uploadedFile}
              </Text>
            )}
          </View>

          <View className="w-full px-4 py-4 bg-white rounded-[14px] flex-col justify-start items-start gap-4 mb-8">
            <Text className="text-[#101727] text-base font-normal">
              사업자 정보
            </Text>

            <View className="w-full flex-col justify-start items-start gap-2">
              <View className="flex-row items-center gap-1">
                <Text className="text-[#354152] text-sm font-normal">
                  게스트하우스 이름
                </Text>
                <Text className="text-[#fb2c36] text-sm font-normal">*</Text>
              </View>
              <CustomTextInput
                placeholder="예 : 제주 푸른 게스트하우스"
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
              <View className="flex-row items-center gap-1">
                <Text className="text-[#354152] text-sm font-normal">
                  대표자명
                </Text>
                <Text className="text-[#fb2c36] text-sm font-normal">*</Text>
              </View>
              <CustomTextInput
                placeholder="예 : 홍길동"
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
              <View className="flex-row items-center gap-1">
                <Text className="text-[#354152] text-sm font-normal">
                  연락처
                </Text>
                <Text className="text-[#fb2c36] text-sm font-normal">*</Text>
              </View>
              <CustomTextInput
                placeholder="예 : 010-1234-5678"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
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
          content={
            uploadFileMutation.isPending || submitCertificateMutation.isPending
              ? '제출 중...'
              : '운영자 인증하기'
          }
          onPress={handleSubmit}
          className="w-full"
          disabled={
            uploadFileMutation.isPending || submitCertificateMutation.isPending
          }
        />
      </View>

      {/* 제출 성공 모달 */}
      <SubmitSuccessModal visible={isModalVisible} onClose={handleModalClose} />
    </CustomSafeAreaView>
  );
}
