import DateInput from "@/app/application/_components/DateInput";
import FormField from "@/src/components/ui/Form/FormField";

interface WorkingStartDateProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  errorMsg?: string;
  error?: boolean;
}

export default function WorkingStartDate({
  selectedDate,
  setSelectedDate,
  errorMsg,
  error,
}: WorkingStartDateProps) {
  return (
    <FormField label='근무 시작일' required={true} errorMessage={errorMsg}>
      <DateInput
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        minDate={String(new Date())}
        error={error}
      />
    </FormField>
  );
}
