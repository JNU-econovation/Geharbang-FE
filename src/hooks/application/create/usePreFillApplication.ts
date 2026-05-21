import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { buildAssetUrl } from "@/src/config/url";
import { getMyApplication } from "@/src/services/application/myApplication/myApplication";
import { useApplicationSlice } from "@/src/stores/application/useApplicationSlice";
import { Gender } from "@/src/types/Gender";

const GENDER_MAP: Record<string, Gender> = {
  MALE: "남",
  FEMALE: "여",
  남: "남",
  여: "여",
};

export const usePreFillApplication = (isEditMode: boolean) => {
  const [isPreFilling, setIsPreFilling] = useState(isEditMode);
  const [preFillError, setPreFillError] = useState(false);
  const { setUpdate, resetData, setImageFile } = useApplicationSlice();

  useEffect(() => {
    let cancelled = false;

    if (isEditMode) {
      setIsPreFilling(true);
      setPreFillError(false);

      getMyApplication()
        .then((res) => {
          if (cancelled) return;
          setUpdate("name", res.name);
          setUpdate("gender", GENDER_MAP[res.gender] ?? "무관");
          setUpdate("phoneNumber", res.phoneNumber);
          setUpdate("birthDate", res.birthDate);
          setUpdate("availableStartDate", res.availableStartDate);
          setUpdate("availableDayOfWeek", res.availableDayOfWeek);
          setUpdate("selfIntroduction", res.introduction);
          setUpdate("mbti", res.mbti);
          setUpdate("instagramId", res.instagramId);
          setUpdate("style", res.styles);
          setUpdate("imageUrl", res.imageUrl);
          setImageFile({
            uri: buildAssetUrl(res.imageUrl) ?? "",
            type: "",
            name: "",
          });
        })
        .catch(() => {
          if (cancelled) return;
          setPreFillError(true);
          Alert.alert(
            "지원서를 불러오지 못했어요",
            "잠시 후 다시 시도해주세요.",
          );
        })
        .finally(() => {
          if (!cancelled) setIsPreFilling(false);
        });
    } else {
      setPreFillError(false);
      setIsPreFilling(false);
      resetData();
    }

    return () => {
      cancelled = true;
    };
  }, [isEditMode]);

  const goBackAfterPreFillError = () => {
    router.back();
  };

  return { isPreFilling, preFillError, goBackAfterPreFillError };
};
