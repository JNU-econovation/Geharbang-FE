import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

import Button from '@/src/components/ui/Button/Button';
import { OperatorCardData } from '@/src/types/operator';
import { STATUS_STYLES } from '@/src/utils/constants/operator';

interface OperatorCardProps {
  card: OperatorCardData;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export default function OperatorCard({
  card,
  onApprove,
  onReject,
}: OperatorCardProps) {
  const statusStyle = STATUS_STYLES[card.status];

  return (
    <View className="w-full bg-white rounded-xl border border-gray-200 p-4 flex-col gap-3">
      <View
        className="flex-row justify-between items-start"
        onTouchStart={() => router.push(`/operator/detail/${card.id}`)}
      >
        <View className="flex-col gap-1">
          <Text className="text-[#101828] text-sm font-normal">
            {card.guestHouseName}
          </Text>
          <Text className="text-[#6a7282] text-xs font-normal">
            {card.representativeName}
          </Text>
        </View>
        <View
          className={`px-3 py-1 rounded-full border justify-center items-center ${statusStyle.container}`}
        >
          <Text className={`text-xs font-normal ${statusStyle.text}`}>
            {statusStyle.label}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center gap-1">
          <SvgUri
            width={14}
            height={14}
            uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-0b6e52c1-89ea-4f7a-ac7e-894c67f5c700.svg"
          />
          <Text className="text-[#99a1af] text-xs font-normal">
            {card.documentType}
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <SvgUri
            width={14}
            height={14}
            uri="https://storage.googleapis.com/uxpilot-auth.appspot.com/8lJMSuIRwZWxevURwGSQ2T5WaDK2/Icon-e185f3ff-eea4-47cc-8d3e-cacb3be28876.svg"
          />
          <Text className="text-[#99a1af] text-xs font-normal">
            {card.submittedAt}
          </Text>
        </View>
      </View>

      {card.status === 'pending' && (
        <View className="pt-3 border-t border-[#f2f4f6] flex-row gap-2">
          <View className="flex-1">
            <Button
              variant="white"
              height={35}
              textColor="#364153"
              content="거부"
              onPress={() => onReject?.(card.id)}
            />
          </View>
          <View className="flex-1">
            <Button
              variant="primary"
              height={35}
              textColor="white"
              content="승인"
              onPress={() => onApprove?.(card.id)}
            />
          </View>
        </View>
      )}
    </View>
  );
}
