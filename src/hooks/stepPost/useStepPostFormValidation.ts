import { useFormValidation } from "@/src/hooks/common/useFormValidation";
import { StepPostData } from "@/src/types/models/application/StepPostData";
import { StepPostFormErrors } from "@/src/types/models/stepPost/StepPostFormErrors";
import { stepPostValidationStep1 } from "@/src/utils/stepPost/stepPostValidationStep1";
import { stepPostValidationStep2 } from "@/src/utils/stepPost/stepPostValidationStep2";

export const useStepPostFormValidation = (
  stepPostData: StepPostData,
  step?: number
) => {
  return useFormValidation<StepPostData, StepPostFormErrors>({
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
      1: (data, errors) => stepPostValidationStep1(data, errors),
      2: (data, errors) => stepPostValidationStep2(data, errors),
    },
  });
};
