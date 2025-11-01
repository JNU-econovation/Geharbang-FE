import { Text, View } from "react-native";

interface FieldLabelProps {
  label: string;
  isRequired?: boolean;
  fontSize?: number;
}

export default function FieldLabel({
  label,
  isRequired,
  fontSize,
}: FieldLabelProps) {
  return (
    <View className="mb-2 ml-1 flex-row">
      <Text className="text-gray-text" style={{fontSize}}>{label}</Text>
      {isRequired ? (
        <Text > *</Text>
      ) : (
        <Text className="text-gray-placeholder"> (선택)</Text>
      )}
    </View>
  );
}
