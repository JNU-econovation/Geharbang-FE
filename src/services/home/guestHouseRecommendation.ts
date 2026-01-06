import { guestHouseRecommendationCard } from "@/src/types/models/home/GuestHouseCard";
import { axiosPublic } from "../api/customAxios";

type GuestHouseRecommendationResponse = {
  guestHouseRecommendation: guestHouseRecommendationCard[];
};

export const getGuestHouseRecommendation = async (region: string) => {
  const response = await axiosPublic.get<GuestHouseRecommendationResponse>(
    "/api/v1/guest-houses/recommendation",
    {
      params: {
        region,
      },
    }
  );
  return response.data.guestHouseRecommendation;
};
