import { COLORS } from "@/src/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function CheckmarkCircle() {
  return (
    <Ionicons name="checkmark-circle" color={COLORS.PRIMARY.BLUE} size={25} />
  );
}
