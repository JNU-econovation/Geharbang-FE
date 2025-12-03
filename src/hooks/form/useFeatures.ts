import { Feature } from "@/src/types/models/stepRecruitment/Feature";
import { Alert, ScrollView } from "react-native";

interface useFeaturesProps {
  features: Feature[];
  setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
  maxLimit: number;
}

export const useFeatures = ({
  features,
  setFeatures,
  maxLimit,
}: useFeaturesProps) => {
    
  const addFeatures = (
    scrollViewRef: React.RefObject<ScrollView | null> | undefined
  ) => {
    if (features.length >= maxLimit) {
      Alert.alert("알림", `최대 ${maxLimit}개까지만 등록할 수 있습니다.`);
      return;
    }
    const newFeature = {
      id: Date.now().toString(),
      text: "",
    };
    setFeatures([...features, newFeature]);

    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const deleteFeature = (id: string) => {
    setFeatures(features.filter((f) => f.id !== id));
  };

  const updateFeature = (id: string, text: string) => {
    setFeatures(features.map((f) => (f.id === id ? { ...f, text } : f)));
  };

  const canAddMore = features.length < maxLimit;

  return {
    addFeatures,
    deleteFeature,
    updateFeature,
    canAddMore,
  };
};
