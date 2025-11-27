import { axiosPrivate } from "@/src/services/api/customAxios";
import { Answer } from "@/src/types/models/stepApply";

export const stepApply = async (
  recruitmentId: number,
  answers: Answer[]
): Promise<void> => {
  const response = await axiosPrivate.post(
    `/api/v1/application/staff-recruitment/${recruitmentId}`,
    { answers }
  );
};
