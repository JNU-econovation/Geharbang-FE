import {
  getAdditionalAnswers,
  getApplicationList,
  getApplicationProfile,
  postApplicationPass,
} from "@/src/services/applicationList/applicationService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 지원된 지원서 목록 보기
export const useGetApplicationList = (id: string) => {
  return useQuery({
    queryKey: ["applicationList", id],
    queryFn: () => getApplicationList(id),
    enabled: !!id,
  });
};

// 지원자의 지원서 열람하기
export const useGetApplicationProfile = (recordId: string) => {
  return useQuery({
    queryKey: ["applicationProfile", recordId],
    queryFn: () => getApplicationProfile(recordId),
    enabled: !!recordId,
  });
};

// 지원자의 추가 질문 답변 보기
export const useGetAdditionalAnswers = (recordId: string) => {
  return useQuery({
    queryKey: ["applicationAnswers", recordId],
    queryFn: () => getAdditionalAnswers(recordId),
    enabled: !!recordId,
  });
};

// 지원자 합격 처리
export const useApplicationPass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (recordId: number) => postApplicationPass(recordId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicationList"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
