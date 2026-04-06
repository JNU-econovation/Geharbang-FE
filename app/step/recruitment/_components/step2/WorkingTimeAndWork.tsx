import { Feather } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import FormField from "@/src/components/ui/Form/FormField";
import OptionSelector from "@/src/components/ui/OptionSelector";
import CustomTextInput from "@/src/components/ui/TextInput";
import TextSize from "@/src/components/ui/TextSize";
import TimePickerField from "@/src/components/ui/TimePickerField";
import ViewContext from "@/src/components/ui/ViewContext/ViewContext";
import { PerWorkingDay } from "@/src/types/models/stepRecruitment/PerWorkingDay";
import { IWorkingTimeAndWork } from "@/src/types/models/stepRecruitment/Step2Data";
import { WorkingTimeAndWorkErrors } from "@/src/types/models/stepRecruitment/StepRecruitmentFormErrors";
import { PER_WORKING_DAY } from "@/src/utils/constants/options";
import WorkingInput from "./WorkingInput";

interface WorkingTimeAndWorkProps {
  addedTimeAndWork: IWorkingTimeAndWork;
  setAddedTimeAndWork: (
    updater:
      | IWorkingTimeAndWork
      | ((prev: IWorkingTimeAndWork) => IWorkingTimeAndWork)
  ) => void;
  onDelete: () => void;
  errors?: WorkingTimeAndWorkErrors;
  onTextInputBlur?: (field: "workingTimeName" | "thatTimeWork") => void;
  onTextInputFocus?: (field: "workingTimeName" | "thatTimeWork") => void;
  onClearError?: (field: keyof WorkingTimeAndWorkErrors) => void;
}

export default function WorkingTimeAndWork({
  addedTimeAndWork,
  setAddedTimeAndWork,
  onDelete,
  errors,
  onTextInputBlur,
  onTextInputFocus,
  onClearError,
}: WorkingTimeAndWorkProps) {
  return (
    <ViewContext
      variant='modalApply'
      minHeight={200}
      className='mb-4 px-3 py-5 relative'
    >
      <Pressable onPress={onDelete} className='absolute right-4 top-4'>
        <Feather name='x' size={20} color='#99A1AF' />
      </Pressable>
      <FormField
        label='근무 조 이름'
        required={true}
        errorMessage={errors?.workingTimeName}
      >
        <CustomTextInput
          value={addedTimeAndWork.workingTimeName}
          onChangeText={(name) =>
            setAddedTimeAndWork({
              ...addedTimeAndWork,
              workingTimeName: name,
            })
          }
          onBlur={() => onTextInputBlur?.("workingTimeName")}
          onFocus={() => onTextInputFocus?.("workingTimeName")}
          placeholder='예: 오전조 / 오후조 / 야간조'
          error={!!errors?.workingTimeName}
        />
      </FormField>

      <View className='pt-1' />
      <FormField
        label='근무 시간'
        required
        errorMessage={errors?.startTime || errors?.endTime}
      >
<Flex items='center' justify='center' dir='row' gap={19}>
          <TimePickerField
            value={addedTimeAndWork.startTime}
            onChange={(date) =>
              setAddedTimeAndWork({ ...addedTimeAndWork, startTime: date })
            }
            error={!!(errors?.startTime || errors?.endTime)}
          />

          <TextSize size={20} color='#99A1AF' content='~' />

          <TimePickerField
            value={addedTimeAndWork.endTime}
            onChange={(date) =>
              setAddedTimeAndWork({ ...addedTimeAndWork, endTime: date })
            }
            error={!!(errors?.startTime || errors?.endTime)}
          />
        </Flex>
      </FormField>

      <View className='pt-1' />
      <FormField
        label='해당 시간대 업무'
        required={true}
        errorMessage={errors?.thatTimeWork}
      >
        <CustomTextInput
          value={addedTimeAndWork.thatTimeWork}
          onChangeText={(work) =>
            setAddedTimeAndWork({
              ...addedTimeAndWork,
              thatTimeWork: work,
            })
          }
          onBlur={() => onTextInputBlur?.("thatTimeWork")}
          onFocus={() => onTextInputFocus?.("thatTimeWork")}
          placeholder='예: 체크인 / 체크아웃, 객실 청소'
          multiline={true}
          error={!!errors?.thatTimeWork}
        />
      </FormField>

      <View className='pt-1' />
      <FormField
        label='근무일 기준'
        required={true}
        errorMessage={errors?.perWorkingDay}
      >
        <OptionSelector<PerWorkingDay>
          size='49%'
          option={PER_WORKING_DAY}
          selected={addedTimeAndWork.perWorkingDay}
          setSelected={(workingDay) => {
            setAddedTimeAndWork({
              ...addedTimeAndWork,
              perWorkingDay: workingDay,
            });
            onClearError?.("perWorkingDay");
          }}
          error={!!errors?.perWorkingDay}
        />
      </FormField>

      <View className='pt-1' />
      <WorkingInput
        mode={
          addedTimeAndWork.perWorkingDay === "_7일_기준" ? "auto" : "manual"
        }
        totalDays={7}
        initialWorkingCount={addedTimeAndWork.workingCount}
        initialClosedCount={addedTimeAndWork.closedCount}
        setWorkingCount={(workingCount) => {
          setAddedTimeAndWork({
            ...addedTimeAndWork,
            workingCount,
          });
        }}
        setClosedCount={(closedCount) => {
          setAddedTimeAndWork({
            ...addedTimeAndWork,
            closedCount,
          });
        }}
        setBothCounts={(workingCount, closedCount) => {
          setAddedTimeAndWork((prev) => ({
            ...prev,
            workingCount,
            closedCount,
          }));
        }}
        workingErrors={errors?.workingCount}
        closedErrors={errors?.closedCount}
        onWorkingFocus={() => onClearError?.("workingCount")}
        onClosedFocus={() => onClearError?.("closedCount")}
      />
    </ViewContext>
  );
}
