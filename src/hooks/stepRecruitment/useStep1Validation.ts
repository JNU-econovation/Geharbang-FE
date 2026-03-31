import { useFormValidation } from "@/src/hooks/common/useFormValidation";
import { Step1Data } from "@/src/types/models/stepRecruitment/Step1Data";
import { Step1FormErrors } from "@/src/types/models/stepRecruitment/Step1FormErrors";

import { stepRecruitmentValidationStep1 } from "@/src/utils/stepRecruitment/stepRecruitmentValidationStep1";

export const useStep1FormValidation = (stepPostData: Step1Data) => {
  return useFormValidation<Step1Data, Step1FormErrors>({
    formData: stepPostData,
    step: 1,
    initialErrors: {
      guestHouseName: "",
      workingRegion: "",
      location: "",
    },
    validators: {
      1: (data, errors) => stepRecruitmentValidationStep1(data, errors),
    },
  });
};
