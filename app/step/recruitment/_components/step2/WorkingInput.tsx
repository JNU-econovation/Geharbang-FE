import Flex from "@/src/components/layout/Flex";
import FormField from "@/src/components/ui/Form/FormField";
import CustomTextInput from "@/src/components/ui/TextInput";
import TextSize from "@/src/components/ui/TextSize";
import { useWorkingCalculator } from "@/src/hooks/stepRecruitment/useWorkingCalculator";
import { View } from "react-native";

interface WorkdayInputProps {
  mode: "manual" | "auto";
  totalDays?: number;
  initialWorkingCount: number | "";
  initialClosedCount: number | "";
  setWorkingCount: (v: number | "") => void;
  setClosedCount: (v: number | "") => void;
  setBothCounts?: (working: number | "", closed: number | "") => void;

  workingErrors?: string;
  closedErrors?: string;
}

export default function WorkingInput({
  mode,
  totalDays,
  initialWorkingCount,
  initialClosedCount,
  setWorkingCount,
  setClosedCount,
  setBothCounts,
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
    workingCount: initialWorkingCount,
    closedCount: initialClosedCount,
    setWorkingCount,
    setClosedCount,
    setBothCounts,
  });

  return (
    <View>
      <FormField label='근무일 수' required={true} errorMessage={workingErrors}>
        <Flex items='center' dir='row' gap={10}>
          <CustomTextInput
            value={workingCount}
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

      <FormField label='휴무일 수' required={true} errorMessage={closedErrors}>
        <Flex items='center' dir='row' gap={10}>
          <CustomTextInput
            value={closedCount}
            keyboardType='numeric'
            width={250}
            editable={!isAuto}
            onChangeText={(v) => {
              updateClosedCount(v === "" ? "" : Number(v));
            }}
            error={!!closedErrors}
          />
          <TextSize size={16} color='#364153' content='일 휴무' />
        </Flex>
      </FormField>
    </View>
  );
}
