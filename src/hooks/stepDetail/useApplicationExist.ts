import { useQuery } from "@tanstack/react-query";

import { getIsApplicationExist } from "@/src/services/stepDetail/applicationExist";

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
