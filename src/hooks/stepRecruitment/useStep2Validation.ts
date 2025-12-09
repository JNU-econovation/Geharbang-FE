import { useFormValidation } from "@/src/hooks/common/useFormValidation";
import { Step2Data } from "@/src/types/models/stepRecruitment/Step2Data";
import { Step2FormErrors } from "@/src/types/models/stepRecruitment/Step2FormErrors";
import { stepRecruitmentValidationStep2 } from "@/src/utils/stepRecruitment/stepRecruitmentValidationStep2";

export const useStep2FormValidation = (stepPostData: Step2Data) => {
  return useFormValidation<Step2Data, Step2FormErrors>({
    formData: stepPostData,
    step: 2,
    initialErrors: {
      workingStartDate: "",
      workingPeriod: "",
      workingTimeAndWork: [
        {
          workingTimeName: "",
          startTime: "",
          endTime: "",
          thatTimeWork: "",
          perWorkingDay: "",
          workingCount: "",
          closedCount: "",
        },
      ],
      gender: "",
    },
    validators: {
      2: (data, errors) => stepRecruitmentValidationStep2(data, errors),
    },
  });
};
