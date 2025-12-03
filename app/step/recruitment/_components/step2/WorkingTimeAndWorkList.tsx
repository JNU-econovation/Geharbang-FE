import { Feather } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import FormField from "@/src/components/ui/Form/FormField";
import TextSize from "@/src/components/ui/TextSize";
import ViewContext from "@/src/components/ui/ViewContext/ViewContext";
import { useWorkingTimeAndWork } from "@/src/hooks/stepPost/useWorkingTimeAndWorkList";
import { IWorkingTimeAndWork } from "@/src/types/models/application/StepPostData";
import { COLORS } from "@/src/utils/constants/colors";
import WorkingTimeAndWork from "./WorkingTimeAndWork";

interface WorkingTimeAndWorkListProps {
  workingTimeAndWorkList: IWorkingTimeAndWork[];
  setWorkingTimeAndWorkList: (
    workingTimeAndWork: IWorkingTimeAndWork[]
  ) => void;
}

export default function WorkingTimeAndWorkList({
  workingTimeAndWorkList,
  setWorkingTimeAndWorkList,
}: WorkingTimeAndWorkListProps) {
  const { workingList, addWorking, updateWorking, deleteWorking } =
    useWorkingTimeAndWork(workingTimeAndWorkList, (_, value) =>
      setWorkingTimeAndWorkList(value)
    );

  return (
    <FormField label='근무 시간 및 업무' required={true}>
      {workingList.map((item, index) => (
        <View key={index}>
          <WorkingTimeAndWork
            addedTimeAndWork={item}
            setAddedTimeAndWork={(updated) => updateWorking(index, updated)}
            onDelete={() => deleteWorking(index)}
          />
        </View>
      ))}

      <Pressable onPress={addWorking}>
        <ViewContext
          variant='modalApply'
          minHeight={45}
          className='flex items-center justify-center flex-row'
        >
          <Feather name='plus' size={20} color={COLORS.GRAY.TEXT} />
          <View className='pr-1' />
          <TextSize
            size={16}
            color='#4A5565'
            content='근무 시간 및 업무 추가'
          />
        </ViewContext>
      </Pressable>
    </FormField>
  );
}
