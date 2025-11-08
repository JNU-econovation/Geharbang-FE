import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";
import { View } from "react-native";
import FieldLabel from "./FieldLabel";

interface FormFieldProps {
  label?: string ;
  required?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
}

export default function FormField({
  label,
  required,
  errorMessage,
  children,
}: FormFieldProps) {
  return (
    <View>
      {label && <FieldLabel label={label} isRequired={required} />}
      {children}
      <View className="mt-1 ml-1 h-5">
        {!!errorMessage && <TextSize color={COLORS.PRIMARY.RED} size={12} content={errorMessage} />}
      </View>
    </View>
  );
}
