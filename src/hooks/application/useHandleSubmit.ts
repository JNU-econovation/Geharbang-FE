import { router } from "expo-router";

import { useSubmitApplication } from "@/src/hooks/application/useSubmitApplication";
import { useUploadImage } from "@/src/hooks/application/useUploadImage";
import { useApplicationSlice } from "@/src/stores/slices/useApplicationSlice";
import { useApplicationFormValidation } from "./useApplicationFormValidation";

export const useHandleSubmit = () => {
  const { data, imageFile } = useApplicationSlice();

  const { validateForm } = useApplicationFormValidation({
    data,
    imageFile,
    step: 2,
  });

  const uploadMutation = useUploadImage();
  const submitMutation = useSubmitApplication();

  const handleSubmit = async () => {
    if (validateForm()) {
      router.replace({
        pathname: "/application/create/result",
        params: { status: "pending" },
      });

      try {
        await uploadMutation.mutateAsync(imageFile);
        const latestData = useApplicationSlice.getState().data;
        await submitMutation.mutateAsync(latestData);

        router.setParams({ status: "success" });
      } catch (e) {
        console.error("제출 오류:", e);
        router.setParams({ status: "error" });
      }
    }
  };

  return handleSubmit
};
