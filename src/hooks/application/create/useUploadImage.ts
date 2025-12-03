import { useMutation } from "@tanstack/react-query";

import { uploadImage } from "@/src/services/application/uploadImage";
import { useApplicationSlice } from "@/src/stores/slices/useApplicationSlice";
import { File } from "@/src/types/File";

export const useUploadImage = () => {
  const { setApplicationData } = useApplicationSlice();
  return useMutation<string, Error, File>({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setApplicationData("imageUrl", data);
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
