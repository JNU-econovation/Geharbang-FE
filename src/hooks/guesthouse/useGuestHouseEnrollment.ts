import { createGuestHouseEnrollment } from '@/src/services/guestHouse/createGuestHouseEnrollment';
import { uploadGuestHouseImages } from '@/src/services/guestHouse/uploadGuestHouseImages';
import { File } from '@/src/types/File';
import { GuestHouseEnrollData } from '@/src/types/models/guestHouse/enroll';
import { transformEnrollDataToRequest } from '@/src/utils/guestHouse/enrollDataTransformer';
import { useMutation } from '@tanstack/react-query';

export const useGuestHouseEnrollment = () => {
  const uploadImages = async (files: File[]): Promise<File[]> => {
    if (files.length === 0) return [];

    const alreadyUploaded: File[] = [];
    const needsUpload: File[] = [];

    files.forEach((file) => {
      if (typeof file === 'object' && 'uri' in file) {
        if (!file.uri.startsWith('file://')) {
          alreadyUploaded.push(file);
        } else {
          needsUpload.push(file);
        }
      } else {
        needsUpload.push(file);
      }
    });

    if (needsUpload.length > 0) {
      const uploadedUrls = await uploadGuestHouseImages(needsUpload);
      const uploadedFiles = uploadedUrls.map((uri, index) => ({
        uri,
        type: needsUpload[index]?.type || 'image/jpeg',
        name: needsUpload[index]?.name || `image-${index}.jpg`,
      }));
      return [...alreadyUploaded, ...uploadedFiles];
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
          })),
        );
      }

      if (processedData.rooms.length > 0) {
        processedData.rooms = await Promise.all(
          processedData.rooms.map(async (room) => ({
            ...room,
            images: await uploadImages(room.images),
          })),
        );
      }

      const requestData = transformEnrollDataToRequest(processedData);
      const guestHouseId = await createGuestHouseEnrollment(requestData);

      return guestHouseId;
    },
    onError: (error: Error) => {
      console.error('게스트하우스 등록 에러:', error);
    },
  });

  return mutation;
};
