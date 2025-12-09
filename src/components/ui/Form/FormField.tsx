import { View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";
import FieldLabel from "./FieldLabel";

interface FormFieldProps {
  label?: string;
  required?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
  description?: string;
}

export default function FormField({
  label,
  required,
  errorMessage,
  children,
  description,
}: FormFieldProps) {
  return (
    <View>
      {label && <FieldLabel label={label} isRequired={required} />}
      {description && (
        <View className='mb-3'>
          <TextSize size={13} color="#6A7282" content={description} />
        </View>
      )}
      {children}
      <View className='mt-1 h-5'>
        {!!errorMessage && (
          <TextSize
            color={COLORS.PRIMARY.RED}
            size={12}
            content={errorMessage}
          />
        )}
      </View>
    </View>
  );
}
