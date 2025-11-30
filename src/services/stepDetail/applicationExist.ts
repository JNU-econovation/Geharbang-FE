import { axiosPrivate } from "../api/customAxios";

export const getIsApplicationExist = async (): Promise<boolean> => {
  const response = await axiosPrivate.get("/api/v1/application/my/exist");
  return response.data;
};
