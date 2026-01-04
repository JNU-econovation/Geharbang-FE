import { initialWorkingTimeAndWorkData } from "@/src/stores/stepRecruitment/slice/createStep2Slice";
import { IWorkingTimeAndWork } from "@/src/types/models/stepRecruitment/Step2Data";

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

  const updateWorking = (
    index: number,
    updater: (prev: IWorkingTimeAndWork) => IWorkingTimeAndWork
  ) => {
    const prevItem = workingList[index];
    const updatedItem = updater(prevItem);

    const newWorkingTimeAndWorkList = [...workingList];
    newWorkingTimeAndWorkList[index] = updatedItem;

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
