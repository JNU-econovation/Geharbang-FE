import { GuestHouseCard } from "@/src/types/models/GuestHouseCard";
import { axiosPublic } from "../api/customAxios";

type StepRecruitmentResponse = {
  staffRecruitmentPosts: GuestHouseCard[];
};

export const getStepRecruitment = async (region: string) => {
  const response = await axiosPublic.get<StepRecruitmentResponse>(
    "/api/v1/staff-recruitment/recommendation",
    {
      params: {
        region,
      },
    }
  );
  return response.data.staffRecruitmentPosts;
};
