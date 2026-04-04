import { useState } from "react";

import { Step2Data } from "@/src/types/models/stepRecruitment/Step2Data";
import {
  Step2FormErrors,
  WorkingTimeAndWorkErrors,
} from "@/src/types/models/stepRecruitment/Step2FormErrors";

const emptyItemError = (): WorkingTimeAndWorkErrors => ({
  workingTimeName: "",
  startTime: "",
  endTime: "",
  thatTimeWork: "",
  perWorkingDay: "",
  workingCount: "",
  closedCount: "",
});

export function useStep2Validation(step2Data: Step2Data) {
  const [errors, setErrors] = useState<Step2FormErrors>({
    workingStartDate: "",
    workingPeriod: "",
    workingTimeAndWork: [],
    gender: "",
  });

  const clearError = (
    field: keyof Step2FormErrors,
    index?: number,
    subField?: keyof WorkingTimeAndWorkErrors,
  ) => {
    if (field === "workingTimeAndWork" && index !== undefined) {
      setErrors((prev) => {
        const arr = [...(prev.workingTimeAndWork ?? [])];
        if (!arr[index]) arr[index] = emptyItemError();
        if (subField) {
          arr[index] = { ...arr[index], [subField]: "" };
        } else {
          arr[index] = emptyItemError();
        }
        return { ...prev, workingTimeAndWork: arr };
      });
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const removeItemErrors = (index: number) => {
    setErrors((prev) => {
      const arr = [...(prev.workingTimeAndWork ?? [])];
      arr.splice(index, 1);
      return { ...prev, workingTimeAndWork: arr };
    });
  };

  const validateField = (
    field: keyof Step2FormErrors,
    index?: number,
    subField?: keyof WorkingTimeAndWorkErrors,
  ): void => {
    if (field === "workingTimeAndWork" && index !== undefined && subField) {
      const item = step2Data.workingTimeAndWork[index];
      if (!item) return;
      let errorMsg = "";

      if (subField === "workingTimeName") {
        if (!item.workingTimeName || item.workingTimeName.trim() === "") {
          errorMsg = "근무 조 이름을 입력해주세요.";
        }
      } else if (subField === "thatTimeWork") {
        if (!item.thatTimeWork || item.thatTimeWork.trim() === "") {
          errorMsg = "해당 시간대 업무를 입력해주세요.";
        }
      }

      setErrors((prev) => {
        const arr = [...(prev.workingTimeAndWork ?? [])];
        if (!arr[index]) arr[index] = emptyItemError();
        arr[index] = { ...arr[index], [subField]: errorMsg };
        return { ...prev, workingTimeAndWork: arr };
      });
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Step2FormErrors = {
      workingStartDate: "",
      workingPeriod: "",
      workingTimeAndWork: [],
      gender: "",
    };

    if (!step2Data.workingStartDate) {
      newErrors.workingStartDate = "근무 시작일을 선택해주세요.";
      isValid = false;
    }

    if (step2Data.workingPeriod === "") {
      newErrors.workingPeriod = "근무 기간을 선택해주세요.";
      isValid = false;
    }

    if (step2Data.gender === "") {
      newErrors.gender = "성별을 선택해주세요.";
      isValid = false;
    }

    if (step2Data.workingTimeAndWork.length === 0) {
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
      newErrors.workingTimeAndWork = step2Data.workingTimeAndWork.map(
        (item) => {
          const err = emptyItemError();

          if (!item.workingTimeName || item.workingTimeName.trim() === "") {
            err.workingTimeName = "근무 조 이름을 입력해주세요.";
            isValid = false;
          }

          if (item.startTime && item.endTime && item.endTime < item.startTime) {
            err.startTime = "종료 시간이 시작 시간보다 이전일 수 없습니다.";
            isValid = false;
          }

          if (!item.thatTimeWork || item.thatTimeWork.trim() === "") {
            err.thatTimeWork = "해당 시간대 업무를 입력해주세요.";
            isValid = false;
          }

          if (!item.perWorkingDay) {
            err.perWorkingDay = "근무일 기준을 선택해주세요.";
            isValid = false;
          }

          if (
            item.workingCount === "" ||
            item.workingCount === null ||
            item.workingCount === undefined
          ) {
            err.workingCount = "근무일 수를 입력해주세요.";
            isValid = false;
          }

          if (item.perWorkingDay !== "_7일_기준") {
            if (
              item.closedCount === "" ||
              item.closedCount === null ||
              item.closedCount === undefined
            ) {
              err.closedCount = "휴무일 수를 입력해주세요.";
              isValid = false;
            }
          }

          return err;
        },
      );
    }

    setErrors(newErrors);
    return isValid;
  };

  return { errors, clearError, removeItemErrors, validateForm, validateField };
}
