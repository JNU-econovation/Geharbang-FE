import {
  getMyWishedGuestHouses,
  getMyWishedStaffRecruitments,
} from "@/src/services/wish/wish";
import { useQuery } from "@tanstack/react-query";

export const useGetMyWishedStaffRecruitments = (pageNumber = 0) => {
  return useQuery({
    queryKey: ["myWishedStaffRecruitments", pageNumber],
    queryFn: () => getMyWishedStaffRecruitments(pageNumber),
  });
};

export const useGetMyWishedGuestHouses = (pageNumber = 0) => {
  return useQuery({
    queryKey: ["myWishedGuestHouses", pageNumber],
    queryFn: () => getMyWishedGuestHouses(pageNumber),
  });
};
