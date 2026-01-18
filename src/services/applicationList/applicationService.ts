import { ApplicationListResponse } from "@/src/types/api/applicationList/ApplicationListResponse";
import { QnA } from "@/src/types/models/applicaionList/QnA";
import { ApplicationData } from "@/src/types/models/application/ApplicationData";
import { axiosPrivate } from "../api/customAxios";

// 지원된 지원서 목록 보기
export const getApplicationList = async (
  id: string,
): Promise<ApplicationListResponse> => {
  const response = await axiosPrivate.get(
    `/api/v1/application-records/${id}/all`,
  );
  return response.data;
};

// 지원자의 지원서 열람하기
export const getApplicationProfile = async (
  recordId: string,
): Promise<ApplicationData> => {
  const response = await axiosPrivate.get(
    `/api/v1/application-records/${recordId}`,
  );
  return response.data;
};

// 지원자의 추가 질문 답변 보기
export const getAdditionalAnswers = async (
  recordId: string,
): Promise<QnA[]> => {
  const response = await axiosPrivate.get(
    `/api/v1/application-records/questions/${recordId}`,
  );
  return response.data.questions;
};

// 지원자 합격 처리
export const postApplicationPass = async (recordId: number): Promise<void> => {
  const response = await axiosPrivate.post(
    `/api/v1/application-records/${recordId}`,
  );
};
