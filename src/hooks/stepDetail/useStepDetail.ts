import { useQuery } from "@tanstack/react-query";

import { getStepDetail } from "@/src/services/StepDetail/stepDetail";
import { StepDetailResponse } from "@/src/types/models/stepDetail/StepDetailResponse";

export const useStepDetail = () => {
  return useQuery<StepDetailResponse>({
    queryKey: ["stepDetail"],
    queryFn: getStepDetail,
  });
};
