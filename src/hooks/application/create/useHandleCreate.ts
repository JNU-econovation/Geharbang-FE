import { router } from "expo-router";

import { useUploadImage } from "@/src/hooks/application/create/useUploadImage";
import { useApplicationSlice } from "@/src/stores/slices/application/useApplicationSlice";
import { useApplicationFormValidation } from "./useApplicationFormValidation";
import { useCreateApplication } from "./useCreateApplication";

export const useHandleCreate = () => {
  const { applicationData, imageFile } = useApplicationSlice();

  const { validateForm } = useApplicationFormValidation(
    applicationData,
    imageFile,
    2
  );

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
        const latestData = useApplicationSlice.getState().applicationData;
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
