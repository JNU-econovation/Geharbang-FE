import { Keyboard, Pressable } from "react-native";
import { ReactNode } from "react";

export default function DismissKeyboardView({children}: { children: ReactNode }) {
  return (
    <Pressable onPress={Keyboard.dismiss} accessible={false} style={{ flex: 1 }}>
      {children}
    </Pressable>
  );
}
