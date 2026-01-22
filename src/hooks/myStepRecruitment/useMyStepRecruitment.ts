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
      queryClient.invalidateQueries({ queryKey: ["myStepRecruitment"] });
      queryClient.invalidateQueries({ queryKey: ["stepRecommendation"] });
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
      queryClient.invalidateQueries({ queryKey: ["myStepRecruitment"] });
      queryClient.invalidateQueries({ queryKey: ["stepRecommendation"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
