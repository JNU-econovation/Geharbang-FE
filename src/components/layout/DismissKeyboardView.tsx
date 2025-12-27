import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { ReactNode } from "react";

export default function DismissKeyboardView({ children }: { children: ReactNode }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
}