import { axiosPrivate } from "@/src/services/api/customAxios";
import { ApplicationData } from "@/src/types/models/application/ApplicationData";

export const createApplication = async (
  data: ApplicationData
): Promise<number> => {
  const response = await axiosPrivate.post("/api/v1/application", data);
  return response.data.applicationId;
};
