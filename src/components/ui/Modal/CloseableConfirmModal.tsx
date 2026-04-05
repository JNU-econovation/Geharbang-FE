import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, View } from 'react-native';

import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import TextSize from '@/src/components/ui/TextSize';
import { COLORS } from '@/src/utils/constants/colors';


export interface CloseableConfirmModalProps {
  isVisible: boolean;
  onClose: () => void; 
  title: string;
  description?: string;

  leftAction: {
    label: string;
    onPress: () => void;
  };

  rightAction: {
    label: string;
    onPress: () => void;
    variant: 'red' | 'primary' | 'gray'; 
  };
}

export function CloseableConfirmModal({
  isVisible,
  title,
  description,
  onClose,
  leftAction,
  rightAction
}: CloseableConfirmModalProps) {
  return (
    <Modal visible={isVisible} transparent animationType='fade'>
      <Pressable
        className='flex-1 bg-black/50 justify-center items-center px-8'
        onPress={onClose}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View className='bg-white rounded-[30px] px-6 pt-10 pb-6 items-center gap-3 w-full'>
            <Pressable
              onPress={onClose}
              className='absolute top-3 right-4 p-2'
            >
              <Feather name='x' size={20} color={COLORS.GRAY.TEXT} />
            </Pressable>

            <TextSize size={18} content={title} />

            {description && (
              <TextSize
                size={14}
                color={COLORS.GRAY.TEXT}
                content={description}
                align='center'
              />
            )}

            <Flex dir='row' items='center' justify='between' gap={10} className='mt-2'>
              <Button
                variant='gray'
                textColor={COLORS.GRAY.TEXT}
                content={leftAction.label}
                height={50}
                onPress={leftAction.onPress}
                className='flex-1'
              />
              <Button
                variant={rightAction.variant}
                textColor='white'
                content={rightAction.label}
                height={50}
                onPress={rightAction.onPress}
                className='flex-1'
              />
            </Flex>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
