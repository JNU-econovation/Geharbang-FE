import TextSize from "@/src/components/ui/TextSize";
import { View } from "react-native";

interface StatusBadgeProps {
  isClosed: boolean;
}

export default function StatusBadge({ isClosed }: StatusBadgeProps) {
  return (
    <View
      className={`absolute top-3 left-3 px-4 py-2 rounded-full ${
        isClosed ? "bg-gray-500" : "bg-green-text"
      }`}
    >
      <TextSize
        size={12}
        color='white'
        content={isClosed ? "마감" : "모집중"}
        weight='600'
      />
    </View>
  );
}
