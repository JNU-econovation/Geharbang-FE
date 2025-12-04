import { initialWorkingTimeAndWorkData } from "@/src/stores/slices/stepPost/useStepPostSlice";
import { IWorkingTimeAndWork } from "@/src/types/models/application/StepPostData";

export function useWorkingTimeAndWork(
  workingTimeAndWorkList: IWorkingTimeAndWork[],
  setWorkingTimeAndWorkList: (
    key: "workingTimeAndWork",
    value: IWorkingTimeAndWork[]
  ) => void
) {
  const workingList = workingTimeAndWorkList;

  const addWorking = () => {
    const newWorkingTimeAndWorkList = [
      ...workingList,
      { ...initialWorkingTimeAndWorkData },
    ];
    setWorkingTimeAndWorkList("workingTimeAndWork", newWorkingTimeAndWorkList);
  };

  const updateWorking = (index: number, updated: IWorkingTimeAndWork) => {
    const newWorkingTimeAndWorkList = [...workingList];
    newWorkingTimeAndWorkList[index] = updated;
    setWorkingTimeAndWorkList("workingTimeAndWork", newWorkingTimeAndWorkList);
  };

  const deleteWorking = (index: number) => {
    const newWorkingTimeAndWorkList = workingList.filter((_, i) => i !== index);
    setWorkingTimeAndWorkList("workingTimeAndWork", newWorkingTimeAndWorkList);
  };

  return {
    workingList,
    addWorking,
    updateWorking,
    deleteWorking,
  };
}
