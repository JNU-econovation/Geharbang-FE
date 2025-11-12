import { router } from "expo-router";

import { useCreateApplication } from "@/src/hooks/application/useCreateApplication";
import { useUploadImage } from "@/src/hooks/application/useUploadImage";
import { useApplicationSlice } from "@/src/stores/slices/useApplicationSlice";
import { useApplicationFormValidation } from "./useApplicationFormValidation";

export const useHandleCreate = () => {
  const { data, imageFile } = useApplicationSlice();

  const { validateForm } = useApplicationFormValidation({
    data,
    imageFile,
    step: 2,
  });

  const uploadMutation = useUploadImage();
  const createMutation = useCreateApplication();

  const handleCreate = async () => {
    if (validateForm()) {
      router.replace({
        pathname: "/application/create/result",
        params: { status: "pending" },
      });

      try {
        await uploadMutation.mutateAsync(imageFile);
        const latestData = useApplicationSlice.getState().data;
        await createMutation.mutateAsync(latestData);

        router.setParams({ status: "success" });
      } catch (e) {
        console.error("제출 오류:", e);
        router.setParams({ status: "error" });
      }
    }
  };

  return handleCreate;
};
