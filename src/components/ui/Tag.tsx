import React from 'react';
import { Text, View } from 'react-native';

interface TagProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  prefix?: string;
}

export default function Tag({
  label,
  variant = 'info',
  size = 'sm',
  prefix,
}: TagProps) {
  const variantStyles = {
    primary: 'bg-blue-500/5 border-blue-500/10 text-blue-500',
    secondary: 'bg-gray-500/5 border-gray-500/10 text-gray-500',
    success: 'bg-green-500/5 border-green-500/10 text-green-500',
    warning: 'bg-yellow-500/5 border-yellow-500/10 text-yellow-500',
    info: 'bg-sky-500/5 border-sky-500/10 text-sky-500',
  };

  const sizeStyles = {
    sm: 'px-[7px] pt-1 pb-[3px] text-[10px]',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const [bgBorderClass, textClass] = variantStyles[variant].split(' text-');

  return (
    <View
      className={`${bgBorderClass} ${sizeStyles[size]} rounded-[10px] border self-start`}
    >
      <Text
        className={`text-${textClass} ${sizeStyles[size].split(' ').pop()} font-normal leading-4`}
        style={{ fontFamily: 'Inter' }}
      >
        {prefix && `${prefix} `}{label}
      </Text>
    </View>
  );
}
