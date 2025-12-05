import { useFormValidation } from "@/src/hooks/common/useFormValidation";
import { StepRecruitmentData } from "@/src/types/models/stepRecruitment/StepRecruitmentData";
import { StepRecruitmentFormErrors } from "@/src/types/models/stepRecruitment/StepRecruitmentFormErrors";
import { stepRecruitmentValidationStep1 } from "@/src/utils/stepRecruitment/stepRecruitmentValidationStep1";
import { stepRecruitmentValidationStep2 } from "@/src/utils/stepRecruitment/stepRecruitmentValidationStep2";

export const useStepRecruitmentFormValidation = (
  stepPostData: StepRecruitmentData,
  step?: number
) => {
  return useFormValidation<StepRecruitmentData, StepRecruitmentFormErrors>({
    formData: stepPostData,
    step,
    initialErrors: {
      guestHouseName: "",
      workingRegion: "",
      location: "",
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
      1: (data, errors) => stepRecruitmentValidationStep1(data, errors),
      2: (data, errors) => stepRecruitmentValidationStep2(data, errors),
    },
  });
};
