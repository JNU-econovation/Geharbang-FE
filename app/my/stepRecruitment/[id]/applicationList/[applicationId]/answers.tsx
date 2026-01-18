import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Flex from "@/src/components/layout/Flex";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import ErrorMessage from "@/src/components/ui/ErrorMessage";
import LoadingSkeleton from "@/src/components/ui/LoadingSkeleton";
import TextSize from "@/src/components/ui/TextSize";
import { useGetAdditionalAnswers } from "@/src/hooks/applicationList/useApplicationList";
import { COLORS } from "@/src/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import QnaBox from "../_components/QnaBox";

export default function AnswersPage() {
  const { applicationId } = useLocalSearchParams<{ applicationId: string }>();
  const {
    data: qna,
    isLoading,
    isError,
    refetch,
  } = useGetAdditionalAnswers(applicationId);
  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <View className='px-4 py-3'>
        <BackArrorHeader content='추가 질문 답변 보기' />
      </View>
      
      {isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <ErrorMessage onRetry={refetch} />
      ) : (
        <>
          <View className='bg-purple-bg p-5'>
            <Flex dir='row' items='start' justify='start' gap={8}>
              <Ionicons
                name='chatbox-outline'
                size={25}
                color={COLORS.PURPLE.TEXT}
              />
              <View className='gap-2'>
                <TextSize
                  size={16}
                  content='공고 작성 시 추가한 질문에 대한 답변입니다'
                  weight={500}
                />
                <TextSize
                  size={14}
                  color={COLORS.GRAY.TEXT}
                  content={`총 ${qna?.length}개의 질문에 답변했습니다`}
                />
              </View>
            </Flex>
          </View>

          <ScrollView className='bg-[#F9FAFB] pt-4 px-3'>
            <Flex justify='start' items='center' gap={20}>
              {qna?.map((item, index) => (
                <QnaBox
                  key={index}
                  questionNumber={index + 1}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </Flex>
          </ScrollView>
        </>
      )}
    </CustomSafeAreaView>
  );
}
