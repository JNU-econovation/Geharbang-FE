import { axiosPrivate } from "@/src/services/api/AxiosPrivate";
import { File } from "@/src/types/File";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();

  formData.append("image", file as any);
  const response = await axiosPrivate.post(
    "/api/v1/application/images",
    formData
  );

  return response.data.imageUrl;
};