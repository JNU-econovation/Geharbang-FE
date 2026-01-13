import { router } from 'expo-router';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

interface SubmissionSuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SubmissionSuccessModal({
  visible,
  onClose,
}: SubmissionSuccessModalProps) {
  const handleClose = () => {
    onClose();
    router.replace('/');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-center items-center bg-black/40 px-6">
        <View className="w-full max-w-[320px] bg-white rounded-2xl items-center shadow-2xl overflow-hidden py-8">
          <View className="w-full px-6 items-center">
            <View className="mb-3">
              <SvgUri
                width={94}
                height={94}
                uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Container-ef530a59-d13a-4fd4-84a9-bb8050aa9660.svg"
              />
            </View>

            <Text className="text-center text-[#101727] text-base font-normal leading-6 mb-3">
              인증 서류가 제출되었습니다
            </Text>

            <Text className="text-center text-[#495565] text-base font-normal leading-[26px] mb-8">
              관리자 검토 후 승인됩니다.{'\n'}
              평균 1-2일 정도 소요되며,{'\n'}
              승인 완료 시 알림으로 안내드립니다.
            </Text>

            <View className="w-full px-2">
              <TouchableOpacity
                onPress={handleClose}
                className="w-full h-[52px] bg-sky-500 rounded-[14px] justify-center items-center"
              >
                <Text className="text-center text-white text-base font-normal leading-6">
                  확인
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
