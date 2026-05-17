import { getGuestHouseDetail } from '@/src/services/guestHouseDetail/guestHouseDetail';
import { useGuestHouseStore } from '@/src/stores/guestHouse/useGuestHouseStore';
import { transformGuestHouseApiToStore } from '@/src/utils/guestHouse/transformGuestHouseApiToStore';
import { router } from 'expo-router';

export const useEditGuestHouse = () => {
  const {
    resetAllData,
    setEditingId,
    setStep1Update,
    setStep2Update,
    setStep3Update,
    setStep4Update,
    setStep5Update,
  } = useGuestHouseStore();

  const handleEditPress = async (id: number) => {
    try {
      const detail = await getGuestHouseDetail(String(id));
      const { step1Data, step2Data, step3Data, step4Data, step5Data } =
        transformGuestHouseApiToStore(detail);

      resetAllData();
      setEditingId(id);
      setStep1Update('guestHouseName', step1Data.guestHouseName);
      setStep1Update('workingRegion', step1Data.workingRegion);
      setStep1Update('location', step1Data.location);
      setStep2Update('mainImages', step2Data.mainImages);
      setStep2Update('introduction', step2Data.introduction);
      setStep2Update('facilities', step2Data.facilities);
      setStep2Update('atmosphere', step2Data.atmosphere);
      setStep3Update('parties', step3Data.parties);
      setStep4Update('rooms', step4Data.rooms);
      setStep5Update('instagram', step5Data.instagram);
      setStep5Update('phone', step5Data.phone);
      setStep5Update('website', step5Data.website);
      setStep5Update('ownerMessage', step5Data.ownerMessage);
      router.push('/guestHouse/enroll/step1');
    } catch (error) {
      console.error('게스트하우스 데이터 불러오기 실패:', error);
    }
  };

  return { handleEditPress };
};
