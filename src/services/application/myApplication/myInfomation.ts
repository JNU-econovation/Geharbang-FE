import { axiosPrivate } from "../../api/customAxios";

type MyInfomationResponse = {
  name: string;
  imageUrl: string;
  isOwner: boolean;
  inReview: boolean;
  isAdmin: boolean;
  certificateStatus: "검토_대기" | "승인_완료" | "거부됨" | null;
};

export const getMyInfomation = async () => {
  const response = await axiosPrivate.get<MyInfomationResponse>(
    "/api/v1/user/profile"
  );

  return response.data;
};
