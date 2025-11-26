import { useQuery } from "@tanstack/react-query";

import { getStepDetail } from "@/src/services/StepDetail/stepDetail";
import { StepDetailResponse } from "@/src/types/models/stepDetail/StepDetailResponse";

export const useStepDetail = () => {
  const { data, isPending, ...rest } = useQuery<StepDetailResponse>({
    queryKey: ["stepDetail"],
    queryFn: getStepDetail,
  });

  const defaultData: StepDetailResponse = {
    // 이미지는 스켈레톤 UI 추가 예정
    representativeImages: [],
    title: "게스트하우스 스텝 모집",
    guesthouseName: "게스트하우스 이름",
    region: "게스트하우스 지역",
    location: {
      address: "게스트하우스 위치",
      coordinates: [33.4996213, 126.5311884],
    },
    workingInformation: {
      startDate: "게스트하우스 근무 시작일",
      isStartDateNegotiable: false,
      workingPeriod: "게스트하우스 근무 기간",
      jobs: [],
    },
    introduction: {
      content: "게스트하우스 소개",
      images: [],
    },
    feature: {
      gender: "게스트하우스 성별",
      advantages: ["게스트하우스 우대 사항"],
      employeeBenefits: ["게스트하우스 복지"],
    },
    contact: {
      instagramId: "게스트하우스 인스타그램",
      phoneNumber: "게스트하우스 전화번호",
      email: "게스트하우스 이메일",
      webSite: "게스트하우스 웹사이트",
    },
    isWished: false,
    ownerMessage: "게스트하우스 사장님 한마디",
  };

  return {
    data: isPending ? defaultData : data,
    isPending,
    ...rest,
  };
};
