import { useQuery } from "@tanstack/react-query";

import { getStepDetail } from "@/src/services/StepDetail/stepDetail";
import { StepDetailResponse } from "@/src/types/models/stepDetail/StepDetailResponse";
import { useLocalSearchParams } from "expo-router";

export const useStepDetail = () => {
  const { id } = useLocalSearchParams();

  const { data, isPending, ...rest } = useQuery<StepDetailResponse>({
    queryKey: [id, "stepDetail"],
    queryFn: () => getStepDetail(String(id)),
    enabled: !!id,
  });

  return {
    data,
    isPending,
    ...rest,
  };
};
