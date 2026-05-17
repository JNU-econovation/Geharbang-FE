import React, { useCallback } from "react";
import { Text, View } from "react-native";

import FormSection from "@/src/components/ui/Form/FormSection";
import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";
import { Question } from "@/src/types/models/stepRecruitment/Question";
import AddInputButton from "../../../../src/components/ui/Form/AddInputButton";
import AppendableInput from "../../../../src/components/ui/Form/AppendableInput";
import EmptyQuestionCard from "./EmptyQuestionCard";
import { Ionicons } from "@expo/vector-icons";

interface QuestionSectionProps {
  questions: Question[];
  existingQuestions?: { id: string; text: string }[];
  onAddQuestion: () => void;
  onDeleteQuestion: (id: string) => void;
  onUpdateQuestion: (id: string, text: string) => void;
  onBlurQuestion?: (id: string) => void;
  onFocusQuestion?: (id: string) => void;
  canAddMore: boolean;
  errors?: string[];
}

export default function QuestionSection({
  questions,
  existingQuestions,
  onAddQuestion,
  onDeleteQuestion,
  onUpdateQuestion,
  onBlurQuestion,
  onFocusQuestion,
  canAddMore,
  errors,
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

  const handleBlur = useCallback(
    (id: string) => () => {
      onBlurQuestion?.(id);
    },
    [onBlurQuestion]
  );

  const handleFocus = useCallback(
    (id: string) => () => {
      onFocusQuestion?.(id);
    },
    [onFocusQuestion]
  );

  const hasExisting = existingQuestions && existingQuestions.length > 0;

  return (
    <FormSection
      title='추가 질문'
      gap={24}
      description='최대 5개까지 등록할 수 있습니다 (선택)'
    >
      <View className='flex-col gap-4'>
        {hasExisting && existingQuestions.map((q, index) => (
          <View key={q.id} className='flex-row items-start gap-3'>
            <View className='flex-1 bg-gray-100 rounded-xl px-4 py-3 border border-gray-200' style={{ minHeight: 86 }}>
              <Text className='text-[11px] text-gray-400 mb-1'>질문 {index + 1}</Text>
              <Text className='text-gray-500 text-sm leading-5'>{q.text}</Text>
            </View>
            <View className='w-8 h-8 mt-2 items-center justify-center'>
              <Ionicons name='lock-closed-outline' size={18} color='#9ca3af' />
            </View>
          </View>
        ))}

        {questions.map((question, index) => (
          <View key={question.id}>
            <AppendableInput
              placeholder={`질문 ${(hasExisting ? existingQuestions!.length : 0) + index + 1}을(를) 입력해주세요`}
              height={86}
              value={question.text}
              onChangeText={handleTextChange(question.id)}
              onDelete={handleDelete(question.id)}
              onBlur={handleBlur(question.id)}
              onFocus={handleFocus(question.id)}
              error={!!errors?.[index]}
            />
            <View className='mt-1 h-5'>
              {!!errors?.[index] && (
                <TextSize
                  size={12}
                  color={COLORS.PRIMARY.RED}
                  content={errors[index]}
                />
              )}
            </View>
          </View>
        ))}

        {!hasExisting && questions.length === 0 && (
          <EmptyQuestionCard onPress={onAddQuestion} />
        )}

        {canAddMore && (hasExisting || questions.length > 0) && (
          <AddInputButton
            buttonLabel='질문 추가하기'
            onPress={onAddQuestion}
          />
        )}
      </View>
    </FormSection>
  );
}
