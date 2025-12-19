import { axiosPrivate } from "../api/customAxios";

interface ApplicationExistResponse {
  isExist: boolean;
}

export const getIsApplicationExist = async (): Promise<boolean> => {
  const response = await axiosPrivate.get<ApplicationExistResponse>("/api/v1/application/my/exist");
  return response.data.isExist;
};
