import React, { ReactNode } from 'react';
import {
  DimensionValue,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxHeight?: DimensionValue;
  showCloseButton?: boolean;
}

export default function BottomSheet({
  visible,
  onClose,
  title,
  children,
  footer,
  maxHeight = '90%',
  showCloseButton = true,
}: BottomSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50">
        <View
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl"
          style={{ maxHeight }}
        >
          {(title || showCloseButton) && (
            <View className="bg-white border-b border-gray-200 px-4 py-4 flex-row items-center justify-between rounded-t-2xl">
              {title && (
                <Text className="text-lg font-semibold text-gray-900">
                  {title}
                </Text>
              )}
              {!title && <View />}
              {showCloseButton && (
                <TouchableOpacity onPress={onClose} className="p-2">
                  <Text className="text-gray-600 text-xl">✕</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>

          {footer && (
            <View className="bg-white border-t border-gray-200">{footer}</View>
          )}
        </View>
      </View>
    </Modal>
  );
}
