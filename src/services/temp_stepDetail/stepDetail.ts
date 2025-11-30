import { StepDetailResponse } from "@/src/types/models/stepDetail/StepDetailResponse";
import { axiosPublic } from "../api/customAxios";

export const getStepDetail = async (
  id: string
): Promise<StepDetailResponse> => {
  const response = await axiosPublic.get(
    `/api/v1/staff-recruitment/${id}/details`
  );
  return response.data;
};
