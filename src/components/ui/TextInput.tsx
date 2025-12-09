import { TextInput, TextInputProps, View } from "react-native";

import { COLORS } from "@/src/utils/constants/colors";

interface TextInputFieldProps {
  value?: string | number;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  error?: boolean;
  lineHeight?: number;
  width?: number;
  height?: number;
  keyboardType?: TextInputProps["keyboardType"];
  maxLength?: number;
  multiline?: boolean;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  editable?: boolean;
  className?: string;
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
}: TextInputFieldProps) {
  return (
    <View className={className}>
      <TextInput
        value={String(value)}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.GRAY.PLACEHOLDER}
        className={`border rounded-lg p-3 
                  ${error ? "border-primary-red" : "border-gray-border"}`}
        style={{ height: height, width: width, lineHeight: lineHeight }}
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={multiline}
        autoCapitalize={autoCapitalize}
        editable={editable}
      />
    </View>
  );
}
