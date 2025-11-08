import { axiosPrivate } from "@/src/services/api/AxiosPrivate";
import { ApplicationData } from "@/src/types/models/ApplicationData";

export const submitApplication = async (
  data: ApplicationData
): Promise<number> => {
  const response = await axiosPrivate.post("/api/v1/application", data)
  return response.data.applicationId;
};
