import { axiosPrivate } from "../api/customAxios";
import { StaffRecruitmentRequest } from "@/src/types/models/stepRecruitment/StaffRecruitmentRequest";

export const updateStaffRecruitment = async (
  id: number,
  data: StaffRecruitmentRequest
): Promise<void> => {
  await axiosPrivate.put(`/api/v1/staff-recruitment/${id}`, data);
};
