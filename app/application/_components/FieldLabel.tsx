import { View } from "react-native";

import Flex from "@/src/components/layout/Flex/Flex";
import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";

interface FieldLabelProps {
  label: string;
  isRequired?: boolean;
}

export default function FieldLabel({ label, isRequired }: FieldLabelProps) {
  return (
    <View className='mb-2 ml-1'>
      <Flex justify='start' items='center' dir='row'>
        <TextSize size={15} color={COLORS.GRAY.TEXT} content={label} />
        {isRequired ? (
          <TextSize size={16} color={COLORS.PRIMARY.RED} content=' *' />
        ) : (
          <TextSize
            size={16}
            color={COLORS.GRAY.PLACEHOLDER}
            content='(선택)'
          />
        )}
      </Flex>
    </View>
  );
}
