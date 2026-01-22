import { axiosPrivate } from "../../api/customAxios";

interface MyApplicationResponse {
  name: string;
  gender: string;
  phoneNumber: string;
  birthDate: string;
  availableStartDate: string;
  availableDayOfWeek: string[];
  introduction: string;
  mbti: string;
  instagramId: string;
  styles: string[];
  imageUrl: string;
}

export const getMyApplication = async () => {
  const response = await axiosPrivate.get<MyApplicationResponse>(
    "/api/v1/application/my"
  );

  return response.data;
};
