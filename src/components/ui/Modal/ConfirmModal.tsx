import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";
import React from "react";
import { Modal, Pressable, View } from "react-native";
import Flex from "../../layout/Flex";
import Button from "../Button/Button";

interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  icon?: React.ReactNode;
  iconBgColor?: string;
  title: string;
  description?: string;
  warningText?: string;
  confirmText: string;
  confirmBtnColor: string;
  cancelText?: string;
}

export default function ConfirmModal({
  visible,
  onClose,
  onConfirm,
  icon,
  iconBgColor,
  title,
  description,
  warningText,
  confirmText,
  confirmBtnColor,
  cancelText = "취소",
}: ConfirmModalProps) {
  return (
    <Modal visible={visible} transparent animationType='fade'>
      <Pressable
        className='flex-1 bg-black/50 justify-center items-center px-8'
        onPress={onClose}
      >
        <View className='bg-white rounded-[30px] px-6 py-4 items-center gap-3'>
          {icon && (
            <View
              className={`w-18 h-18 p-3 rounded-full items-center justify-center bg-${iconBgColor}`}
            >
              {icon}
            </View>
          )}

          <TextSize size={18} content={title} />

          {description && (
            <TextSize
              size={14}
              color={COLORS.GRAY.TEXT}
              content={description}
              align='center'
            />
          )}
          {warningText && (
            <TextSize
              size={13}
              color={COLORS.PRIMARY.RED}
              content={warningText}
            />
          )}
          <Flex dir='row' items='center' justify='between' gap={10}>
            <Button
              variant='gray'
              textColor={COLORS.GRAY.TEXT}
              content={cancelText}
              height={50}
              onPress={onClose}
              className='flex-1'
            />
            <Button
              textColor='white'
              content={confirmText}
              height={50}
              onPress={onConfirm}
              className={`flex-1 bg-${confirmBtnColor}`}
            />
          </Flex>
        </View>
      </Pressable>
    </Modal>
  );
}
