import { ReactNode } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomSafeAreaViewProps {
  children: ReactNode;
  pageColor: "bg-gray-50" | "bg-white";
}

export default function CustomSafeAreaView({
  children,
  pageColor,
}: CustomSafeAreaViewProps) {
  return (
    <>
      <StatusBar barStyle='dark-content' />

      <SafeAreaView className={`flex-1 ${pageColor}`}>{children}</SafeAreaView>
    </>
  );
}
