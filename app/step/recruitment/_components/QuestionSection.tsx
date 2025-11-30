import React from 'react';
import { Text, View } from 'react-native';
import FormSection from '@/app/application/_components/FormSection';
import EmptyQuestionCard from './EmptyQuestionCard';
import QuestionItem from './QuestionItem';
import AddQuestionButton from './AddQuestionButton';
import { Question } from '@/src/hooks/recruitment/useQuestions';

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
  return (
    <FormSection title="추가 질문" gap={24}>
      <View>
        <View className="flex-row items-center gap-1 mb-1">
          <Text className="text-xs font-normal" style={{ color: '#697282' }}>
            (선택)
          </Text>
        </View>
        <Text className="text-xs" style={{ color: '#697282' }}>
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
              onChangeText={(text) => onUpdateQuestion(question.id, text)}
              onDelete={() => onDeleteQuestion(question.id)}
            />
          ))}

          {canAddMore && <AddQuestionButton onPress={onAddQuestion} />}
        </View>
      )}
    </FormSection>
  );
}
