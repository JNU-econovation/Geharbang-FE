import { createApplication } from "@/src/services/application/createApplication";
import { ApplicationData } from "@/src/types/models/application/ApplicationData";
import { useMutation } from "@tanstack/react-query";

export const useCreateApplication = () => {
  return useMutation<number, Error, ApplicationData>({
    mutationFn: createApplication,
    onError: (err) => {
      console.error(err);
    },
  });
};
