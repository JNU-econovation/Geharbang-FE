import { Question } from "@/src/types/models/stepApply";
import { router } from "expo-router";
import { useStepApply } from "./useStepApply";

interface useHandleSubmitProps {
  recruitmentId: number;
  questions?: Question[];
  answers: { [key: number]: string };
  validateForm: () => boolean;
}

export const useHandleSubmit = ({
  recruitmentId,
  questions,
  answers,
  validateForm,
}: useHandleSubmitProps) => {
  const submitMutation = useStepApply(recruitmentId);

  const handleSubmit = async () => {
    if (validateForm()) {
      router.push({
        pathname: "/step/stepDetail/[id]/apply/result",
        params: { id: recruitmentId.toString(), status: "pending" },
      });

      try {
        if (!questions || questions.length === 0) {
          await submitMutation.mutateAsync([]);
        } else {
          const answersArray = questions.map((question) => ({
            questionId: question.questionId,
            content: answers[question.questionId] || "",
          }));

          await submitMutation.mutateAsync(answersArray);
        }
        router.setParams({ status: "success" });
      } catch (e) {
        console.error("제출 오류:", e);
        router.setParams({ status: "error" });
      }
    }
  };

  return handleSubmit;
};
