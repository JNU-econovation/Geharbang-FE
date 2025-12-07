import Flex from "@/src/components/layout/Flex";
import FormField from "@/src/components/ui/Form/FormField";
import CustomTextInput from "@/src/components/ui/TextInput";
import TextSize from "@/src/components/ui/TextSize";
import { useWorkingCalculator } from "@/src/hooks/stepRecruitment/useWorkingCalculator";
import { View } from "react-native";

interface WorkdayInputProps {
  mode: "manual" | "auto";
  totalDays?: number;
  initialWorkingCount?: number | "";
  initialClosedCount?: number | "";
  labelWorking?: string;
  labelClosed?: string;
  workingErrors?: string;
  closedErrors?: string;
}

export default function WorkdayInput({
  mode,
  totalDays,
  initialWorkingCount = "",
  initialClosedCount = "",
  labelWorking = "근무일 수",
  labelClosed = "휴무일 수",
  workingErrors,
  closedErrors,
}: WorkdayInputProps) {
  const {
    workingCount,
    closedCount,
    updateWorkingCount,
    updateClosedCount,
    isAuto,
  } = useWorkingCalculator({
    mode,
    totalDays,
    initialWorkingCount,
    initialClosedCount,
  });

  return (
    <View>
      <FormField
        label={labelWorking}
        required={true}
        errorMessage={workingErrors}
      >
        <Flex items='center' dir='row' gap={10}>
          <CustomTextInput
            value={workingCount === "" ? "" : String(workingCount)}
            keyboardType='numeric'
            width={250}
            onChangeText={(v) => {
              updateWorkingCount(v === "" ? "" : Number(v));
            }}
            error={!!workingErrors}
          />
          <TextSize size={16} color='#364153' content='일 근무' />
        </Flex>
      </FormField>

      <FormField
        label={labelClosed}
        required={true}
        errorMessage={closedErrors}
      >
        <Flex items='center' dir='row' gap={10}>
          <CustomTextInput
            value={closedCount === "" ? "" : String(closedCount)}
            keyboardType='numeric'
            width={250}
            editable={!isAuto}
            onChangeText={(v) => updateClosedCount(Number(v))}
            error={!!closedErrors}
          />
          <TextSize size={16} color='#364153' content='일 근무' />
        </Flex>
      </FormField>
    </View>
  );
}
