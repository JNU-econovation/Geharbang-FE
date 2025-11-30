import { Ionicons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import Flex from "@/src/components/layout/Flex/Flex";
import Button from "@/src/components/ui/Button/Button";
import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";

type IconName = ComponentProps<typeof Ionicons>["name"];
type Btn = { label: string; onPress?: () => void; icon?: IconName };

interface Props {
  status: "success" | "error" | "pending";
  title: string;
  description?: string;
  primary?: Btn;
  secondary?: Btn;
  tertiary?: Btn;
}

export default function ResultLayout({
  status,
  title,
  description,
  primary,
  secondary,
  tertiary,
}: Props) {
  const isSuccess = status === "success";
  const isError = status === "error";
  const isPending = status === "pending";

  const bgColorClass = isSuccess
    ? "bg-green-50"
    : isError
    ? "bg-red-50"
    : "bg-blue-50";

  const iconColor = isSuccess
    ? "#22c55e"
    : isError
    ? "#ef4444"
    : COLORS.PRIMARY.BLUE;

  const iconName = isSuccess ? "checkmark" : isError ? "close" : null;

  return (
    <Flex justify='start' items='center' gap={32}>
      <View
        className='bg-white p-8 rounded-lg w-full'
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        }}
      >
        <Flex justify='center' items='center' gap={16}>
          <View
            className={`w-24 h-24 ${bgColorClass} rounded-full items-center justify-center`}
          >
            {isPending ? (
              <ActivityIndicator size={80} color={COLORS.PRIMARY.BLUE} />
            ) : (
              iconName && (
                <Ionicons name={iconName} size={50} color={iconColor} />
              )
            )}
          </View>
          <TextSize size={18} content={title} />
          {description && (
            <Text className='text-gray-text text-center'>{description}</Text>
          )}
        </Flex>
      </View>

      <Flex justify='center' items='center' gap={8}>
        {primary && (
          <Button
            variant='primary'
            width={370}
            height={50}
            textColor='white'
            content={primary.label}
            onPress={primary.onPress}
            icon={<Ionicons name={primary.icon} size={18} />}
          ></Button>
        )}
        {secondary && (
          <Button
            variant='white'
            width={370}
            height={50}
            textColor={COLORS.GRAY.TEXT}
            content={secondary.label}
            onPress={secondary.onPress}
            icon={<Ionicons name={secondary.icon} size={18} />}
          ></Button>
        )}
        {tertiary && (
          <Button
            variant='gray'
            width={370}
            height={50}
            textColor={COLORS.GRAY.TEXT}
            content={tertiary.label}
            onPress={tertiary.onPress}
            icon={<Ionicons name={tertiary.icon} size={18} />}
          ></Button>
        )}
      </Flex>
    </Flex>
  );
}
