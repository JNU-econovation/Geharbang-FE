import Button from "@/src/components/ui/Button";
import { COLORS } from "@/src/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { ActivityIndicator, Text, View } from "react-native";

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
    <View className="gap-8">
      <View
        className="bg-white p-8 rounded-lg gap-4 items-center justify-center "
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        }}
      >
        <View
          className={`w-24 h-24 ${bgColorClass} rounded-full items-center justify-center`}
        >
          {isPending ? (
            <ActivityIndicator size={80} color={COLORS.PRIMARY.BLUE}  />
          ) : (
            iconName && <Ionicons name={iconName} size={50} color={iconColor} />
          )}
        </View>
        <Text className="text-xl">{title}</Text>
        {description && (
          <Text className="text-gray-text text-center">{description}</Text>
        )}
      </View>

      <View className="gap-3">
        {primary && (
          <Button
            width={365}
            height={50}
            bgColor={COLORS.PRIMARY.BLUE}
            textColor="white"
            content={primary.label}
            onPress={primary.onPress}
            icon={<Ionicons name={primary.icon} size={18} />}
          ></Button>
        )}
        {secondary && (
          <Button
            width={365}
            height={50}
            bgColor="white"
            textColor="black"
            border={COLORS.GRAY.BORDER}
            content={secondary.label}
            onPress={secondary.onPress}
            icon={<Ionicons name={secondary.icon} size={18} />}
          ></Button>
        )}
        {tertiary && (
          <Button
            width={365}
            height={50}
            bgColor="#e9e9efff"
            textColor="black"
            content={tertiary.label}
            onPress={tertiary.onPress}
            icon={<Ionicons name={tertiary.icon} size={18} />}
          ></Button>
        )}
      </View>
    </View>
  );
}
