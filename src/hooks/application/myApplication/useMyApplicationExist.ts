import { getMyApplicationExist } from "@/src/services/application/myApplication/myApplicaitonExist";
import { useQuery } from "@tanstack/react-query";

export const useMyApplicationExist = () => {
  return useQuery({
    queryKey: ["myApplicationExist"],
    queryFn: () => getMyApplicationExist(),
  });
};
