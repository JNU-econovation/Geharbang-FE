import { axiosPrivate } from "../api/customAxios";
import { File } from "@/src/types/File";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();

  formData.append("image", file );
  const response = await axiosPrivate.post(
    "/api/v1/application/images",
    formData
  );

  return response.data.imageUrl;
};
