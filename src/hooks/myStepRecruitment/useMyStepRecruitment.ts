import {
  deleteMyStepRecruitment,
  getMyStepRecruitment,
  patchMyStepRecruitmentStatus,
} from "@/src/services/myStepRecruitment/myStepRecruitmentService";
import { Status } from "@/src/types/models/stepRecruitment/MyStepRecruitment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 사장님 스텝 공고 목록 보기
export const useGetMyStepRecruitment = () => {
  return useQuery({
    queryKey: ["myStepRecruitment"],
    queryFn: () => getMyStepRecruitment(),
  });
};

// 사장님 스텝 공고 활성/비활성화
export const usePatchMyStepRecruitmentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: Status }) =>
      patchMyStepRecruitmentStatus(id, status),
    onSuccess: () => {
      console.log("활성화/비활성화 성공");
      queryClient.invalidateQueries({ queryKey: ["myStepRecruitment"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};

// 사장님 스텝 공고 삭제
export const useDeleteMyStepRecruitment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteMyStepRecruitment(id),
    onSuccess: () => {
      console.log("삭제 성공");
      queryClient.invalidateQueries({ queryKey: ["myStepRecruitment"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
