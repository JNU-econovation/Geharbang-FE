import { Pressable } from "react-native";

import Flex from "@/src/components/layout/Flex";
import FormField from "@/src/components/ui/Form/FormField";
import TextSize from "@/src/components/ui/TextSize";
import { REGION_OPTION } from "@/src/utils/constants/options";

interface WorkingRegionProps {
  selectedRegion: string;
  onChangeOption: (region: string) => void;
  errorMsg: string;
}

export default function WorkingRegion({
  selectedRegion,
  onChangeOption,
  errorMsg,
}: WorkingRegionProps) {
  return (
    <FormField label='근무 지역' required={true} errorMessage={errorMsg}>
      <Flex dir='row' wrap='wrap' gap={10}>
        {REGION_OPTION.map((option) => {
          const isSelected = selectedRegion === option.value;
          return (
            <Pressable
              key={option.value}
              onPress={() => onChangeOption(option.value)}
              className={`w-[104px] h-16 flex items-center justify-center rounded-lg ${
                isSelected ? "bg-[#0EA5E9]" : "bg-[#F3F4F6]"
              }`}
            >
              <TextSize
                size={16}
                color={isSelected ? "#FFFFFF" : "#364153"}
                content={option.label}
              />
            </Pressable>
          );
        })}
      </Flex>
    </FormField>
  );
}
