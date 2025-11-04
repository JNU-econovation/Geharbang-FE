import { ReactNode } from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomSafeAreaViewProps {
  children: ReactNode;
  pageColor: "bg-gray-50" | "bg-white";
  statusBarBackgroundColor?: "bg-[#0EA5E9]";
}

export default function CustomSafeAreaView({
  children,
  pageColor,
  statusBarBackgroundColor,
}: CustomSafeAreaViewProps) {
  return (
    <>
      <StatusBar barStyle='dark-content' />

      {statusBarBackgroundColor ? (
        <>
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
      ) : (
        <SafeAreaView className={`flex-1 ${pageColor}`}>
          {children}
        </SafeAreaView>
      )}
    </>
  );
}
