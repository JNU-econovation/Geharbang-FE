import {
  MyStepRecruitment,
  Status,
} from "@/src/types/models/stepRecruitment/MyStepRecruitment";
import { axiosPrivate } from "../api/customAxios";

// 사장님 스텝 공고 목록 보기
export const getMyStepRecruitment = async (): Promise<MyStepRecruitment[]> => {
  const response = await axiosPrivate.get(`/api/v1/staff-recruitment/owner`);
  return response.data.staffRecruitmentPosts;
};

// 사장님 스텝 공고 활성/비활성화
export const patchMyStepRecruitmentStatus = async (
  id: number,
  status: Status,
): Promise<void> => {
  const response = await axiosPrivate.patch(`/api/v1/staff-recruitment/${id}`, {
    status,
  });
};

// 사장님 스텝 공고 삭제
export const deleteMyStepRecruitment = async (id: number): Promise<void> => {
  const response = await axiosPrivate.delete(`/api/v1/staff-recruitment/${id}`);
};
