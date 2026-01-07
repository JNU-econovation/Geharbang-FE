import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

import { getGuestHouseDetail } from "@/src/services/guestHouseDetail/guestHouseDetail";
import { GuestHouseDetailResponse } from "@/src/types/guestHouseDetail/GuestHouseDetailResponse";

export const useGuestHouseDetail = () => {
  const { id } = useLocalSearchParams();

  const { data, isPending, ...rest } = useQuery<GuestHouseDetailResponse>({
    queryKey: [id, "guestHouseDetail"],
    queryFn: () => getGuestHouseDetail(String(id)),
    enabled: !!id,
  });

  return {
    data,
    isPending,
    ...rest,
  };
};
