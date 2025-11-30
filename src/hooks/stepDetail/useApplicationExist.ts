import { useQuery } from "@tanstack/react-query";

import { getIsApplicationExist } from "@/src/services/StepDetail/\bapplicationExist";

export const useApplicationExist = () => {
  const { data: isApplicationExist, ...rest } = useQuery({
    queryKey: ["isApplicationExist"],
    queryFn: getIsApplicationExist,
  });

  return {
    isApplicationExist,
    ...rest,
  };
};
