import { getMyInfomation } from "@/src/services/application/myApplication/myInfomation";
import { useQuery } from "@tanstack/react-query";

export const useMyInfomation = (isExist: boolean) => {
  return useQuery({
    queryKey: ["myInfomation"],
    queryFn: () => getMyInfomation(),
    enabled: isExist,
  });
};
