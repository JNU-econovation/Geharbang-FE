import { Room, Step3Data } from '@/src/types/models/guestHouse/enroll';
import { useState } from 'react';

interface FormErrors {
  rooms: string;
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
    if (room.checkInTime >= room.checkOutTime) {
      return '퇴실 시간은 입실 시간보다 늦어야 합니다';
    }

    if (!room.price || room.price.trim() === '') {
      return '1박 가격을 입력해주세요';
    }

    if (!room.images || room.images.length === 0) {
      return '객실 사진을 최소 1장 이상 등록해주세요';
    }
    if (room.images.length > 10) {
      return '사진은 최대 10장까지 등록할 수 있습니다';
    }

    return null;
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
  };
}
