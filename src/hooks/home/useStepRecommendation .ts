import { getStepRecommendation } from "@/src/services/home/stepRecommendation";
import { useQuery } from "@tanstack/react-query";

export const useStepRecommendation = (region: string) => {
  return useQuery({
    queryKey: ["stepRecommendation", region],
    queryFn: () => getStepRecommendation(region),
    enabled: !!region,
  });
};
