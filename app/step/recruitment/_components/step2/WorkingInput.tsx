import { View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import FormField from "@/src/components/ui/Form/FormField";
import CustomTextInput from "@/src/components/ui/TextInput";
import TextSize from "@/src/components/ui/TextSize";
import { useWorkdayCalculator } from "@/src/hooks/stepPost/useWorkingCalculator";

interface WorkdayInputProps {
  mode: "manual" | "auto";
  totalDays?: number;
  initialWorkingCount?: number;
  initialClosedCount?: number;

  labelWorking?: string;
  labelClosed?: string;
}

export default function WorkdayInput({
  mode,
  totalDays,
  initialWorkingCount = 0,
  initialClosedCount = 0,
  labelWorking = "근무일 수",
  labelClosed = "휴무일 수",
}: WorkdayInputProps) {
  const {
    workingCount,
    closedCount,
    updateWorkingCount,
    updateClosedCount,
    isAuto,
  } = useWorkdayCalculator({
    mode,
    totalDays,
    initialWorkingCount,
    initialClosedCount,
  });

  return (
    <View>
      <FormField label={labelWorking} required={true}>
        <Flex items='center' dir='row' gap={10}>
          <CustomTextInput
            value={String(workingCount)}
            keyboardType='numeric'
            width={250}
            onChangeText={(v) => updateWorkingCount(Number(v))}
          />
          <TextSize size={16} color='#364153' content='일 근무' />
        </Flex>
      </FormField>

      <FormField label={labelClosed} required={true}>
        <Flex items='center' dir='row' gap={10}>
          <CustomTextInput
            value={String(closedCount)}
            keyboardType='numeric'
            width={250}
            editable={!isAuto}
            onChangeText={(v) => updateClosedCount(Number(v))}
          />
          <TextSize size={16} color='#364153' content='일 근무' />
        </Flex>
      </FormField>
    </View>
  );
}
