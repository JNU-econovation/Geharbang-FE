import { Room, Step4Data } from "@/src/types/models/guestHouse/enroll";
import { useState } from "react";

type ValidatableRoom = Omit<Room, "type"> & {
  type: Room["type"] | null;
};

interface FormErrors {
  rooms: string;
}

interface RoomAllErrors {
  name: string;
  type: string;
  occupancy: string;
  checkInTime: string;
  checkOutTime: string;
  price: string;
  images: string;
}

const initialRoomErrors: RoomAllErrors = {
  name: "",
  type: "",
  occupancy: "",
  checkInTime: "",
  checkOutTime: "",
  price: "",
  images: "",
};

export function useGuestHouseStep4Validation(
  step4Data: { rooms: ValidatableRoom[] } | Step4Data
) {
  const [errors, setErrors] = useState<FormErrors>({
    rooms: "",
  });

  const [roomErrors, setRoomErrors] =
    useState<RoomAllErrors>(initialRoomErrors);

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const clearRoomError = (field: keyof RoomAllErrors) => {
    setRoomErrors((prev) => ({ ...prev, [field]: "" }));
  };

  //개별 필드 검사
  const validateRoomField = (
    room: ValidatableRoom,
    field: "name" | "price"
  ): void => {
    let errorMsg = "";

    if (field === "name") {
      if (!room.name || room.name.trim() === "") {
        errorMsg = "객실명을 입력해주세요";
      } else if (room.name.length < 1 || room.name.length > 20) {
        errorMsg = "객실명은 1~20자 사이로 입력해주세요";
      }
    }

    if (field === "price") {
      if (!room.price || room.price.trim() === "") {
        errorMsg = "1박 가격을 입력해주세요";
      } else {
        const priceNumber = parseInt(room.price.replace(/[^0-9]/g, ""), 10);
        if (isNaN(priceNumber)) {
          errorMsg = "유효한 가격을 입력해주세요";
        } else if (priceNumber <= 0) {
          errorMsg = "가격은 0원보다 커야 합니다";
        } else if (priceNumber > 10000000) {
          errorMsg = "가격이 너무 높습니다 (최대 10,000,000원)";
        }
      }
    }

    setRoomErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  // 저장 버튼용: 모든 필드 검사
  const validateRoomForm = (room: ValidatableRoom): boolean => {
    let isValid = true;
    const newErrors: RoomAllErrors = { ...initialRoomErrors };

    if (!room.name || room.name.trim() === "") {
      newErrors.name = "객실명을 입력해주세요";
      isValid = false;
    } else if (room.name.length < 1 || room.name.length > 20) {
      newErrors.name = "객실명은 1~20자 사이로 입력해주세요";
      isValid = false;
    }

    if (!room.type) {
      newErrors.type = "객실 타입을 선택해주세요";
      isValid = false;
    }

    if (!room.occupancy) {
      newErrors.occupancy = "객실 인원을 입력해주세요";
      isValid = false;
    } else {
      const occupancyNumber = parseInt(room.occupancy.replace(/[^0-9]/g, ""), 10);
      if (isNaN(occupancyNumber)) {
        newErrors.occupancy = "유효한 객실 인원을 입력해주세요";
        isValid = false;
      } else if (occupancyNumber <= 0) {
        newErrors.occupancy = "객실 인원은 1명 이상이어야 합니다";
        isValid = false;
      } else if (occupancyNumber > 99) {
        newErrors.occupancy = "객실 인원이 너무 많습니다";
        isValid = false;
      }
    }

    if (!room.checkInTime) {
      newErrors.checkInTime = "입실 시간을 입력해주세요";
      isValid = false;
    }
    if (!room.checkOutTime) {
      newErrors.checkOutTime = "퇴실 시간을 입력해주세요";
      isValid = false;
    }

    if (!room.price || room.price.trim() === "") {
      newErrors.price = "1박 가격을 입력해주세요";
      isValid = false;
    } else {
      const priceNumber = parseInt(room.price.replace(/[^0-9]/g, ""), 10);
      if (isNaN(priceNumber)) {
        newErrors.price = "유효한 가격을 입력해주세요";
        isValid = false;
      } else if (priceNumber <= 0) {
        newErrors.price = "가격은 0원보다 커야 합니다";
        isValid = false;
      } else if (priceNumber > 10000000) {
        newErrors.price = "가격이 너무 높습니다 (최대 10,000,000원)";
        isValid = false;
      }
    }

    if (!room.images || room.images.length === 0) {
      newErrors.images = "객실 사진을 최소 1장 이상 등록해주세요";
      isValid = false;
    } else if (room.images.length > 10) {
      newErrors.images = "사진은 최대 10장까지 등록할 수 있습니다";
      isValid = false;
    }

    setRoomErrors(newErrors);
    return isValid;
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = { rooms: "" };

    const { rooms } = step4Data;

    if (!rooms || rooms.length === 0) {
      newErrors.rooms = "객실을 최소 1개 이상 등록해주세요";
      isValid = false;
      setErrors(newErrors);
      return isValid;
    }

    const roomNames = rooms.map((r) => r.name);
    const duplicateNames = roomNames.filter(
      (name, index) => roomNames.indexOf(name) !== index
    );
    if (duplicateNames.length > 0) {
      newErrors.rooms = "이미 사용 중인 객실명입니다";
      isValid = false;
      setErrors(newErrors);
      return isValid;
    }

    for (const room of rooms) {
      const roomValid = validateRoomForm(room);
      if (!roomValid) {
        newErrors.rooms = "등록된 객실 정보를 확인해주세요";
        isValid = false;
        break;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  return {
    errors,
    clearError,
    validateForm,
    roomErrors,
    clearRoomError,
    validateRoomField,
    validateRoomForm,
  };
}
