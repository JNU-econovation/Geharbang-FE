import { getMyApplicationStatus } from "@/src/services/application/myApplication/myApplicationStatus";
import { useQuery } from "@tanstack/react-query";

export const useMyApplicationStatus = (filter: "ALL" | "ACCEPTED") => {
  return useQuery({
    queryKey: ["myApplicationStatus", filter],
    queryFn: () =>
      getMyApplicationStatus({
        onlyAccepted: filter === "ACCEPTED",
        pageNumber: 0,
      }),
  });
};
