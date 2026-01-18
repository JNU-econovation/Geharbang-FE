import { guestHouseRecommendationCard } from "@/src/types/models/home/GuestHouseCard";
import { axiosPrivate } from "../api/customAxios";

interface ProfileInfo {
  name: string;
  imageUrl: string;
}

interface Question {
  questionId: number;
  content: string;
}

interface ApiResponse {
  guesthouse: guestHouseRecommendationCard;
  profile: ProfileInfo;
  questions: Question[];
}

export const getOwnerQuestions = async (recruitmentId: number) => {
  const response = await axiosPrivate.get<ApiResponse>(
    `/api/v1/staff-recruitment/${recruitmentId}/questions`
  );
  return response.data;
};
