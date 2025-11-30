import { stepApply } from "@/src/services/StepApply/stepApply";
import { Answer } from "@/src/types/models/stepApply";
import { useMutation } from "@tanstack/react-query";

export function useStepApply(recruitmentId: number) {
  return useMutation<void, Error, Answer[]>({
    mutationFn: (answers) => stepApply(recruitmentId, answers),
    onError: (err) => {
      console.error(err);
    },
  });
}
