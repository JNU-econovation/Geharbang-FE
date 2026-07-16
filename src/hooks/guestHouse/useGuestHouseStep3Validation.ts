import { Step3Data } from "@/src/types/models/guestHouse/enroll";
import { useState } from "react";

interface PartyAllErrors {
  type: string;
  customTypeName: string;
  images: string;
  startTime: string;
  endTime: string;
  days: string;
  location: string;
  mood: string;
  allowExternal: string;
  guestFee: string;
  externalFee: string;
  description: string;
}

type TextInputPartyField =
  | "customTypeName"
  | "location"
  | "mood"
  | "guestFee"
  | "externalFee"
  | "description";

interface PartyFormData {
  type: string;
  customTypeName: string;
  images: any[];
  startTime: Date;
  endTime: Date;
  days: string[];
  location: string;
  mood: string;
  allowExternal: boolean | null;
  guestFee: string;
  externalFee: string;
  description: string;
}

const initialPartyErrors: PartyAllErrors = {
  type: "",
  customTypeName: "",
  images: "",
  startTime: "",
  endTime: "",
  days: "",
  location: "",
  mood: "",
  allowExternal: "",
  guestFee: "",
  externalFee: "",
  description: "",
};

export function useGuestHouseStep3Validation(_step3Data: Step3Data) {
  const [partyErrors, setPartyErrors] =
    useState<PartyAllErrors>(initialPartyErrors);

  const validateForm = (): boolean => true;

  const clearPartyError = (field: keyof PartyAllErrors) => {
    setPartyErrors((prev) => ({ ...prev, [field]: "" }));
  };

  //개별 필드 검사
  const validatePartyField = (
    party: PartyFormData,
    field: TextInputPartyField,
  ): void => {
    let errorMsg = "";

    if (field === "customTypeName") {
      if (party.type === "기타") {
        if (!party.customTypeName || party.customTypeName.trim() === "") {
          errorMsg = "파티명을 입력해주세요";
        } else if (
          party.customTypeName.length < 1 ||
          party.customTypeName.length > 20
        ) {
          errorMsg = "파티명은 1~20자 사이로 입력해주세요";
        }
      }
    }

    if (field === "location") {
      if (!party.location || party.location.trim() === "") {
        errorMsg = "파티장소를 입력해주세요";
      } else if (party.location.length < 1 || party.location.length > 20) {
        errorMsg = "파티 장소는 1~20자 사이로 입력해주세요";
      }
    }

    if (field === "mood" ) {
      if (!party.mood || party.mood.trim() === "") {
        errorMsg = "파티분위기를 입력해주세요";
      } else if (party.mood.length < 1 || party.mood.length > 20) {
        errorMsg = "파티 분위기는 1~20자 사이로 입력해주세요";
      }
    }

    if (field === "guestFee") {
      if (!party.guestFee || party.guestFee.trim() === "") {
        errorMsg = "숙박객 피티비를 입력해주세요";
      } else {
        const priceNumber = parseInt(party.guestFee.replace(/[^0-9]/g, ""), 10);
        if (isNaN(priceNumber)) {
          errorMsg = "유효한 가격을 입력해주세요";
        } else if (priceNumber > 10000000) {
          errorMsg = "가격이 너무 높습니다 (최대 10,000,000원)";
        }
      }
    }

    if (field === "externalFee" && party.allowExternal) {
      if (!party.externalFee || party.externalFee.trim() === "") {
        errorMsg = "외부인 파티비를 입력해주세요";
      }
    }

    if (field === "description") {
      if (!party.description || party.description.trim() === "") {
        errorMsg = "파티 설명을 입력해주세요";
      } else if (party.description.length < 10) {
        errorMsg = "파티 설명은 최소 10자 이상 입력해주세요";
      } else if (party.description.length > 500) {
        errorMsg = "파티 설명은 500자 이내로 입력해주세요";
      }
    }

    setPartyErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  // 저장 버튼용: 모든 필드 검사
  const validatePartyForm = (party: PartyFormData): boolean => {
    let isValid = true;
    const newErrors: PartyAllErrors = { ...initialPartyErrors };

    const {
      type,
      customTypeName,
      images,
      startTime,
      endTime,
      days,
      location,
      mood,
      allowExternal,
      guestFee,
      externalFee,
      description,
    } = party;

    if (!type || type.trim() === "") {
      newErrors.type = "파티 종류를 선택해주세요";
      isValid = false;
    } else if (type === "기타") {
      if (!customTypeName || customTypeName.trim() === "") {
        newErrors.customTypeName = "기타 파티명을 입력해주세요";
        isValid = false;
      } else if (customTypeName.length < 1 || customTypeName.length > 20) {
        newErrors.customTypeName = "파티명은 1~20자 사이로 입력해주세요";
        isValid = false;
      }
    }

    if (!images || images.length === 0) {
      newErrors.images = "파티 사진을 최소 1장 이상 등록해주세요";
      isValid = false;
    } else if (images.length > 10) {
      newErrors.images = "사진은 최대 10장까지 등록할 수 있습니다";
      isValid = false;
    }

    if (!startTime) {
      newErrors.startTime = "시작 시간을 입력해주세요";
      isValid = false;
    }
    if (!endTime) {
      newErrors.endTime = "종료 시간을 입력해주세요";
      isValid = false;
    }

    if (!days || days.length === 0) {
      newErrors.days = "파티 진행 요일을 선택해주세요";
      isValid = false;
    }

    if (!location || location.trim() === "") {
      newErrors.location = "파티 장소를 입력해주세요";
      isValid = false;
    } else if (location.length < 1 || location.length > 20) {
      newErrors.location = "파티 장소는 1~20자 사이로 입력해주세요";
      isValid = false;
    }

    if (!mood || mood.trim() === "") {
      newErrors.mood = "파티 분위기를 입력해주세요";
      isValid = false;
    } else if (mood.length < 1 || mood.length > 20) {
      newErrors.mood = "파티 분위기는 1~20자 사이로 입력해주세요";
      isValid = false;
    }

    if (allowExternal === null) {
      newErrors.allowExternal = "외부인 참여 가능 여부를 선택해주세요";
      isValid = false;
    }

    if (!guestFee || guestFee.trim() === "") {
      newErrors.guestFee = "숙박객 파티비를 입력해주세요";
      isValid = false;
    }
    if (allowExternal && (!externalFee || externalFee.trim() === "")) {
      newErrors.externalFee = "외부인 파티비를 입력해주세요";
      isValid = false;
    }

    if (!description || description.trim() === "") {
      newErrors.description = "파티 설명을 입력해주세요";
      isValid = false;
    } else if (description.length < 10) {
      newErrors.description = "파티 설명은 최소 10자 이상 입력해주세요";
      isValid = false;
    } else if (description.length > 500) {
      newErrors.description = "파티 설명은 500자 이내로 입력해주세요";
      isValid = false;
    }

    setPartyErrors(newErrors);
    return isValid;
  };

  return {
    validateForm,
    partyErrors,
    clearPartyError,
    validatePartyField,
    validatePartyForm,
  };
}
