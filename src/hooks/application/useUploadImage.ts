import { uploadImage } from "@/src/services/Application/uploadImage";
import { useApplicationSlice } from "@/src/stores/slices/useApplicationSlice";
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
      console.log(err);
    },
  });
};
