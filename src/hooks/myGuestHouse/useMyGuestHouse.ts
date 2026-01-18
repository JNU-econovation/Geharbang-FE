import {
  deleteMyGuestHouse,
  getMyGuestHouse,
  patchMyGuestHouseStatus,
} from "@/src/services/myGuestHouse/myGuestHouseService";
import { Status } from "@/src/types/models/guestHouse/MyGuestHouse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 사장님 게스트하우스 목록 보기
export const useGetMyGuestHouse = () => {
  return useQuery({
    queryKey: ["myGuestHouse"],
    queryFn: () => getMyGuestHouse(),
  });
};

// 사장님 게스트하우스 활성/비활성화
export const usePatchMyGuestHouseStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: Status }) =>
      patchMyGuestHouseStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myGuestHouse"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};

// 사장님 게스트하우스 삭제
export const useDeleteMyGuestHouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteMyGuestHouse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myGuestHouse"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
