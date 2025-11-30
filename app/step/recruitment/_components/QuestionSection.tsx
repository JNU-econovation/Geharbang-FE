import React, { useCallback } from 'react';
import { Text, View } from 'react-native';

import FormSection from '@/src/components/ui/Form/FormSection';
import { Question } from '@/src/types/models/Question';
import { COLORS } from '@/src/utils/constants/colors';
import AddQuestionButton from './AddQuestionButton';
import EmptyQuestionCard from './EmptyQuestionCard';
import QuestionItem from './QuestionItem';

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
    [onUpdateQuestion],
  );

  const handleDelete = useCallback(
    (id: string) => () => {
      onDeleteQuestion(id);
    },
    [onDeleteQuestion],
  );

  return (
    <FormSection title="추가 질문" gap={24}>
      <View>
        <View className="flex-row items-center gap-1 mb-1">
          <Text
            className="text-xs font-normal"
            style={{ color: COLORS.GRAY.PLACEHOLDER }}
          >
            (선택)
          </Text>
        </View>
        <Text className="text-xs" style={{ color: COLORS.GRAY.PLACEHOLDER }}>
          최대 5개까지 등록할 수 있습니다
        </Text>
      </View>

      {questions.length === 0 ? (
        <EmptyQuestionCard onPress={onAddQuestion} />
      ) : (
        <View className="flex-col gap-4">
          {questions.map((question, index) => (
            <QuestionItem
              key={question.id}
              index={index}
              value={question.text}
              onChangeText={handleTextChange(question.id)}
              onDelete={handleDelete(question.id)}
            />
          ))}

          {canAddMore && <AddQuestionButton onPress={onAddQuestion} />}
        </View>
      )}
    </FormSection>
  );
}
