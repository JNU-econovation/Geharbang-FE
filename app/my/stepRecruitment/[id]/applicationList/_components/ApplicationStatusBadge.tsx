import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";
import { View } from "react-native";

interface ApplicationStatusBadgeProps {
  status: "합격" | "대기중";
}

export default function ApplicantStatusBadge({
  status,
}: ApplicationStatusBadgeProps) {
  const isPassed = status === "합격";

  return (
    <View
      className={`px-2.5 py-1.5 rounded-md ${
        isPassed ? "bg-green-100" : "bg-gray-button"
      }`}
    >
      <TextSize
        size={12}
        color={isPassed ? COLORS.GREEN.TEXT : COLORS.GRAY.TEXT}
        content={isPassed ? "합격" : "대기중"}
        weight='600'
      />
    </View>
  );
}
