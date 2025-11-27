import { getOwnerQuestions } from "@/src/services/StepApply/ownerQuestions";
import { useQuery } from "@tanstack/react-query";

export const useOwnerQuestions = (recruitmentId: number) => {
  return useQuery({
    queryKey: ["ownerQuestions", recruitmentId],
    queryFn: () => getOwnerQuestions(recruitmentId),
    enabled: !!recruitmentId,
  });
};
