import { useFormValidation } from "@/src/hooks/common/useFormValidation";
import { File } from "@/src/types/File";
import { ApplicationData } from "@/src/types/models/application/ApplicationData";
import { ApplicationFormErrors } from "@/src/types/models/application/ApplicationFormErrors";
import { applicationValidateStep1 } from "@/src/utils/application/applicationValidateStep1";
import { applicationValidateStep2 } from "@/src/utils/application/applicationValidateStep2";

export const useApplicationFormValidation = (
  applicationData: ApplicationData,
  imageFile: File,
  step?: number
) => {
  return useFormValidation<ApplicationData, ApplicationFormErrors>({
    formData: applicationData,
    step,
    initialErrors: {
      image: "",
      name: "",
      phoneNumber: "",
      birthDate: "",
      gender: "",
      availableStartDate: "",
      selfIntroduction: "",
      mbti: "",
      instagramId: "",
    },
    validators: {
      1: (data, errors) => applicationValidateStep1(data, imageFile, errors),
      2: (data, errors) => applicationValidateStep2(data, errors),
    },
  });
};
