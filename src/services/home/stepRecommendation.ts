import { guestHouseRecommendationCard } from "@/src/types/models/home/GuestHouseCard";
import { axiosPublic } from "../api/customAxios";

type StepRecommendationResponse = {
  staffRecruitmentPosts: guestHouseRecommendationCard[];
};

export const getStepRecommendation = async (region: string) => {
  const response = await axiosPublic.get<StepRecommendationResponse>(
    "/api/v1/staff-recruitment/recommendation",
    {
      params: {
        region,
      },
    },
  );
  return response.data.staffRecruitmentPosts;
};
