import { Room, Step3Data } from '@/src/types/models/guestHouse/enroll';
import { useState } from 'react';

interface FormErrors {
  rooms: string;
}

interface RoomFieldErrors {
  name: string;
  type: string;
  occupancy: string;
  checkInTime: string;
  checkOutTime: string;
  price: string;
  images: string;
}

export function useGuestHouseStep3Validation(step3Data: Step3Data) {
  const [errors, setErrors] = useState<FormErrors>({
    rooms: '',
  });

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateRoom = (room: Room): string | null => {
    if (!room.name || room.name.trim() === '') {
      return '객실명을 입력해주세요';
    }
    if (room.name.length < 1 || room.name.length > 20) {
      return '객실명은 1~20자 사이로 입력해주세요';
    }

    if (!room.type) {
      return '객실 타입을 선택해주세요';
    }

    if (!room.occupancy) {
      return '객실 인원을 선택해주세요';
    }

    if (!room.checkInTime || !room.checkOutTime) {
      return '입실/퇴실 시간을 입력해주세요';
    }

    if (!room.price || room.price.trim() === '') {
      return '1박 가격을 입력해주세요';
    }

    const priceNumber = parseInt(room.price.replace(/[^0-9]/g, ''), 10);
    if (isNaN(priceNumber)) {
      return '유효한 가격을 입력해주세요';
    }

    if (priceNumber <= 0) {
      return '가격은 0원보다 커야 합니다';
    }

    if (priceNumber > 10000000) {
      return '가격이 너무 높습니다 (최대 10,000,000원)';
    }

    if (!room.images || room.images.length === 0) {
      return '객실 사진을 최소 1장 이상 등록해주세요';
    }
    if (room.images.length > 10) {
      return '사진은 최대 10장까지 등록할 수 있습니다';
    }

    return null;
  };

  const validateRoomFields = (room: Room): RoomFieldErrors => {
    const fieldErrors: RoomFieldErrors = {
      name: '',
      type: '',
      occupancy: '',
      checkInTime: '',
      checkOutTime: '',
      price: '',
      images: '',
    };

    if (!room.name || room.name.trim() === '') {
      fieldErrors.name = '객실명을 입력해주세요';
    } else if (room.name.length < 1 || room.name.length > 20) {
      fieldErrors.name = '객실명은 1~20자 사이로 입력해주세요';
    }

    if (!room.type) {
      fieldErrors.type = '객실 타입을 선택해주세요';
    }

    if (!room.occupancy) {
      fieldErrors.occupancy = '객실 인원을 선택해주세요';
    }

    if (!room.checkInTime) {
      fieldErrors.checkInTime = '입실 시간을 입력해주세요';
    }
    if (!room.checkOutTime) {
      fieldErrors.checkOutTime = '퇴실 시간을 입력해주세요';
    }

    if (!room.price || room.price.trim() === '') {
      fieldErrors.price = '1박 가격을 입력해주세요';
    } else {
      const priceNumber = parseInt(room.price.replace(/[^0-9]/g, ''), 10);
      if (isNaN(priceNumber)) {
        fieldErrors.price = '유효한 가격을 입력해주세요';
      } else if (priceNumber <= 0) {
        fieldErrors.price = '가격은 0원보다 커야 합니다';
      } else if (priceNumber > 10000000) {
        fieldErrors.price = '가격이 너무 높습니다 (최대 10,000,000원)';
      }
    }

    if (!room.images || room.images.length === 0) {
      fieldErrors.images = '객실 사진을 최소 1장 이상 등록해주세요';
    } else if (room.images.length > 10) {
      fieldErrors.images = '사진은 최대 10장까지 등록할 수 있습니다';
    }

    return fieldErrors;
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {
      rooms: '',
    };

    const { rooms } = step3Data;

    if (!rooms || rooms.length === 0) {
      newErrors.rooms = '객실을 최소 1개 이상 등록해주세요';
      isValid = false;
      setErrors(newErrors);
      return isValid;
    }

    const roomNames = rooms.map((r) => r.name);
    const duplicateNames = roomNames.filter(
      (name, index) => roomNames.indexOf(name) !== index,
    );
    if (duplicateNames.length > 0) {
      newErrors.rooms = '이미 사용 중인 객실명입니다';
      isValid = false;
      setErrors(newErrors);
      return isValid;
    }

    for (const room of rooms) {
      const roomError = validateRoom(room);
      if (roomError) {
        newErrors.rooms = roomError;
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
    validateRoom,
    validateRoomFields,
  };
}
