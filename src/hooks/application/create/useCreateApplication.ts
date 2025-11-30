import { createApplication } from "@/src/services/Application/createApplication";
import { ApplicationData } from "@/src/types/models/ApplicationData";
import { useMutation } from "@tanstack/react-query";

export const useCreateApplication = () => { 
  return useMutation<number, Error, ApplicationData>({
    mutationFn: createApplication,
    onError: (err) => {
      console.error(err);
    },
  });
}; 