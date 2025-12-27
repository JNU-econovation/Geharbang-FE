import { ReactNode } from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomSafeAreaViewProps {
  children: ReactNode;
  pageColor: "bg-gray-50" | "bg-white" | "bg-[#F9FAFB]";
  statusBarBackgroundColor?: "bg-[#0EA5E9]" | "bg-white";
  topOnly?: boolean;
}

export default function CustomSafeAreaView({
  children,
  pageColor,
  statusBarBackgroundColor,
  topOnly = false,
}: CustomSafeAreaViewProps) {
  if (statusBarBackgroundColor) {
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <View className={`${statusBarBackgroundColor}`}>
          <SafeAreaView edges={["top"]} />
        </View>
        <SafeAreaView
          className={`flex-1 ${pageColor}`}
          edges={["left", "right", "bottom"]}
        >
          {children}
        </SafeAreaView>
      </>
    );
  }
  if (topOnly) {
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView className={`flex-1 ${pageColor}`} edges={["top"]}>
          {children}
        </SafeAreaView>
      </>
    );
  }
  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView className={`flex-1 ${pageColor}`}>{children}</SafeAreaView>
    </>
  );
}
