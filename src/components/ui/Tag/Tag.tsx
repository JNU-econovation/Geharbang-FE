import React from 'react';
import { Text, View } from 'react-native';
import { TAG_SIZES, TAG_VARIANTS, TagSize, TagVariant } from './tag.variant';

interface TagProps {
  label: string;
  variant?: TagVariant;
  size?: TagSize;
  prefix?: string;
}

export default function Tag({
  label,
  variant = 'info',
  size = 'sm',
  prefix,
}: TagProps) {
  const [bgBorderClass, textClass] = TAG_VARIANTS[variant].split(' text-');

  return (
    <View
      className={`${bgBorderClass} ${TAG_SIZES[size]} rounded-[10px] border self-start`}
    >
      <Text
        className={`text-${textClass} ${TAG_SIZES[size].split(' ').pop()} font-normal leading-4`}
        style={{ fontFamily: 'Inter' }}
      >
        {prefix && `${prefix} `}{label}
      </Text>
    </View>
  );
}
