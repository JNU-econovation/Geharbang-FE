import { StepPostData } from "@/src/types/models/application/StepPostData";
import { StepPostFormErrors } from "@/src/types/models/stepPost/StepPostFormErrors";

export const stepPostValidationStep2 = (
  data: StepPostData,
  currentErrors: StepPostFormErrors
): { isValid: boolean; errors: StepPostFormErrors } => {
  let isValid = true;
  const newErrors: StepPostFormErrors = { ...currentErrors };

  if (!data.workingStartDate) {
    newErrors.workingStartDate = "근무 시작일을 선택해주세요.";
    isValid = false;
  }

  if (data.workingPeriod === "") {
    newErrors.workingPeriod = "근무 기간을 선택해주세요.";
    isValid = false;
  }

  if (data.gender === "") {
    newErrors.gender = "성별을 선택해주세요.";
    isValid = false;
  }

  if (!data.workingTimeAndWork || data.workingTimeAndWork.length === 0) {
    newErrors.workingTimeAndWork = [
      {
        workingTimeName: "근무 조 이름을 입력해주세요.",
        startTime: "근무 시작 시간을 입력해주세요.",
        endTime: "근무 종료 시간을 입력해주세요.",
        thatTimeWork: "해당 시간대 업무를 입력해주세요.",
        perWorkingDay: "근무일 기준을 선택해주세요.",
        workingCount: "근무일 수를 입력해주세요.",
        closedCount: "휴무일 수를 입력해주세요.",
      },
    ];
    isValid = false;
  } else {
    newErrors.workingTimeAndWork = data.workingTimeAndWork.map((item) => {
      const err = {
        workingTimeName: "",
        startTime: "",
        endTime: "",
        thatTimeWork: "",
        perWorkingDay: "",
        workingCount: "",
        closedCount: "",
      };

      if (!item.workingTimeName) {
        err.workingTimeName = "근무 조 이름을 입력해주세요.";
        isValid = false;
      }

      if (!item.thatTimeWork) {
        err.thatTimeWork = "해당 시간대 업무를 입력해주세요.";
        isValid = false;
      }

      if (!item.perWorkingDay) {
        err.perWorkingDay = "근무일 기준을 선택해주세요.";
        isValid = false;
      }

      if (!item.workingCount) {
        err.workingCount = "근무일 수를 입력해주세요.";
        isValid = false;
      }

      if (!item.closedCount) {
        err.closedCount = "휴무일 수를 입력해주세요.";
        isValid = false;
      }

      return err;
    });
  }

  return { isValid, errors: newErrors };
};
