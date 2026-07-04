import { axiosPrivate } from "@/src/services/api/customAxios";
import { File } from "@/src/types/File";

export const uploadReviewImages = async (files: File[]): Promise<string[]> => {
  if (files.length === 0) {
    return [];
  }

  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file as unknown as Blob);
  });

  const response = await axiosPrivate.post<{ imageUrl: string[] }>(
    "/api/v1/images",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.imageUrl;
};
