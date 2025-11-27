import { StepDetailResponse } from "@/src/types/models/stepDetail/StepDetailResponse";
import { axiosPublic } from "../api/customAxios";

export const getStepDetail = async (): Promise<StepDetailResponse> => {
  const response = await axiosPublic.get(
    `/api/v1/staff-recruitment/${1}/details`
  );
  return response.data;
};
