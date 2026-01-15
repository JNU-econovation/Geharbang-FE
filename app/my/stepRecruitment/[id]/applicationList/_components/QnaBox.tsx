import Flex from "@/src/components/layout/Flex";
import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";
import React from "react";
import { View } from "react-native";

interface QnaBoxProps {
  questionNumber: number;
  question: string;
  answer: string;
}

export default function QnaBox({
  questionNumber,
  question,
  answer,
}: QnaBoxProps) {
  return (
    <View className='w-full bg-white border border-gray-border rounded-2xl p-5'>
      <Flex dir='row' justify='start' items='center' gap={10}>
        <View className='bg-purple-bg w-7 h-7 rounded-full items-center justify-center '>
          <TextSize
            size={12}
            color={COLORS.PURPLE.TEXT}
            content={`Q${questionNumber}`}
          />
        </View>

        <TextSize size={16} content={question} weight={500}/>
      </Flex>

      <View className='h-[1px] bg-gray-border my-4' />

      <Flex dir='row' justify='start' items='start' gap={10}>
        <View className='bg-blue-bg w-7 h-7 rounded-full items-center justify-center'>
          <TextSize size={14} color={COLORS.PRIMARY.BLUE} content='A' />
        </View>

        <TextSize size={15} color={COLORS.GRAY.TEXT} content={answer} />
      </Flex>
    </View>
  );
}
