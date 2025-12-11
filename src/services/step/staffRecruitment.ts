import {
  StaffRecruitmentParams,
  StaffRecruitmentResponse,
} from "@/src/types/models/step/types";
import { axiosPublic } from "../api/customAxios";

export const getStaffRecruitmentList = async (
  params: StaffRecruitmentParams
): Promise<StaffRecruitmentResponse> => {
  const queryParams = new URLSearchParams();

  if (params.keyword) {
    queryParams.append("keyword", params.keyword);
  }

  if (params.sort) {
    queryParams.append("sort", params.sort);
  }

  if (params.region && params.region.length > 0) {
    params.region.forEach((r) => queryParams.append("region", r));
  }

  if (params.period && params.period.length > 0) {
    params.period.forEach((p) => queryParams.append("period", p));
  }

  if (params.workType) {
    queryParams.append("workType", params.workType);
  }
  
  if (params.workDays!= null) {
    queryParams.append("workDays", params.workDays.toString());
  }

  if (params.restDays != null) {
    queryParams.append("restDays", params.restDays.toString());
  }

  if (params.workScheduleType && params.workScheduleType.length > 0) {
    params.workScheduleType.forEach((w) =>
      queryParams.append("workScheduleType", w)
    );
  }

  if (params.gender) {
    queryParams.append("gender", params.gender);
  }

  if (params.pageNumber !== undefined) {
    queryParams.append("pageNumber", params.pageNumber.toString());
  }
  const url = `/api/v1/staff-recruitment?${queryParams.toString()}`;

  const response = await axiosPublic.get<StaffRecruitmentResponse>(url);

  return response.data;
};
