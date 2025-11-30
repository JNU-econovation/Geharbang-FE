import RecruitmentStepLayout from '@/app/step/recruitment/_components/RecruitmentStepLayout';
import React, { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

interface Question {
  id: string;
  text: string;
}

export default function RecruitmentStep5() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleAddQuestion = () => {
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

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleTextChange = (id: string, text: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)));
  };

  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <RecruitmentStepLayout currentStep={5} stepTitle="사진 등록">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 bg-gray-50"
          contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-white rounded-[10px] shadow-sm p-6 flex flex-col gap-6">
            <View>
              <View className="flex-row items-center gap-1 mb-1">
                <Text className="text-[#101727] text-lg font-medium">
                  추가 질문
                </Text>
                <Text className="text-[#697282] text-xs font-normal">
                  (선택)
                </Text>
              </View>
              <Text className="text-[#697282] text-xs">
                최대 5개까지 등록할 수 있습니다
              </Text>
            </View>

            {questions.length === 0 ? (
              <TouchableOpacity
                onPress={handleAddQuestion}
                className="w-full h-[183px] rounded-[10px] border-2 border-[#d0d5db] flex-col justify-center items-center gap-3 bg-white active:bg-gray-50"
              >
                <View className="opacity-60">
                  <Feather name="plus-circle" size={32} color="#101727" />
                </View>
                <View className="items-center">
                  <Text className="text-[#495565] text-sm font-medium mb-1">
                    첫 번째 질문 추가하기
                  </Text>
                  <Text className="text-[#697282] text-xs">
                    지원자에게 궁금한 점을 물어보세요
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View className="flex-col gap-4">
                {questions.map((question, index) => (
                  <View
                    key={question.id}
                    className="flex-row items-start gap-3"
                  >
                    <TextInput
                      className="flex-1 h-[86px] px-4 py-3 rounded-[10px] border border-[#d0d5db] bg-white text-sm text-[#101727] textAlign-top"
                      placeholder={`질문 ${index + 1}을(를) 입력해주세요`}
                      placeholderTextColor="#9ca3af"
                      multiline={true}
                      textAlignVertical="top"
                      value={question.text}
                      onChangeText={(text) =>
                        handleTextChange(question.id, text)
                      }
                    />
                    <TouchableOpacity
                      onPress={() => handleDeleteQuestion(question.id)}
                      className="w-8 h-8 items-center justify-center mt-2 active:opacity-50"
                    >
                      <Feather
                        name="trash-2"
                        size={20}
                        color="#9ca3af"
                        style={{ opacity: 0.5 }}
                      />
                    </TouchableOpacity>
                  </View>
                ))}

                {questions.length < 5 && (
                  <TouchableOpacity
                    onPress={handleAddQuestion}
                    className="w-full h-14 rounded-[10px] border-2 border-[#d0d5db] flex-row justify-center items-center gap-2 bg-white active:bg-gray-50"
                  >
                    <Feather name="plus" size={20} color="#495565" />
                    <Text className="text-[#495565] text-sm font-medium">
                      질문 추가하기
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="absolute bottom-0 left-0 w-full bg-gray-50 px-6 pb-6 pt-4 border-t border-transparent">
        <TouchableOpacity
          className="w-full h-[50px] bg-[#00a6f4] rounded-[10px] items-center justify-center shadow-sm active:bg-blue-500"
          onPress={() => console.log('제출로직', questions)}
        >
          <Text className="text-white text-base font-medium">
            공고 등록하기
          </Text>
        </TouchableOpacity>
      </View>
    </RecruitmentStepLayout>
  );
}
