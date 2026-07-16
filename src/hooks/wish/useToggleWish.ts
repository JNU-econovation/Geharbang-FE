import {
  addGuestHouseWish,
  addStaffRecruitmentWish,
  deleteGuestHouseWish,
  deleteStaffRecruitmentWish,
} from "@/src/services/wish/wish";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type WishTargetType = "stepRecruitment" | "guestHouse";

interface UseToggleWishParams {
  type: WishTargetType;
  id: number;
  onOptimisticUpdate: (newIsWished: boolean) => void;
  onError: () => void;
}

export function useToggleWish({
  type,
  id,
  onOptimisticUpdate,
  onError,
}: UseToggleWishParams) {
  const queryClient = useQueryClient();
  return useMutation<void, Error, boolean>({
    mutationFn: async (isCurrentlyWished: boolean) => {
      if (type === "stepRecruitment") {
        if (isCurrentlyWished) {
          await deleteStaffRecruitmentWish(id);
        } else {
          await addStaffRecruitmentWish(id);
        }
      } else {
        if (isCurrentlyWished) {
          await deleteGuestHouseWish(id);
        } else {
          await addGuestHouseWish(id);
        }
      }
    },
    onMutate: (isCurrentlyWished) => {
      onOptimisticUpdate(!isCurrentlyWished);
    },
    onSuccess: () => {
      if (type === "guestHouse") {
        queryClient.invalidateQueries({ queryKey: ["guestHouseMap"] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["stepMap"] });
      }
    },
    onError: () => {
      onError();
    },
  });
}
