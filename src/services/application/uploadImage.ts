import { File } from "@/src/types/File";
import { axiosPrivate } from "../api/customAxios";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();

  formData.append("image", file);
  const response = await axiosPrivate.post(
    "/api/v1/application/images",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.imageUrl;
};
