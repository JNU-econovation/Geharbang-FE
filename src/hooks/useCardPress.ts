import { router } from "expo-router";
type CardType = "guestHouse" | "stepNotice";

export const useCardPress = (type: CardType, id: number) => {
  const handleCardPress = () => {
    if (type === "guestHouse") {
      /* 라우팅 추가 예정 */
    } else if (type === "stepNotice") {
      router.push({ pathname: "/step/[id]", params: { id } });
    }
  };
  return handleCardPress;
};
