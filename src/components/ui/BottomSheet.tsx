import React, { ReactNode, useEffect, useRef } from 'react';
import {
  Animated,
  DimensionValue,
  Modal,
  Pressable,
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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(1000)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 1000,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, slideAnim]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1" onPress={onClose}>
        <Animated.View
          className="flex-1 bg-black/50"
          style={{ opacity: fadeAnim }}
        />
        <Animated.View
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl overflow-hidden"
          style={{
            maxHeight,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
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
          </Pressable>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable onPress={(e) => e.stopPropagation()}>
              {children}
            </Pressable>
          </ScrollView>

          {footer && (
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View className="bg-white border-t border-gray-200">
                {footer}
              </View>
            </Pressable>
          )}
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
