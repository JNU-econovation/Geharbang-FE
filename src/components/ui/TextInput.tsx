import { TextInput, TextInputProps, View } from 'react-native';

import { COLORS } from '@/src/utils/constants/colors';
import TextSize from './TextSize';

interface CustomTextInputProps {
  value?: string | number;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  error?: boolean;
  lineHeight?: number;
  width?: number;
  height?: number;
  keyboardType?: TextInputProps['keyboardType'];
  maxLength?: number;
  multiline?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  editable?: boolean;
  className?: string;
  suffix?: string;
  textAlignVertical?: TextInputProps['textAlignVertical'];
}

export default function CustomTextInput({
  value,
  onChangeText,
  placeholder,
  error,
  lineHeight,
  width,
  height,
  keyboardType,
  maxLength,
  multiline,
  autoCapitalize,
  editable,
  className,
  suffix,
  textAlignVertical,
}: CustomTextInputProps) {
  return (
    <View className={`flex-row items-center ${className}`}>
      <TextInput
        value={String(value)}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.GRAY.PLACEHOLDER}
        className={`border rounded-lg p-3
                  ${error ? 'border-primary-red' : 'border-gray-border'}`}
        style={{
          height: height,
          width: width || '100%',
          lineHeight: lineHeight,
        }}
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={multiline}
        autoCapitalize={autoCapitalize}
        editable={editable}
        textAlignVertical={textAlignVertical || (multiline ? 'top' : 'center')}
      />
      {suffix && (
        <View className="ml-2">
          <TextSize size={14} content={suffix} color={COLORS.GRAY.TEXT} />
        </View>
      )}
    </View>
  );
}
