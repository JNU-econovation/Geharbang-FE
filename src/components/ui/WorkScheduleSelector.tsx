import { WORK_SCHEDULE_OPTIONS } from "@/src/utils/constants/filterOptions";
import { TouchableOpacity, View } from "react-native";
import Checkbox from "@/src/components/ui/Checkbox";
import TextSize from "@/src/components/ui/TextSize";

type SingleModeProps = {
  mode: "single";
  selectedDays: number | "";
  onSelect: (days: number) => void;
};

type MultipleModeProps = {
  mode: "multiple";
  selectedLabels: string[];
  onToggle: (label: string) => void;
};

type WorkScheduleSelectorProps = SingleModeProps | MultipleModeProps;

export default function WorkScheduleSelector(props: WorkScheduleSelectorProps) {
  return (
    <View className="gap-2">
      {WORK_SCHEDULE_OPTIONS.map((workSchedule, index) => {
        const days = index + 1;

        const isSelected = props.mode === "single"
          ? props.selectedDays === days
          : props.selectedLabels.includes(workSchedule.label);

        const handlePress = () => {
          if (props.mode === "single") {
            props.onSelect(days);
          } else {
            props.onToggle(workSchedule.label);
          }
        };

        return (
          <TouchableOpacity
            key={workSchedule.label}
            onPress={handlePress}
            className={`flex-row items-center gap-3 p-3 rounded-lg border ${
              isSelected
                ? "border-primary-blue bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <Checkbox checked={isSelected} size="md" />
            <View>
              <TextSize size={14} content={workSchedule.label} />
              <TextSize
                size={12}
                content={workSchedule.desc}
                color="#6B7280"
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
