import { View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { viewContext } from "./viewContext.variants";

interface ViewContextProps extends ViewProps {
  variant: "primary" | "insta" | "phone" | "email" | "webSite" | "owerMes";
  height: number;
  children: React.ReactNode;
  className?: string;
}

export default function ViewContext({
  variant,
  height,
  children,
  className,
}: ViewContextProps) {
  return (
    <View
      className={twMerge(viewContext({ variant }), className)}
      style={{ height }}
    >
      {children}
    </View>
  );
}
