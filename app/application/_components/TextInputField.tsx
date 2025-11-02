import { COLORS } from "@/src/utils/constants/colors";
import { Text, TextInput, TextInputProps, View } from "react-native";
import FieldLabel from "./FieldLabel";

interface TextInputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  isRequired?: boolean;
  labelSize?: number;
  placeholder?: string;
  lineHeight?: number;
  errorMessage?: string;
  fontSize?: number;
  width?: number;
  height?: number;
  keyboardType?: TextInputProps["keyboardType"];
  maxLength?: number;
  multiline?: boolean;
  autoCapitalize?: TextInputProps["autoCapitalize"];
}

export default function TextInputField({
  value,
  onChangeText,
  label,
  labelSize,
  isRequired,
  placeholder,
  lineHeight,
  errorMessage,
  width,
  height,
  keyboardType,
  maxLength,
  multiline,
  autoCapitalize,
}: TextInputFieldProps) {
  return (
    <View>
      {label && (
        <FieldLabel
          label={label}
          isRequired={isRequired}
          fontSize={labelSize}
        ></FieldLabel>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.GRAY.PLACEHOLDER}
        className={`border rounded-lg px-3 py-3 
          ${errorMessage ? "border-primary-red" : "border-gray-border"}`}
        style={{ height: height, width: width , lineHeight: lineHeight }}
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={multiline}
        autoCapitalize={autoCapitalize}
      />
      <View className="mt-1 ml-1">
        <Text className="text-primary-red text-xs">
          {errorMessage ? errorMessage : " "}
        </Text>
      </View>
    </View>
  );
}
