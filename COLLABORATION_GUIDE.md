
# Geharbang-FE 협업 가이드라인

이 문서는 새로운 팀원이 합류하거나 기존 팀원이 기능을 추가할 때 일관된 코드 스타일을 유지하기 위한 가이드라인이다.

---

## 목차

1. [기술 스택](#1-기술-스택)
2. [브랜치 전략](#2-브랜치-전략)
3. [새 기능 추가 순서](#3-새-기능-추가-순서)
4. [폴더 구조 규칙](#4-폴더-구조-규칙)
5. [라우팅 (Expo Router)](#5-라우팅-expo-router)
6. [컴포넌트 작성 규칙](#6-컴포넌트-작성-규칙)
7. [훅 작성 규칙](#7-훅-작성-규칙)
8. [API 서비스 작성 규칙](#8-api-서비스-작성-규칙)
9. [상태 관리 규칙](#9-상태-관리-규칙)
10. [타입 정의 규칙](#10-타입-정의-규칙)
11. [스타일링 규칙](#11-스타일링-규칙)
12. [에러 처리 규칙](#12-에러-처리-규칙)
13. [네이밍 컨벤션](#13-네이밍-컨벤션)
14. [금지 사항 (하지 말 것)](#14-금지-사항-하지-말-것)
15. [검증 명령어](#15-검증-명령어)

---

## 1. 기술 스택

| 라이브러리 | 용도 |
|-----------|------|
| React Native + Expo 54 | 모바일 앱 프레임워크 |
| Expo Router 6 | 파일 기반 라우팅 |
| TanStack React Query 5 | 서버 상태 관리 (API 데이터) |
| Zustand 5 | 클라이언트 상태 관리 (폼, 인증) |
| Axios | HTTP 클라이언트 |
| NativeWind 4 (Tailwind CSS) | 스타일링 |
| AsyncStorage | 폼 데이터 로컬 저장 (임시저장) |
| expo-secure-store | 토큰 보안 저장 |
| TypeScript (strict) | 타입 시스템 |

---

## 2. 브랜치 전략

```
main       ← 배포 가능한 상태만 유지
  └── dev  ← 개발 통합 브랜치 (기본 작업 브랜치)
        └── feature/{기능명}  ← 선택적 기능 브랜치
```

### 커밋 메시지 형식

```
feat: 게스트하우스 필터 화면 추가
fix: isOwner 분기 오류 수정
refactor: useGuestHouseList 페이지네이션 개선
chore: axios 의존성 업데이트
```

- `feat` — 새 기능
- `fix` — 버그 수정
- `refactor` — 동작 변화 없는 코드 개선
- `chore` — 설정, 의존성 변경

---

## 3. 새 기능 추가 순서

새 화면이나 기능을 추가할 때 아래 순서를 따른다.

```
1. src/types/         → 타입 정의 (API 요청/응답, 도메인 모델)
2. src/services/      → API 서비스 함수 작성
3. src/hooks/         → useQuery / useMutation 훅 작성
4. src/components/ui/ → 재사용 가능한 공통 컴포넌트 (필요 시)
5. app/{feature}/     → 화면(페이지) 구현
   └── _components/  → 해당 화면에서만 쓰는 컴포넌트
```

전역 상태(폼 저장 등)가 필요하면 `src/stores/`에 Zustand 스토어 추가.
백엔드에 이미 API가 추가된 기능을 프론트에 붙일 때는 `services → hooks → 화면 → query invalidation` 순서로 연결한다.
예를 들어 게시글 수정 API는 `PUT /api/v1/guest-houses/{id}`, 공고 수정 API는 `PUT /api/v1/staff-recruitment/{id}`를 서비스 함수로 먼저 만든 뒤 관리 화면에 진입점을 추가한다.
단, 목록 훅이 React Query cache 밖에서 page 상태를 직접 관리하는 경우에는 카드 로컬 상태 기반 optimistic update를 먼저 적용하고, 추후 `useInfiniteQuery` 전환 시 query invalidation/cache update를 붙인다.

---

## 4. 폴더 구조 규칙

```
Geharbang-FE/
├── app/                      # 화면 (Expo Router 페이지)
│   ├── (tabs)/               # 하단 탭 네비게이션 그룹
│   │   ├── _layout.tsx
│   │   ├── index.tsx         # 홈
│   │   ├── map.tsx           # 지도 준비중 탭
│   │   ├── ai.tsx            # AI 준비중 탭
│   │   ├── chats.tsx         # 채팅 목록 탭
│   │   ├── guestHouseEnroll.tsx  # 숨김 탭
│   │   ├── stepRecruitment.tsx   # 숨김 탭
│   │   └── profile.tsx
│   ├── {feature}/            # 기능별 화면
│   │   ├── index.tsx         # 해당 기능 진입점
│   │   └── _components/      # 해당 화면 전용 컴포넌트
│   ├── _layout.tsx           # 루트 레이아웃 (QueryClient, 폰트 로드)
│   └── oauth-callback.tsx
│
└── src/
    ├── components/
    │   ├── layout/           # 레이아웃 컴포넌트 (SafeArea 등)
    │   └── ui/               # 모든 화면에서 재사용하는 공통 UI
    │       └── Button/
    │           ├── Button.tsx
    │           └── button.variants.ts
    ├── hooks/
    │   └── {feature}/        # 기능별 훅 디렉토리
    ├── services/
    │   ├── api/
    │   │   └── customAxios.ts
    │   └── {feature}/        # 기능별 서비스 함수
    ├── stores/
    │   └── {feature}/        # 기능별 Zustand 스토어
    │       ├── use{Feature}Store.ts
    │       └── slice/
    ├── types/
    │   ├── api/              # API 요청/응답 타입
    │   ├── models/           # 도메인 데이터 타입
    │   └── store/            # Store 타입
    └── utils/
        ├── api/
        │   └── errorHandler.ts
        ├── constants/        # 상수 (COLORS, 필터 옵션 등)
        └── {feature}/        # 기능별 유틸 함수
```

**위치 결정 기준:**
- 두 곳 이상에서 쓰인다 → `src/components/ui/`
- 한 화면에서만 쓰인다 → `app/{feature}/_components/`
- API 호출 로직 → `src/services/{feature}/`
- API 호출을 감싼 훅 → `src/hooks/{feature}/`

---

## 5. 라우팅 (Expo Router)

파일 경로가 곧 URL 경로가 된다.

```
app/(tabs)/index.tsx            → /
app/(tabs)/profile.tsx          → /(tabs)/profile
app/guestHouse/[id]/index.tsx   → /guestHouse/:id
app/step/detail.tsx             → /step/detail
app/login/index.tsx             → /login
```

### 화면 이동

```tsx
import { router } from "expo-router";

// 이동
router.push("/guestHouse/enroll");

// 뒤로 가기
router.back();

// 이동 후 히스토리 교체
router.replace("/login");
```

### 하단 탭 규칙

- 현재 노출 탭은 `홈 / 지도 / AI / 채팅 / 내정보` 순서다.
- `지도`, `AI` 탭은 준비중 알림만 표시하고 실제 화면 이동은 막는다.
- 기존 `guestHouseEnroll`, `stepRecruitment` 탭 파일은 `href: null`로 숨긴다.
- 채팅 탭은 채팅방들의 `unreadCount` 합산 값을 배지로 표시한다.

### 채팅 UI 규칙

- 채팅방 메시지는 시간순으로 보여준다.
- 날짜가 바뀌는 첫 메시지 앞에는 날짜 구분선을 표시한다.
- 날짜 비교는 UTC 문자열 절단이 아니라 로컬 날짜 기준으로 처리한다.
- 오늘이 아닌 메시지는 말풍선 시간에도 날짜를 함께 표시해 대화가 길어져도 날짜 맥락을 확인할 수 있게 한다.
- 내 메시지와 상대 메시지는 말풍선 위치, 색상, 프로필 표시로 명확히 구분한다.

### 레이아웃 설정 (app/_layout.tsx)

```tsx
<Stack.Screen name="guestHouse/enroll" options={{ gestureEnabled: false }} />
<Stack.Screen name="modal" options={{ presentation: 'modal' }} />
```

**규칙:**
- 멀티스텝 폼 화면은 `gestureEnabled: false` (스와이프 뒤로가기 막기)
- 모달로 띄울 화면은 `presentation: 'modal'` 옵션 추가
- 동적 라우트는 `[id]` 형식 사용
- 플랫폼별 구현이 필요하면 `Component.native.tsx`, `Component.web.tsx` 파일로 분리한다. 현재 지도 상세 UI는 `AddressMapDetail.native.tsx`, `AddressMapDetail.web.tsx` 패턴을 사용한다.

---

## 6. 컴포넌트 작성 규칙

### 기본 골격

```tsx
import React from "react";
import { View, Pressable } from "react-native";

// Props는 항상 interface로 정의
interface BackArrowHeaderProps {
  content: string;
  onPress?: () => void;
}

// default export 사용
export default function BackArrowHeader({ content, onPress }: BackArrowHeaderProps) {
  return (
    <View className="flex-row items-center gap-3">
      <BackArrow size={24} color="#000" onPress={onPress} />
      <TextSize size={18} color="#101828" content={content} />
    </View>
  );
}
```

### Props 타입 정의

```tsx
// 기본 Props
interface ButtonProps {
  content: string;
  height: number;
  onPress?: () => void;
}

// HTML 기본 Props 확장
interface ButtonProps extends PressableProps {
  variant?: "primary" | "gray" | "red";
  content: string;
}

// children이 있는 경우
interface FormFieldProps {
  label?: string;
  required?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
}

// 제네릭 컴포넌트
interface ItemListContainerProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onAddPress: () => void;
}

const ItemListContainer = <T,>({ items, renderItem, onAddPress }: ItemListContainerProps<T>) => {
  // ...
};
```

### 규칙

- **Props 타입은 반드시 `interface`로 정의** — 파일 상단에 위치
- **`export default function`** 사용 (화살표 함수 컴포넌트 지양)
- **이벤트 핸들러는 `handle` prefix** — `handlePress`, `handleChange`
- 컴포넌트 파일명은 **PascalCase** — `BackArrowHeader.tsx`
- **조건부 렌더링**: `&&` 또는 삼항 연산자 사용, 복잡하면 변수로 추출

```tsx
// 조건부 렌더링 예시
{data?.isOwner && (
  <Pressable onPress={() => router.push("/my/guestHouse")}>
    <MyActivity content='내 게스트하우스 관리' />
  </Pressable>
)}
```

---

## 7. 훅 작성 규칙

### React Query — useQuery

```tsx
import { useQuery } from "@tanstack/react-query";
import { getGuestHouseRecommendation } from "@/src/services/home/guestHouseRecommendation";

export const useGuestHouseRecommendation = (region: string) => {
  return useQuery({
    queryKey: ["guestHouseRecommendation", region],  // 캐시 키 (의존값 포함)
    queryFn: () => getGuestHouseRecommendation(region),
    enabled: !!region,  // 조건부 실행 — falsy면 쿼리 실행 안 함
  });
};
```

### React Query — useMutation

```tsx
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Alert } from "react-native";

export const useCreateStaffRecruitment = () => {
  return useMutation<number, Error, StaffRecruitmentRequest>({
    mutationFn: createStaffRecruitment,  // 제네릭: <반환타입, 에러타입, 인자타입>
    onSuccess: () => {
      // 성공 후 네비게이션, 캐시 무효화 등
    },
    onError: (err) => {
      // 403 권한 에러는 Alert 노출
      if (axios.isAxiosError(err) && err.response?.status === 403) {
        Alert.alert("인증 필요", "스텝 공고 등록은 인증서 심사가 완료된 사장님만 가능합니다.");
        return;
      }
      console.error("공고 등록 실패:", err);
    },
  });
};
```

### Custom Hook — 페이지네이션 + 필터

```tsx
interface UseListParams {
  keyword: string;
  filters: FilterState;
}

interface UseListReturn {
  data: Item[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  refetch: () => void;
  error: string | null;
}

export function useItemList({ keyword, filters }: UseListParams): UseListReturn {
  const [data, setData] = useState<Item[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const debouncedKeyword = useDebounce(keyword, 300);

  // 필터/검색어 변경 시 초기화
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    setData([]);
  }, [debouncedKeyword, filters]);

  const fetchData = useCallback(async (pageNumber: number, isLoadMore = false) => {
    // fetch 로직
  }, [debouncedKeyword, filters]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setPage((prev) => prev + 1);
  }, [hasMore, isLoading]);

  return { data, isLoading, hasMore, loadMore, refetch, error };
}
```

### 규칙

- **훅 파일명은 `use` prefix** — `useGuestHouseEnrollment.ts`
- **queryKey는 배열 + 의존값 포함** — `["guestHouse", id]`처럼 캐시를 구분할 값을 넣기
- **enabled 옵션** — 조건이 충족됐을 때만 쿼리 실행
- **onError에서 403 처리** — `axios.isAxiosError() && status === 403` 패턴 사용
- **debounce** — 검색어처럼 빠르게 바뀌는 값은 `useDebounce(value, 300)` 사용
- 불필요한 `console.log`는 남기지 않는다. 필요한 실패 로그는 `console.error`로 제한한다.

---

## 8. API 서비스 작성 규칙

### Axios 인스턴스 선택

```tsx
import { axiosPrivate } from "@/src/services/api/customAxios";  // 로그인 필요
import { axiosPublic } from "@/src/services/api/customAxios";   // 누구나 가능
import { axiosOptionalAuth } from "@/src/services/api/customAxios"; // 공개 조회 + 로그인 개인화
```

- `axiosPrivate` — 토큰을 자동으로 헤더에 포함, 인증이 필요한 API에 사용
- `axiosPublic` — 토큰 없이 호출, 공개 API에 사용
- `axiosOptionalAuth` — 토큰이 있으면 헤더에 포함하고, 없으면 토큰 없이 호출. 비회원도 볼 수 있지만 로그인 사용자의 `isWished`가 필요한 목록/상세 API에 사용

### 서비스 함수 작성

```tsx
// GET — 인증 불필요
import { axiosPublic } from "../api/customAxios";
import { GuestHousePost } from "@/src/types/models/guestHouse/types";

type GuestHouseListResponse = {
  guestHousePosts: GuestHousePost[];
  hasNext: boolean;
};

export const getGuestHousePostList = async (params: GuestHousePostParams) => {
  const response = await axiosOptionalAuth.get<GuestHouseListResponse>(
    "/api/v1/guest-houses",
    { params }
  );
  return response.data;
};
```

```tsx
// POST — 인증 필요
import { axiosPrivate } from "../api/customAxios";
import { GuestHouseEnrollRequest } from "@/src/types/api/guestHouse/GuestHouseEnrollRequest";

export const createGuestHouseEnrollment = async (
  data: GuestHouseEnrollRequest
): Promise<number> => {
  const response = await axiosPrivate.post("/api/v1/guest-houses", data);
  return response.data.guestHouseId;
};
```

```tsx
// 이미지 업로드 — multipart/form-data
export const uploadGuestHouseImages = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file as unknown as Blob);
  });

  const response = await axiosPrivate.post<{ imageUrl: string[] }>(
    "/api/v1/images",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data.imageUrl;
};
```

### 규칙

- **함수명은 동사 prefix**: `get*`, `create*`, `update*`, `delete*`, `upload*`
- **응답 타입 제네릭 명시**: `axiosPublic.get<ResponseType>(...)`
- **반환값은 `response.data`** — axios 래퍼는 훅이 아닌 서비스 함수에서 처리
- 서비스 함수는 try/catch 없이 작성 — 에러는 훅의 `onError`에서 처리
- query parameter는 문자열을 직접 이어붙이기보다 Axios `params` 옵션을 우선 사용한다.
- 게스트하우스/스텝 공고 목록과 상세 조회는 비회원 접근도 가능해야 하므로 `axiosPrivate`가 아니라 `axiosOptionalAuth`를 사용
- 게스트하우스/스텝 공고 이미지는 `/api/v1/images`에 `images` 필드로 업로드하고, 응답의 `imageUrl` 배열을 사용
- 지원서 프로필 이미지는 `/api/v1/application/images`에 `image` 필드로 업로드
- 인증서 파일은 `/api/v1/certificate/file-upload`에 `file`, `fileType`, `fileName`을 함께 전송
- 수정 API(`PUT`)는 백엔드가 전체 교체 방식으로 처리하므로, 유지할 이미지 URL/하위 목록도 요청 body에 모두 포함
- 이미지/파일 URL은 `process.env`를 각 컴포넌트에서 직접 읽지 말고 `src/config/url.ts`의 `buildAssetUrl()`을 사용한다.

### 찜 API 연결 규칙

- 찜 추가/삭제는 로그인 필수 기능이므로 `axiosPrivate`를 사용한다.
- 서비스 함수 위치는 `src/services/wish/wish.ts`, 토글 훅 위치는 `src/hooks/wish/useToggleWish.ts`와 `src/hooks/wish/useMyWishedPosts.ts`를 따른다.
- 스텝 구인 공고: `POST/DELETE /api/v1/wish/staff-recruitment/{id}`
- 게스트하우스 게시글: `POST/DELETE /api/v1/wish/guest-houses/{id}`
- 내가 찜한 목록: `GET /api/v1/wish/staff-recruitment/my`, `GET /api/v1/wish/guest-houses/my`
- 목록 응답의 찜 필드는 반드시 `isWished`로 사용한다. `wished` 필드는 사용하지 않는다.
- 카드에서 optimistic update를 할 때는 실패 시 서버에서 받은 기존 `item.isWished` 값으로 rollback한다.
- 서버가 대표 이미지 없는 데이터를 `imageUrl: ""`로 내려줄 수 있으므로, 카드 이미지는 빈 문자열일 때 placeholder를 보여준다.

---

## 9. 상태 관리 규칙

### 상태 종류별 도구 선택

| 상태 종류 | 도구 | 예시 |
|-----------|------|------|
| 서버 데이터 (API 응답) | React Query | 공고 목록, 게스트하우스 상세 |
| 전역 클라이언트 상태 | Zustand | 인증 토큰, 멀티스텝 폼 |
| 로컬 UI 상태 | useState | 모달 열림/닫힘, 탭 선택 |

### Zustand 기본 스토어

```tsx
// src/stores/auth/useAuthStore.ts
import { create } from "zustand";

interface AuthStore {
  accessToken: string | null;
  isAuthReady: boolean;
  setAccessToken: (token: string | null) => void;
  loadToken: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  isAuthReady: false,

  setAccessToken: (token) => set({ accessToken: token }),

  loadToken: async () => {
    const token = await getAccessToken(TOKEN_KEYS.ACCESS_TOKEN);
    set({ accessToken: token, isAuthReady: true });
  },
}));
```

### Zustand + 슬라이스 패턴 (멀티스텝 폼)

폼이 여러 스텝으로 나뉘는 경우 슬라이스로 분리.

```tsx
// src/stores/guestHouse/slice/createStep1Slice.ts
import { StateCreator } from "zustand";
import { AllSlices, Step1Slice } from "@/src/types/store/guestHouseStore";

export const initialStep1Data: Step1Data = {
  guestHouseName: "",
  workingRegion: "",
  location: null,
};

export const createStep1Slice: StateCreator<AllSlices, [], [], Step1Slice> = (set) => ({
  step1Data: initialStep1Data,

  setStep1Update: (key, value) =>
    set((state) => ({
      step1Data: { ...state.step1Data, [key]: value },
    })),
});
```

```tsx
// src/stores/guestHouse/useGuestHouseStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useGuestHouseStore = create<GuestHouseStore>()(
  persist(
    (set, get, api) => ({
      ...createStep1Slice(set, get, api),
      ...createStep2Slice(set, get, api),
      // ...

      resetAllData: () =>
        set({
          step1Data: initialStep1Data,
          step2Data: initialStep2Data,
          // ...
        }),
    }),
    {
      name: "guesthouse-enrollment-storage",  // AsyncStorage 키
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

### 규칙

- **서버 데이터는 React Query** — Zustand에 API 응답을 저장하지 말 것
- **멀티스텝 폼은 Zustand + persist** — 앱을 껐다 켜도 입력값 유지
- 게스트하우스 등록 스토어 key는 `guesthouse-enrollment-storage`
- 스텝 공고 등록 스토어 key는 `step-recruitment-storage`, `Date` 필드는 커스텀 storage reviver로 복원
- **스토어 초기화**는 `resetAllData()` 메서드로 — 등록 완료 후 반드시 호출
- **스토어에서 직접 타입 import** — `src/types/store/` 폴더에 Store 타입 분리
- Secure Store 키는 문자열 하드코딩 대신 `src/utils/constants/TokenKeys.ts` 상수를 사용한다.

### 수정 화면 구현 시 주의

- 기존 등록 스토어를 재사용할 수 있지만, 수정 모드에서는 기존 서버 응답을 스토어 초기값으로 주입하는 단계가 필요하다.
- 이미지 배열에는 서버 URL과 새로 고른 `file://` 로컬 파일이 섞일 수 있다. 업로드 훅처럼 `file://`만 업로드하고 이미 서버에 있는 URL은 그대로 유지한다.
- 게스트하우스 수정은 이미지, 편의시설, 파티, 객실 목록을 요청 기준으로 다시 구성하므로 누락된 항목은 삭제된 것으로 처리된다.
- 스텝 공고 수정도 직무, 이미지, 추가 질문 목록을 요청 기준으로 다시 구성한다.
- 성공 후에는 `myGuestHouse`, `guestHouseRecommendation`, 상세/목록 query를 무효화한다. 스텝 공고는 `myStepRecruitment`, `stepRecommendation`, 상세/목록 query를 무효화한다.

---

## 10. 타입 정의 규칙

### 타입 분류 위치

| 타입 종류 | 위치 | 예시 |
|-----------|------|------|
| API 요청 타입 | `src/types/api/{feature}/` | `GuestHouseEnrollRequest.ts` |
| API 응답 / 도메인 모델 | `src/types/models/{feature}/` | `GuestHousePost`, `FilterState` |
| 스토어 타입 | `src/types/store/` | `GuestHouseStore`, `Step1Slice` |
| 공통 타입 | `src/types/` | `File.ts`, `Option.ts` |

### 작성 패턴

```tsx
// API 요청 타입 — interface 사용
export interface GuestHouseEnrollRequest {
  guestHouseName: string;
  imageUrls: string[];
  region: string;
  location: LocationRequest;
  introduction: string;
  amenities: string[];
  ownerMessage: string | null;
}

// 중첩 타입도 분리
export interface LocationRequest {
  lotNumberAddress: string;
  roadNameAddress: string;
  coordinates: [number, number];
}

// 도메인 모델 — interface 사용
export interface GuestHousePost {
  id: number;
  guestHouseName: string;
  tags: string[];
  region: string;
  isWished: boolean;
  imageUrl: string;
}

// 상수 + 타입 같은 파일에
export const PAGE_SIZE = 10;

export interface GuestHousePostParams {
  keyword?: string;
  sort?: string;
  pageNumber?: number;
}
```

### 규칙

- **`interface` 우선** — `type`은 유니온 타입, 유틸리티 타입 등 interface로 표현 불가할 때만 사용
- **nullable 필드**는 `string | null` (undefined 대신 null 통일)
- **초기값 상수**는 타입 파일 같은 위치에 같이 정의 (`initialStep1Data` 등)
- **서비스 함수 응답 타입**은 서비스 파일 내부 또는 `types/models/`에 정의

---

## 11. 스타일링 규칙

### NativeWind (Tailwind CSS) 사용

```tsx
// 기본 사용
<View className="px-4 py-3 bg-white rounded-xl border border-gray-border">
  <Text className="text-base text-gray-text font-medium">텍스트</Text>
</View>

// 조건부 클래스
<View className={`px-4 ${isActive ? "bg-primary-blue" : "bg-gray-button"}`}>

// 동적 스타일 (Tailwind로 표현 어려울 때만 style 사용)
<View style={{ width: size, height: size }} />
```

### COLORS 상수

Tailwind 클래스로 표현하기 어렵거나, `style` prop에 직접 색상을 넣어야 할 때 사용.

```tsx
import { COLORS } from "@/src/utils/constants/colors";

// style prop에서 사용
<Text style={{ color: COLORS.PRIMARY.RED }}>에러 메시지</Text>

// 컴포넌트 prop으로 전달할 때
<TextSize color={COLORS.GRAY.TEXT} size={14} content="안내 문구" />
```

```tsx
// 색상 팔레트 참고
COLORS.PRIMARY.BLUE   // #0EA5E9 (메인 파란색)
COLORS.PRIMARY.RED    // #FB2C36 (에러/경고)
COLORS.GRAY.TEXT      // #4A5565 (일반 텍스트)
COLORS.GRAY.BORDER    // #E5E7EB (테두리)
COLORS.GRAY.PLACEHOLDER // #ADAEBC (입력 힌트)
```

### Button 변형 (tailwind-variants)

```tsx
// 버튼 변형 목록
variant: "primary" | "kakao" | "google" | "white" | "gray" | "red" | "blue" | "green"

// 사용 예시
<Button
  variant="primary"
  height={52}
  width={320}
  content="등록하기"
  textColor="#FFFFFF"
  onPress={handleSubmit}
  isPending={mutation.isPending}  // 로딩 중 ActivityIndicator 표시
/>
```

### 규칙

- **Tailwind 클래스 우선** — `style` prop은 Tailwind로 표현이 불가할 때만 사용
- **임의 값(arbitrary value)** — `className="w-[120px]"` 형태 허용하지만 남용 금지
- **반응형 스타일** — 모바일 전용 앱이므로 반응형 분기 불필요
- **TextSize 컴포넌트** 사용 — 텍스트는 `<Text>` 대신 `<TextSize size={16} color="..." content="..." />` 사용

---

## 12. 에러 처리 규칙

### API 에러 공통 처리

```tsx
// src/utils/api/errorHandler.ts
import { getApiErrorMessage } from "@/src/utils/api/errorHandler";

// custom hook 내부 catch 블록에서 사용
catch (err: any) {
  if (err.name === "AbortError" || err.name === "CanceledError") return;
  setError(getApiErrorMessage(err));  // 사용자 친화적 메시지로 변환
}
```

### HTTP 상태별 처리

```tsx
onError: (err) => {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;

    if (status === 401) {
      // 로그인 화면으로 이동
      router.replace("/login");
      return;
    }

    if (status === 403) {
      Alert.alert("인증 필요", "인증서 심사가 완료된 사장님만 가능합니다.");
      return;
    }
  }
  console.error("오류 발생:", err);
},
```

### 규칙

- **403** — `Alert.alert()`로 사용자에게 권한 부족 안내
- **401** — 로그인 화면으로 리다이렉트
- **네트워크 오류** — `getApiErrorMessage(err)` 사용해 메시지 추출
- **요청 취소(AbortError, CanceledError)** — 에러 처리 없이 그냥 return
- **로딩 상태** — `mutation.isPending`, `query.isLoading`으로 버튼 비활성화 또는 스피너 표시

### 권한 UI 분기

- 사장님 메뉴는 `GET /api/v1/user/profile`의 `isOwner || isAdmin` 기준으로 표시한다.
- 시스템 운영자 심사 메뉴는 `isAdmin` 기준으로 표시한다.
- `inReview`는 심사 중 배지/안내용으로만 사용하고, 사장님 관리 메뉴 노출 기준으로 사용하지 않는다.
- 프로필 조회는 지원서 작성 여부와 독립적으로 동작해야 한다. 지원서가 없어도 사장님/운영자 권한은 확인할 수 있어야 한다.
- 프로필 배지는 관리자 우선이다. `isAdmin`이면 "관리자"만 표시하고, 관리자가 아니면서 `isOwner`이면 "인증 사장님"을 표시한다.

---

## 13. 네이밍 컨벤션

| 대상 | 형식 | 예시 |
|------|------|------|
| 컴포넌트 파일 | PascalCase | `BackArrowHeader.tsx` |
| 훅 파일 | camelCase, use prefix | `useGuestHouseEnrollment.ts` |
| 서비스 함수 파일 | camelCase | `createGuestHouseEnrollment.ts` |
| 스토어 파일 | camelCase, use prefix | `useAuthStore.ts` |
| 타입 파일 | PascalCase | `GuestHouseEnrollRequest.ts` |
| 폴더 | camelCase | `guestHouse/`, `stepRecruitment/` |
| 컴포넌트 함수 | PascalCase | `function BackArrowHeader()` |
| Props 인터페이스 | `{Component}Props` | `BackArrowHeaderProps` |
| 훅 | use prefix | `useGuestHouseList()` |
| 서비스 함수 | 동사 prefix | `getGuestHouseList()`, `createEnrollment()` |
| 이벤트 핸들러 | handle prefix | `handlePress()`, `handleChange()` |
| 상수 | UPPER_SNAKE_CASE | `COLORS`, `TOKEN_KEYS`, `PAGE_SIZE` |
| Zustand 슬라이스 | create prefix | `createStep1Slice` |

---

## 14. 금지 사항 (하지 말 것)

| 금지 | 이유 |
|------|------|
| Zustand에 API 응답 저장 | React Query가 캐싱·재검증을 담당, 중복 저장 |
| 서비스 함수에 try/catch 작성 | 에러는 훅의 onError에서 일괄 처리 |
| `style` prop 남용 | NativeWind 클래스로 대부분 표현 가능 |
| 컴포넌트에 직접 API 호출 | 훅을 거쳐야 캐싱/에러처리 일관성 유지 |
| `any` 타입 사용 | 런타임 에러 원인, 명확한 타입 정의 필요 |
| `console.log` 릴리즈 코드에 남기기 | 민감 정보 노출 가능, 배포 전 제거 |
| queryKey에 의존값 누락 | 데이터 갱신이 안 됨 (e.g., `["list"]`가 아니라 `["list", id]`) |
| `axiosPrivate`를 공개 API에 사용 | 불필요하게 토큰 노출 |
| 전역 스타일 임의 변경 (tailwind.config.js) | 다른 화면에 영향 줄 수 있음, 반드시 팀 논의 후 |
| 멀티스텝 폼 완료 후 `resetAllData()` 미호출 | AsyncStorage에 이전 데이터 남아 오작동 |
| `app.json`과 `app.config.ts` 동시 유지 | Expo 동적 config 충돌로 `expo-doctor` 실패 |
| `@types/react-native` 직접 설치 | React Native에 타입이 포함되어 있어 Expo Doctor 경고 발생 |
| `npm audit fix --force` 무검토 실행 | Expo SDK 버전 다운그레이드 등 breaking change가 발생할 수 있음 |

---

## 15. 검증 명령어

배포 전 프론트 기본 검증은 아래 순서로 실행한다.

```bash
npx tsc --noEmit
npx expo-doctor
npx expo export --platform web
```

`npm audit`에서 남은 항목이 있더라도 `--force`가 Expo SDK 다운그레이드를 제안하면 적용하지 않는다. 이 경우 Expo SDK 호환 버전 업데이트를 먼저 확인한다.
`expo-doctor`에서 잡히는 Expo SDK 패키지 버전 불일치는 코드 변경 검증과 별개로 관리해야 하며, 기능 작업 PR에서는 반드시 원인과 영향 범위를 함께 기록한다.
