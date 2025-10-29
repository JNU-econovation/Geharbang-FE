import { ReactNode } from "react";

export interface ButtonProps {
  width: number;
  height: number;
  bgColor: string;
  content: string;
  textColor: string;
  border?: string;
  icon?: ReactNode;
  onPress?: () => void;
  isPending?: boolean;
}
