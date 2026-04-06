import { Feather } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import FormField from "@/src/components/ui/Form/FormField";
import TextSize from "@/src/components/ui/TextSize";
import ViewContext from "@/src/components/ui/ViewContext/ViewContext";
import { useWorkingTimeAndWork } from "@/src/hooks/stepRecruitment/useWorkingTimeAndWorkList";
import { IWorkingTimeAndWork } from "@/src/types/models/stepRecruitment/Step2Data";
import { Step2FormErrors } from "@/src/types/models/stepRecruitment/Step2FormErrors";
import { COLORS } from "@/src/utils/constants/colors";
import WorkingTimeAndWork from "./WorkingTimeAndWork";

interface WorkingTimeAndWorkListProps {
  workingTimeAndWorkList: IWorkingTimeAndWork[];
  setWorkingTimeAndWorkList: (
    workingTimeAndWork: IWorkingTimeAndWork[]
  ) => void;
  errors?: Step2FormErrors;
  onTextInputBlur?: (index: number, field: "workingTimeName" | "thatTimeWork") => void;
  onTextInputFocus?: (index: number, field: "workingTimeName" | "thatTimeWork") => void;
  onDeleteItem?: (index: number) => void;
  onClearError?: (index: number, field: string) => void;
}

export default function WorkingTimeAndWorkList({
  workingTimeAndWorkList,
  setWorkingTimeAndWorkList,
  errors,
  onTextInputBlur,
  onTextInputFocus,
  onDeleteItem,
  onClearError,
}: WorkingTimeAndWorkListProps) {
  const { workingList, addWorking, updateWorking, deleteWorking } =
    useWorkingTimeAndWork(workingTimeAndWorkList, (_, value) =>
      setWorkingTimeAndWorkList(value)
    );

  return (
    <FormField
      label='근무 시간 및 업무'
      required={true}
      errorMessage={
        workingList.length === 0 && errors?.workingTimeAndWork
          ? "근무 시간은 최소 1개 이상 입력해야 합니다."
          : undefined
      }
    >
      {workingList.map((item, index) => (
        <WorkingTimeAndWork
          key={index}
          addedTimeAndWork={item}
          setAddedTimeAndWork={(updater) => {
            updateWorking(
              index,
              typeof updater === "function" ? updater : () => updater
            );
          }}
          onDelete={() => {
            deleteWorking(index);
            onDeleteItem?.(index);
          }}
          errors={errors?.workingTimeAndWork?.[index]}
          onTextInputBlur={(field) => onTextInputBlur?.(index, field)}
          onTextInputFocus={(field) => onTextInputFocus?.(index, field)}
          onClearError={(field) => onClearError?.(index, field)}
        />
      ))}

      <Pressable onPress={addWorking}>
        <ViewContext
          variant='modalApply'
          minHeight={45}
          className='flex items-center justify-center flex-row'
          error={workingTimeAndWorkList.length === 0}
        >
          <Feather name='plus' size={20} color={COLORS.GRAY.TEXT} />
          <View className='pr-1' />
          <TextSize
            size={16}
            color={COLORS.GRAY.TEXT}
            content='근무 시간 및 업무 추가'
          />
        </ViewContext>
      </Pressable>
    </FormField>
  );
}
