import FormField from "@/src/components/ui/Form/FormField";
import CustomTextInput from "@/src/components/ui/TextInput";

interface GuestHouseNameProps {
  value: string;
  onChangeText: (text: string) => void;
  errorMsg?: string;
  error?: boolean;
}

export default function GuestHouseName({
  value,
  onChangeText,
  errorMsg,
  error,
}: GuestHouseNameProps) {
  return (
    <FormField
      label='게스트하우스 이름'
      required={true}
      errorMessage={errorMsg}
    >
      <CustomTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder='예: 제주 바다뷰 게스트하우스'
        error={error}
      />
    </FormField>
  );
}
