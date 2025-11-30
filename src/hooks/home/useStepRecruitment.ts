import { useQuery } from "@tanstack/react-query";
import { getStepRecruitment } from "@/src/services/home/stepRecruitment";

export const useStepRecruitment = (region: string) => {
  return useQuery({
    queryKey: ["stepRecruitment", region],
    queryFn: () => getStepRecruitment(region),
    enabled: !!region,
  });
};
