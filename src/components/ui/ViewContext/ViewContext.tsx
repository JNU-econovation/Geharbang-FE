import { View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

import { viewContext } from "./viewContext.variants";

interface ViewContextProps extends ViewProps {
  variant:
    | "primary"
    | "insta"
    | "phone"
    | "email"
    | "webSite"
    | "owerMes"
    | "modalApply";
  children: React.ReactNode;
  minHeight: number;
  className?: string;
  error?: boolean;
}

export default function ViewContext({
  variant,
  children,
  minHeight,
  className,
  error,
}: ViewContextProps) {
  return (
    <View
      className={twMerge(
        viewContext({ variant }),
        error && "border border-primary-red",
        className
      )}
      style={{ minHeight }}
    >
      {children}
    </View>
  );
}
