import { useRef, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

export interface Question {
  id: string;
  text: string;
}

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const addQuestion = () => {
    if (questions.length >= 5) {
      Alert.alert('알림', '최대 5개까지만 등록할 수 있습니다.');
      return;
    }
    const newQuestion = {
      id: Date.now().toString(),
      text: '',
    };
    setQuestions([...questions, newQuestion]);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, text: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)));
  };

  const canAddMore = questions.length < 5;

  return {
    questions,
    addQuestion,
    deleteQuestion,
    updateQuestion,
    canAddMore,
    scrollViewRef,
  };
};
