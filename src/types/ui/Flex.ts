import { ReactNode } from "react";

export interface FlexProps {
  children: ReactNode;
  items: string;
  justify: string;
  flexDir?: "row" | "row-reverse" | "column" | "column-reverse";
}
