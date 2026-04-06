import { createGuestHouseEnrollment } from "@/src/services/guestHouse/createGuestHouseEnrollment";
import { uploadGuestHouseImages } from "@/src/services/guestHouse/uploadGuestHouseImages";
import { File } from "@/src/types/File";
import { GuestHouseEnrollData } from "@/src/types/models/guestHouse/enroll";
import { transformEnrollDataToRequest } from "@/src/utils/guestHouse/enrollDataTransformer";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Alert } from "react-native";

export const useGuestHouseEnrollment = () => {
  const uploadImages = async (files: File[]): Promise<File[]> => {
    if (files.length === 0) return [];

    const alreadyUploaded: File[] = [];
    const needsUpload: File[] = [];

    files.forEach((file) => {
      if (typeof file === "object" && "uri" in file) {
        if (!file.uri.startsWith("file://")) {
          alreadyUploaded.push(file);
        } else {
          needsUpload.push(file);
        }
      } else {
        needsUpload.push(file);
      }
    });

    if (needsUpload.length > 0) {
      try {
        const uploadedUrls = await uploadGuestHouseImages(needsUpload);

        if (uploadedUrls.length !== needsUpload.length) {
          throw new Error(
            `이미지 업로드 실패: ${needsUpload.length}개 중 ${uploadedUrls.length}개만 업로드되었습니다.`
          );
        }

        const uploadedFiles = uploadedUrls.map((uri, index) => ({
          uri,
          type: needsUpload[index]?.type || "image/jpeg",
          name: needsUpload[index]?.name || `image-${index}.jpg`,
        }));
        return [...alreadyUploaded, ...uploadedFiles];
      } catch (error) {
        console.error("이미지 업로드 에러:", error);
        throw new Error(
          "이미지 업로드 중 오류가 발생했습니다. 네트워크 연결을 확인하고 다시 시도해주세요."
        );
      }
    }

    return alreadyUploaded;
  };

  const mutation = useMutation({
    mutationFn: async (data: GuestHouseEnrollData): Promise<number> => {
      const processedData = { ...data };

      if (processedData.mainImages.length > 0) {
        processedData.mainImages = await uploadImages(processedData.mainImages);
      }

      if (processedData.parties.length > 0) {
        processedData.parties = await Promise.all(
          processedData.parties.map(async (party) => ({
            ...party,
            images: await uploadImages(party.images),
          }))
        );
      }

      if (processedData.rooms.length > 0) {
        processedData.rooms = await Promise.all(
          processedData.rooms.map(async (room) => ({
            ...room,
            images: await uploadImages(room.images),
          }))
        );
      }

      const requestData = transformEnrollDataToRequest(processedData);
      const guestHouseId = await createGuestHouseEnrollment(requestData);

      return guestHouseId;
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        Alert.alert('인증 필요', '게스트하우스 등록은 인증서 심사가 완료된 사장님만 가능합니다.');
        return;
      }
      console.error("게스트하우스 등록 에러:", error);
    },
  });

  return mutation;
};
