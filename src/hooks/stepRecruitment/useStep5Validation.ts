import { useState } from 'react';
import { Question } from '@/src/types/models/stepRecruitment/Question';

export function useStep5Validation(questions: Question[]) {
  const [errors, setErrors] = useState<string[]>([]);

  const clearError = (index: number) => {
    setErrors((prev) => {
      const next = [...prev];
      next[index] = '';
      return next;
    });
  };

  const removeError = (index: number) => {
    setErrors((prev) => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  const validateField = (index: number): void => {
    const question = questions[index];
    if (!question) return;

    const { text } = question;
    const errorMsg = text !== '' && text.trim() === '' ? '공백만 입력할 수 없습니다' : '';
    setErrors((prev) => {
      const next = [...prev];
      next[index] = errorMsg;
      return next;
    });
  };

  const validateForm = (): boolean => {
    const newErrors = questions.map((q) =>
      q.text.trim() === '' ? '질문 내용을 입력해주세요' : '',
    );
    setErrors(newErrors);
    return newErrors.every((e) => e === '');
  };

  return {
    errors,
    clearError,
    removeError,
    validateForm,
    validateField,
  };
}
