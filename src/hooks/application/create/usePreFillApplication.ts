import { useEffect, useState } from "react";

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
  const { setUpdate, resetData, setImageFile } = useApplicationSlice();

  useEffect(() => {
    if (isEditMode) {
      getMyApplication()
        .then((res) => {
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
          setImageFile({ uri: buildAssetUrl(res.imageUrl) ?? "", type: "", name: "" });
        })
        .finally(() => setIsPreFilling(false));
    } else {
      resetData();
    }
  }, [isEditMode]);

  return { isPreFilling };
};
