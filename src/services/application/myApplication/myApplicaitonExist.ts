import { axiosPrivate } from "../../api/customAxios";

interface MyApplicationExist {
  isExist: boolean;
}

export const getMyApplicationExist = async () => {
  const response = await axiosPrivate.get<MyApplicationExist>(
    "/api/v1/application/my"
  );

  return response.data;
};
