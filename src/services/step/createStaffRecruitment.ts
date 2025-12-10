import { axiosPrivate } from "../api/customAxios";
import { StaffRecruitmentRequest } from "@/src/types/models/stepRecruitment/StaffRecruitmentRequest";

/**
 * 스텝 공고 생성
 * @param data 공고 데이터
 * @returns 생성된 공고 ID
 */
export const createStaffRecruitment = async (
  data: StaffRecruitmentRequest
): Promise<number> => {
  const response = await axiosPrivate.post("/api/v1/staff-recruitment", data);
  return response.data.recruitmentId || response.data.id;
};
