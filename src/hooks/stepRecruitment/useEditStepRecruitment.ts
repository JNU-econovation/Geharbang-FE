import { getOwnerQuestions } from "@/src/services/stepApply/ownerQuestions";
import { getStepDetail } from "@/src/services/stepDetail/stepDetail";
import { useStepRecruitmentStore } from "@/src/stores/stepRecruitment/useStepRecruitmentStore";
import { transformApiToStore } from "@/src/utils/stepRecruitment/transformApiToStore";
import { router } from "expo-router";

export const useEditStepRecruitment = () => {
  const {
    resetAllData,
    setEditingId,
    setExistingQuestions,
    setStep1Update,
    setStep2Update,
    setStep3Update,
    setStep4Update,
    setStep5Questions,
  } = useStepRecruitmentStore();

  const handleEditPress = async (id: number) => {
    try {
      const [detail, questionsData] = await Promise.all([
        getStepDetail(String(id)),
        getOwnerQuestions(id),
      ]);
      const { step1Data, step2Data, step3Data, step4Data, step5Data } =
        transformApiToStore(detail);
      const existingQs = (questionsData.questions ?? []).map((q) => ({
        id: q.questionId.toString(),
        text: q.content,
      }));

      resetAllData();
      setEditingId(id);
      setExistingQuestions(existingQs);
      setStep1Update("guestHouseName", step1Data.guestHouseName);
      setStep1Update("workingRegion", step1Data.workingRegion);
      setStep1Update("location", step1Data.location);
      setStep2Update("workingStartDate", step2Data.workingStartDate);
      setStep2Update("workingPeriod", step2Data.workingPeriod);
      setStep2Update("workingTimeAndWork", step2Data.workingTimeAndWork);
      setStep2Update("gender", step2Data.gender);
      setStep3Update("title", step3Data.title);
      setStep3Update("introduction", step3Data.introduction);
      setStep3Update("advantages", step3Data.advantages);
      setStep3Update("employeeBenefits", step3Data.employeeBenefits);
      setStep3Update("mainImageUrls", step3Data.mainImageUrls);
      setStep3Update("introImageUrls", step3Data.introImageUrls);
      setStep3Update("mainImageFiles", step3Data.mainImageFiles);
      setStep3Update("introImageFiles", step3Data.introImageFiles);
      setStep4Update("instagram", step4Data.instagram);
      setStep4Update("phone", step4Data.phone);
      setStep4Update("email", step4Data.email);
      setStep4Update("website", step4Data.website);
      setStep4Update("ownerMessage", step4Data.ownerMessage);
      setStep5Questions(step5Data.questions);
      router.push("/step/recruitment/step1");
    } catch (error) {
      console.error("공고 데이터 불러오기 실패:", error);
    }
  };

  return { handleEditPress };
};
