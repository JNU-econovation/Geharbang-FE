import { COLORS } from "@/src/utils/constants/colors";
import { Pressable, Text, View } from "react-native";

interface StepTab {
  label: string;
}

interface StepProgressBarProps {
  tabs: StepTab[];
  currentStep: number; 
  onTabPress: (index: number) => void; 
}

export default function StepProgressBar({
  tabs,
  currentStep,
  onTabPress,
}: StepProgressBarProps) {
  const activeIndex = currentStep - 1;

  return (
    <View className='flex-row border-b border-gray-border'>
      {tabs.map((tab, i) => (
        <Pressable
          key={i}
          className='flex-1 items-center pb-3 pt-2'
          onPress={() => onTabPress(i)}
        >
          <Text
            className={`text-sm ${
              i === activeIndex
                ? "text-primary-blue font-bold"
                : "text-gray-text"
            }`}
          >
            {tab.label}
          </Text>
          {i === activeIndex && (
            <View
              className='absolute bottom-0 left-0 right-0'
              style={{ height: 2, backgroundColor: COLORS.PRIMARY.BLUE }}
            />
          )}
        </Pressable>
      ))}
    </View>
  );
}
