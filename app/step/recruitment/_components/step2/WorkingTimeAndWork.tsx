import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";

import Flex from "@/src/components/layout/Flex";
import FormField from "@/src/components/ui/Form/FormField";
import OptionSelector from "@/src/components/ui/OptionSelector";
import CustomTextInput from "@/src/components/ui/TextInput";
import TextSize from "@/src/components/ui/TextSize";
import ViewContext from "@/src/components/ui/ViewContext/ViewContext";
import { IWorkingTimeAndWork } from "@/src/types/models/application/StepPostData";
import { PerWorkingDay } from "@/src/types/models/stepPost/PerWorkingDay";
import { PER_WORKING_DAY } from "@/src/utils/constants/options";

interface WorkingTimeAndWorkProps {
  addedTimeAndWork: IWorkingTimeAndWork;
  setAddedTimeAndWork: (workingTimeAndWork: IWorkingTimeAndWork) => void;
  onDelete: () => void;
}

export default function WorkingTimeAndWork({
  addedTimeAndWork,
  setAddedTimeAndWork,
  onDelete,
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
      <FormField label='근무 조 이름' required={true} errorMessage=''>
        <CustomTextInput
          value={addedTimeAndWork.workingTimeName}
          onChangeText={(name) =>
            setAddedTimeAndWork({
              ...addedTimeAndWork,
              workingTimeName: name,
            })
          }
          placeholder='예: 오전조 / 오후조 / 야간조'
        />
      </FormField>

      <FormField label='근무 시간' required={true} errorMessage=''>
        <Flex items='center' justify='center' dir='row' gap={19}>
          <CustomTextInput
            value={addedTimeAndWork.startTime}
            onChangeText={(startTime) =>
              setAddedTimeAndWork({
                ...addedTimeAndWork,
                startTime: startTime,
              })
            }
            placeholder='AM 11:00'
            className='w-32'
          />
          <TextSize size={20} color='#99A1AF' content='~' />
          <CustomTextInput
            value={addedTimeAndWork.endTime}
            onChangeText={(endTime) =>
              setAddedTimeAndWork({
                ...addedTimeAndWork,
                endTime: endTime,
              })
            }
            placeholder='PM 11:00'
            className='w-32'
          />
        </Flex>
      </FormField>

      <FormField label='해당 시간대 업무' required={true} errorMessage=''>
        <CustomTextInput
          value={addedTimeAndWork.thatTimeWork}
          onChangeText={(work) =>
            setAddedTimeAndWork({
              ...addedTimeAndWork,
              thatTimeWork: work,
            })
          }
          placeholder='예: 체크인 / 체크아웃, 객실 청소'
        />
      </FormField>

      <FormField label='근무일 기준' required={true} errorMessage=''>
        <OptionSelector<PerWorkingDay>
          size='49%'
          option={PER_WORKING_DAY}
          selected={addedTimeAndWork.perWorkingDay}
          setSelected={(workingDay) =>
            setAddedTimeAndWork({
              ...addedTimeAndWork,
              perWorkingDay: workingDay,
            })
          }
        />
      </FormField>

      <FormField label='근무일 수' required={true} errorMessage=''>
        <Flex items='center' dir='row' gap={10}>
          <CustomTextInput
            value={addedTimeAndWork.workingCount}
            onChangeText={(workingCount) =>
              setAddedTimeAndWork({
                ...addedTimeAndWork,
                workingCount: Number(workingCount),
              })
            }
            width={250}
          />
          <TextSize size={16} color='#364153' content='일 근무' />
        </Flex>
      </FormField>

      <FormField label='휴무일 수' required={true} errorMessage=''>
        <Flex items='center' dir='row' gap={10}>
          <CustomTextInput
            value={addedTimeAndWork.closedCount}
            onChangeText={(closedCount) =>
              setAddedTimeAndWork({
                ...addedTimeAndWork,
                closedCount: Number(closedCount),
              })
            }
            width={250}
          />
          <TextSize size={16} color='#364153' content='일 근무' />
        </Flex>
      </FormField>
    </ViewContext>
  );
}
