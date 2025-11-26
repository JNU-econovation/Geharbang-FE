import { submitApplication } from "@/src/services/Application/submitApplication";
import { ApplicationData } from "@/src/types/models/ApplicationData";
import { useMutation } from "@tanstack/react-query";

export const useSubmitApplication = () => { 
  return useMutation<number, Error, ApplicationData>({
    mutationFn: submitApplication,
    onError: (err) => {
      console.error(err);
    },
  });
}; 