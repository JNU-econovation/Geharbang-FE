import { Pressable, View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import FormField from "@/src/components/ui/Form/FormField";
import TextSize from "@/src/components/ui/TextSize";
import { WORKING_PERIOD } from "@/src/utils/constants/options";

type workingPeriodType = "단기" | "중기" | "장기" | "";

interface WorkingPeriodProps {
  selectedPeriod: workingPeriodType;
  setSelectedPeriod: (period: workingPeriodType) => void;
  errorMsg: string;
}

export default function WorkingPeriod({
  selectedPeriod,
  setSelectedPeriod,
  errorMsg,
}: WorkingPeriodProps) {
  return (
    <FormField label='근무 기간' required={true} errorMessage={errorMsg}>
      {WORKING_PERIOD.map((period) => {
        const isSelected = selectedPeriod === period.value;

        return (
          <Pressable
            key={period.value}
            onPress={() => {
              setSelectedPeriod(period.value as workingPeriodType);
            }}
            className={`border rounded-lg p-3 mt-3 ${
              isSelected
                ? "bg-[#EFF6FF] border-primary-blue"
                : "border-gray-border"
            }`}
          >
            <Flex items='center' dir='row'>
              <View
                className={`rounded-full w-4 h-4 mr-3 ${
                  isSelected
                    ? "bg-primary-blue"
                    : "border border-gray-placeholder"
                }`}
              />

              <View>
                <TextSize size={16} color='#101828' content={period.label} />
                <TextSize size={14} color='#4A5565' content={period.content} />
              </View>
            </Flex>
          </Pressable>
        );
      })}
    </FormField>
  );
}
