import Flex from "@/src/components/layout/Flex";
import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";
import React from "react";
import { View } from "react-native";

interface ApplicationDashboardProps {
  all: number;
  pending: number;
  passed: number;
}

export default function ApplicationDashboard({
  all,
  pending,
  passed,
}: ApplicationDashboardProps) {
  return (
    <View className='bg-white border border-gray-border py-5 px-10'>
      <Flex dir='row' justify='between' items='center'>
        <View className='items-center flex-1 gap-2'>
          <TextSize
            size={25}
            color={COLORS.PRIMARY.BLUE}
            content={String(all)}
          />
          <TextSize size={14} color={COLORS.GRAY.TEXT} content='전체' />
        </View>

        <View className='items-center flex-1 gap-2 '>
          <TextSize
            size={25}
            color={COLORS.GRAY.TEXT}
            content={String(pending)}
          />
          <TextSize size={14} color={COLORS.GRAY.TEXT} content='대기중' />
        </View>

        <View className='items-center flex-1 gap-2'>
          <TextSize
            size={25}
            color={COLORS.GREEN.TEXT}
            content={String(passed)}
          />
          <TextSize size={14} color={COLORS.GRAY.TEXT} content='합격' />
        </View>
      </Flex>
    </View>
  );
}
