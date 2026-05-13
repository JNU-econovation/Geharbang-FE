import { StepDetailResponse } from "@/src/types/models/stepDetail/StepDetailResponse";
import { axiosOptionalAuth } from "../api/customAxios";

export const getStepDetail = async (
  id: string
): Promise<StepDetailResponse> => {
  const response = await axiosOptionalAuth.get(
    `/api/v1/staff-recruitment/${id}/details`
  );
  return response.data;
};
