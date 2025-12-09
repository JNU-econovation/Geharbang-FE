import { Feature } from "@/src/types/models/stepRecruitment/Feature";

interface useFeaturesProps {
  features: Feature[];
  setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
}

export const useFeatures = ({ features, setFeatures }: useFeaturesProps) => {
  const addFeatures = () => {
    const newFeature = {
      id: Date.now().toString(),
      text: "",
    };
    setFeatures([...features, newFeature]);
  };

  const deleteFeature = (id: string) => {
    setFeatures(features.filter((f) => f.id !== id));
  };

  const updateFeature = (id: string, text: string) => {
    setFeatures(features.map((f) => (f.id === id ? { ...f, text } : f)));
  };

  return {
    addFeatures,
    deleteFeature,
    updateFeature,
  };
};
