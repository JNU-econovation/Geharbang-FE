import { COLORS } from "@/src/utils/constants/colors";
import { TextInput, TextInputProps, View } from "react-native";

interface TextInputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: boolean;
  lineHeight?: number;
  width?: number;
  height?: number;
  keyboardType?: TextInputProps["keyboardType"];
  maxLength?: number;
  multiline?: boolean;
  autoCapitalize?: TextInputProps["autoCapitalize"];
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
}: TextInputFieldProps) {
  return (
    <View>
      <TextInput
        value={value}
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
      />
    </View>
  );
}
