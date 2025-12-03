import { uploadImage } from "@/src/services/application/uploadImage";
import { useApplicationSlice } from "@/src/stores/application/useApplicationSlice";
import { File } from "@/src/types/File";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
  const { setUpdate } = useApplicationSlice();
  return useMutation<string, Error, File>({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setUpdate("imageUrl", data);
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
