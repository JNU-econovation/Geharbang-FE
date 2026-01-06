import { getGuestHouseRecommendation } from "@/src/services/home/guestHouseRecommendation";
import { useQuery } from "@tanstack/react-query";

export const useGuestHouseRecommendation = (region: string) => {
  return useQuery({
    queryKey: ["guestHouseRecommendation", region],
    queryFn: () => getGuestHouseRecommendation(region),
    enabled: !!region,
  });
};
