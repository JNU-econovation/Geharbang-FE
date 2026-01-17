import { getMyApplication } from "@/src/services/application/myApplication/myApplication";
import { useQuery } from "@tanstack/react-query";

export const useMyApplication = () => {
  return useQuery({
    queryKey: ["myApplication"],
    queryFn: () => getMyApplication(),
  });
};
