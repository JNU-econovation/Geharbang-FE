import TextSize from "@/src/components/ui/TextSize";
import { View } from "react-native";

interface StatusBadgeProps {
  type: "guestHouse" | "stepRecruitment";
  isClosed: boolean;
}

export default function StatusBadge({ type, isClosed }: StatusBadgeProps) {
  const displayLabel =
    type === "guestHouse"
      ? isClosed
        ? "비활성"
        : "운영중"
      : isClosed
        ? "마감"
        : "모집중";
  return (
    <View
      className={`absolute top-3 left-3 px-4 py-2 rounded-full ${
        isClosed ? "bg-gray-500" : "bg-green-text"
      }`}
    >
      <TextSize size={12} color='white' content={displayLabel} weight='600' />
    </View>
  );
}
