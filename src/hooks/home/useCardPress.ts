import { router } from "expo-router";
type CardType = "guestHouse" | "stepNotice";

export const useCardPress = (type: CardType, id: number) => {
  const handleCardPress = () => {
    if (type === "guestHouse") {
      router.push({ pathname: "/guestHouse/guestHouseDetail/[id]", params: { id } });
    } else if (type === "stepNotice") {
      router.push({ pathname: "/step/stepDetail/[id]", params: { id } });
    }
  };
  return handleCardPress;
};
