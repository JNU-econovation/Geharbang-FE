import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Flex from "@/src/components/layout/Flex";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, View } from "react-native";
import QnaBox from "../_components/QnaBox";

const MOCK_ANSWERS = [
  {
    question: "게스트하우스 근무 경험이 있으신가요?",
    answer:
      "있습니다. 서울 지역 호스텔에서 1년간 근무하며 체크인/아웃 업무를 담당했습니다.",
  },
  {
    question: "자기소개를 간단히 작성해주세요",
    answer:
      "안녕하세요! 저는 사람들과 소통하는 것을 좋아하고 외국어 회화에 자신이 있습니다.",
  },
];

export default function AnswersPage() {
  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <View className='px-4 py-3'>
        <BackArrorHeader content='추가 질문 답변 보기' />
      </View>

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
              content={`총 ${MOCK_ANSWERS.length}개의 질문에 답변했습니다`}
            />
          </View>
        </Flex>
      </View>

      <ScrollView className='bg-[#F9FAFB] pt-4 px-3'>
        <Flex justify='start' items='center' gap={20}>
          {MOCK_ANSWERS.map((item, index) => (
            <QnaBox
              key={index}
              questionNumber={index + 1}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </Flex>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
