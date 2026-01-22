import { axiosPrivate } from "../../api/customAxios";

type MyInfomationResponse = {
  name: string;
  imageUrl: string;
  isOwer: boolean;
  inReview: boolean;
};

export const getMyInfomation = async () => {
  const response = await axiosPrivate.get<MyInfomationResponse>(
    "/api/v1/user/profile"
  );

  return response.data;
};
