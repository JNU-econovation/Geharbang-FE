import FormField from "@/src/components/ui/Form/FormField";
import OptionSelector from "@/src/components/ui/OptionSelector";
import { Gender } from "@/src/types/Gender";
import { GENDER_FULL } from "@/src/utils/constants/options";

interface GenderProps {
  selectedGender: Gender;
  setSelectedGender: (gender: Gender) => void;
  errorMsg?: string;
  error?: boolean;
}

export default function StepRecruitmentGender({
  selectedGender,
  setSelectedGender,
  errorMsg,
  error,
}: GenderProps) {
  return (
    <FormField label='성별' required={true} errorMessage={errorMsg}>
      <OptionSelector<Gender>
        size='32.5%'
        option={GENDER_FULL}
        selected={selectedGender}
        setSelected={setSelectedGender}
        error={error}
      />
    </FormField>
  );
}
