import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import Button from "@/src/components/ui/Button/Button";
import TextSize from "@/src/components/ui/TextSize";
import {
  useNotificationSettings,
  useUpdateNotificationSettings,
} from "@/src/hooks/notification/useNotificationSettings";
import { COLORS } from "@/src/utils/constants/colors";
import React from "react";
import { ActivityIndicator, Switch, View } from "react-native";

export default function NotificationSettingsScreen() {
  const { data, isLoading, isError, refetch } = useNotificationSettings();
  const { mutate } = useUpdateNotificationSettings();

  if (isLoading) {
    return (
      <CustomSafeAreaView pageColor='bg-white' topOnly={true}>
        <View className='px-3 pt-3 pb-4 border-b-[1px] border-[#E5E5E5]'>
          <BackArrorHeader content='알림 설정' />
        </View>
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size='large' color={COLORS.PRIMARY.BLUE} />
        </View>
      </CustomSafeAreaView>
    );
  }

  if (isError || !data) {
    return (
      <CustomSafeAreaView pageColor='bg-white' topOnly={true}>
        <View className='px-3 pt-3 pb-4 border-b-[1px] border-[#E5E5E5]'>
          <BackArrorHeader content='알림 설정' />
        </View>
        <View className='flex-1 items-center justify-center px-6'>
          <TextSize
            color={COLORS.GRAY.TEXT}
            size={16}
            content='알림 설정을 불러오지 못했어요'
            align='center'
          />
          <View className='pt-4' />
          <Button
            variant='gray'
            height={48}
            width={180}
            content='다시 시도'
            textColor='#101828'
            onPress={() => refetch()}
          />
        </View>
      </CustomSafeAreaView>
    );
  }

  return (
    <CustomSafeAreaView pageColor='bg-white' topOnly={true}>
      <View className='px-3 pt-3 pb-4 border-b-[1px] border-[#E5E5E5]'>
        <BackArrorHeader content='알림 설정' />
      </View>

      <View className='px-4 pt-6'>
        <SettingRow
          label='휴대폰 알림'
          description='앱을 보고 있지 않을 때도 알림을 받습니다'
          value={data.pushEnabled}
          onToggle={(value) => mutate({ pushEnabled: value })}
        />
        <View className='border-b border-[#E5E5E5] my-2' />
        <SettingRow
          label='새 채팅 알림'
          description='새 메시지 알림을 앱 안과 휴대폰에서 받습니다'
          value={data.chatPushEnabled}
          onToggle={(value) => mutate({ chatPushEnabled: value })}
        />
      </View>
    </CustomSafeAreaView>
  );
}

interface SettingRowProps {
  label: string;
  description: string;
  value: boolean;
  onToggle: (value: boolean) => void;
}

function SettingRow({ label, description, value, onToggle }: SettingRowProps) {
  return (
    <View className='flex-row items-center justify-between py-4'>
      <View className='flex-col gap-1'>
        <TextSize color='#101828' size={16} content={label} />
        <TextSize color='#6A7282' size={13} content={description} />
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#D1D5DB", true: COLORS.PRIMARY.BLUE }}
        thumbColor='#FFFFFF'
      />
    </View>
  );
}
