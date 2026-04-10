import { getMyInfomation } from "@/src/services/application/myApplication/myInfomation";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export const useOwnerStatus = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery({
    queryKey: ["myInfomation"],
    queryFn: () => getMyInfomation(),
    enabled: !!accessToken,
  });
};
