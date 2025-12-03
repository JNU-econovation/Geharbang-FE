import React, { useCallback } from "react";
import { View } from "react-native";

import FormSection from "@/src/components/ui/Form/FormSection";
import { Question } from "@/src/types/models/stepRecruitment/Question";
import AddInputButton from "../../../../src/components/ui/Form/AddInputButton";
import AppendableInput from "../../../../src/components/ui/Form/AppendableInput";
import EmptyQuestionCard from "./EmptyQuestionCard";

interface QuestionSectionProps {
  questions: Question[];
  onAddQuestion: () => void;
  onDeleteQuestion: (id: string) => void;
  onUpdateQuestion: (id: string, text: string) => void;
  canAddMore: boolean;
}

export default function QuestionSection({
  questions,
  onAddQuestion,
  onDeleteQuestion,
  onUpdateQuestion,
  canAddMore,
}: QuestionSectionProps) {
  const handleTextChange = useCallback(
    (id: string) => (text: string) => {
      onUpdateQuestion(id, text);
    },
    [onUpdateQuestion]
  );

  const handleDelete = useCallback(
    (id: string) => () => {
      onDeleteQuestion(id);
    },
    [onDeleteQuestion]
  );

  return (
    <FormSection
      title='추가 질문'
      gap={24}
      description='최대 5개까지 등록할 수 있습니다 (선택)'
    >
      {questions.length === 0 ? (
        <EmptyQuestionCard onPress={onAddQuestion} />
      ) : (
        <View className='flex-col gap-4'>
          {questions.map((question, index) => (
            <AppendableInput
              key={question.id}
              placeholder={`질문 ${index + 1}을(를) 입력해주세요`}
              height={86}
              value={question.text}
              onChangeText={handleTextChange(question.id)}
              onDelete={handleDelete(question.id)}
            />
          ))}

          {canAddMore && (
            <AddInputButton
              buttonLabel='질문 추가하기'
              onPress={onAddQuestion}
            />
          )}
        </View>
      )}
    </FormSection>
  );
}
