# Geharbang-FE 코드 구조 설명

## 목차

1. [서비스 기능 전체 개요](#1-서비스-기능-전체-개요)
2. [기술 스택](#2-기술-스택)
3. [전체 디렉토리 구조](#3-전체-디렉토리-구조)
4. [화면 구조 (Expo Router)](#4-화면-구조-expo-router)
5. [계층 구조 및 데이터 흐름](#5-계층-구조-및-데이터-흐름)
6. [상태 관리](#6-상태-관리)
7. [API 통신](#7-api-통신)
8. [인증 흐름](#8-인증-흐름)
9. [주요 기능별 구현 방식](#9-주요-기능별-구현-방식)
10. [공통 컴포넌트](#10-공통-컴포넌트)
11. [유틸리티](#11-유틸리티)
12. [환경변수 및 빌드](#12-환경변수-및-빌드)

---

## 1. 서비스 기능 전체 개요

Geharbang FE는 **제주 게스트하우스 스텝 구인/구직 플랫폼**의 React Native 모바일 앱이다.

### 사용자 유형별 화면

| 유형 | 조건 | 접근 가능 화면 |
|------|------|---------------|
| 비로그인 | - | 홈, 게스트하우스 목록/상세, 스텝 공고 목록/상세 |
| 로그인 (일반) | 소셜 로그인 | + 지원서 작성, 공고 지원, 찜, 내 정보, 지원 내역 |
| 사장님 | `isOwner: true` (인증서 승인_완료) | + 게스트하우스 등록/관리, 구인 공고 등록/관리, 지원자 관리 |
| 시스템 운영자 | `isAdmin: true` (DB 직접 설정) | + 인증서 심사 대시보드 |

> `GET /api/v1/user/profile` 응답의 `isOwner`, `isAdmin`, `inReview`, `certificateStatus` 필드로 UI 분기 처리.

---

## 2. 기술 스택

| 분류 | 라이브러리 | 버전 | 용도 |
|------|-----------|------|------|
| 프레임워크 | React Native + Expo | 0.81.5 / 54.0.34 | 앱 기반 |
| 라우팅 | Expo Router | - | 파일 기반 라우팅 |
| 서버 상태 | TanStack React Query | 5.90.5 | API 캐싱/동기화 |
| 클라이언트 상태 | Zustand | 5.0.8 | 폼 데이터, 인증 |
| HTTP | Axios | 1.13.1 | API 통신 |
| 스타일 | NativeWind | 4.2.1 | Tailwind CSS in RN |
| 보안 스토리지 | expo-secure-store | - | 토큰 저장 |
| 이미지 | expo-image-picker | - | 갤러리 접근 |
| 파일 | expo-document-picker | - | 문서 파일 선택 |
| 지도 | react-native-maps | 1.20.1 | 지도 표시 |
| 지오코딩 | react-native-geocoding | 0.5.0 | 주소 ↔ 좌표 변환 |
| 날짜 | dayjs | - | 날짜 포맷 |
| 날짜 선택 | @react-native-community/datetimepicker | 8.4.4 | 날짜 입력 |
| 에러 추적 | @sentry/react-native | 7.2.0 | 에러 모니터링 |

---

## 3. 전체 디렉토리 구조

```
Geharbang-FE/
├── app/                      # Expo Router 페이지 (화면 파일)
│   ├── (tabs)/               # 하단 탭 4개
│   ├── application/          # 지원서 작성
│   ├── guestHouse/           # 게스트하우스 목록/상세/등록
│   ├── login/                # 로그인
│   ├── my/                   # 내 지원서/지원 내역, 내 게스트하우스/공고 관리
│   ├── operator/             # 운영자 인증/관리
│   ├── step/                 # 스텝 공고 목록/상세/작성
│   └── _layout.tsx           # 루트 레이아웃
│
├── src/
│   ├── components/           # 재사용 UI 컴포넌트 (57개)
│   ├── hooks/                # 기능별 커스텀 훅 (71개)
│   ├── services/             # API 호출 함수 (30개)
│   ├── stores/               # Zustand 전역 상태/슬라이스 (14개)
│   ├── types/                # TypeScript 타입 정의 (37개)
│   └── utils/                # 유틸 함수 (28개)
│
├── public/
│   ├── fonts/                # Noto Sans KR
│   └── svgs/                 # SVG 아이콘/일러스트
│
└── .env                      # 환경변수 (EXPO_PUBLIC_BASE_URL 등)
```

---

## 4. 화면 구조 (Expo Router)

Expo Router는 **파일 경로 = URL 경로** 구조. `app/` 폴더 안에 파일을 만들면 자동으로 라우트가 생성됨.

### 하단 탭 (app/(tabs)/)

| 파일 | 탭 이름 | 설명 |
|------|---------|------|
| `index.tsx` | 홈 | 게스트하우스/스텝 추천 카드 |
| `guestHouseEnroll.tsx` | 게하등록 | 게스트하우스 등록 진입 |
| `stepRecruitment.tsx` | 스텝모집 | 스텝 구인 공고 작성 진입 |
| `profile.tsx` | 내정보 | 프로필, 지원서, 운영자 기능 |

### 주요 화면 경로

```
app/
├── (tabs)/
│   ├── index.tsx                        # 홈
│   ├── guestHouseEnroll.tsx             # 게하등록 탭
│   ├── stepRecruitment.tsx              # 스텝모집 탭
│   └── profile.tsx                      # 내정보 탭
│
├── login/                               # 로그인
├── application/create/                  # 지원서 작성 (2단계)
│
├── guestHouse/
│   ├── index.tsx                        # 게스트하우스 목록
│   ├── guestHouseDetail/[id]/           # 상세 페이지
│   └── enroll/                          # 등록 (5단계)
│
├── step/
│   ├── index.tsx                        # 스텝 공고 목록
│   ├── stepDetail/[id]/                 # 공고 상세 + 지원
│   └── recruitment/                     # 공고 작성 (5단계)
│
├── my/
│   ├── application/                     # 내 지원서 보기, 지원 내역
│   ├── guestHouse/                      # 내 게스트하우스 관리
│   └── stepRecruitment/                 # 내 구인 공고 관리
│
└── operator/
    ├── verify/                          # 운영자 인증 신청
    └── management/                      # 인증서 관리
```

### 라우팅 특이사항

- `[id]` 폴더 = 동적 라우트. 코드에서 `useLocalSearchParams()`로 id 값을 읽음
- `(tabs)` = 그룹. URL에는 안 나타나고 레이아웃만 공유
- `_layout.tsx` = 해당 폴더의 레이아웃 설정 파일

---

## 5. 계층 구조 및 데이터 흐름

```
[화면 컴포넌트 (app/)]
      ↓ 훅 호출
[커스텀 훅 (src/hooks/)]
      ↓ 서비스 함수 호출
[서비스 레이어 (src/services/)]
      ↓ HTTP 요청
[Axios (customAxios)]
      ↓
[백엔드 API]
```

각 레이어의 역할:

| 레이어 | 위치 | 역할 |
|--------|------|------|
| 화면 | `app/` | JSX 렌더링, 훅 결과를 UI에 표시 |
| 훅 | `src/hooks/` | 비즈니스 로직, 상태 관리, API 호출 조합 |
| 서비스 | `src/services/` | API 엔드포인트 호출 함수 |
| Axios | `src/services/api/customAxios.ts` | 인증 헤더 주입, 기본 URL 설정 |
| 스토어 | `src/stores/` | 전역 상태 (폼 데이터, 인증 토큰) |

---

## 6. 상태 관리

Zustand와 React Query를 역할에 따라 분리해서 사용함.

| 종류 | 도구 | 용도 |
|------|------|------|
| 서버 데이터 | TanStack React Query | API 응답 캐싱, 로딩/에러 상태, 자동 재요청 |
| 클라이언트 상태 | Zustand | 폼 데이터, 인증 토큰 |
| 민감 데이터 | Expo Secure Store | JWT 토큰 암호화 저장 |
| 폼 임시저장 | AsyncStorage | 게스트하우스 등록 진행 중 데이터 |

### Zustand 스토어 목록

#### useAuthStore (`src/stores/auth/`)
```typescript
{
  accessToken: string | null,
  isAuthReady: boolean,        // 앱 시작 시 토큰 로딩 완료 여부
  setAccessToken(token): void,
  loadToken(): Promise<void>   // Secure Store에서 토큰 불러오기
}
```
앱 시작 시 `loadToken()`으로 저장된 토큰을 읽어와 `isAuthReady = true`가 될 때까지 스플래시 화면을 유지함.

#### useApplicationSlice (`src/stores/application/`)
- 지원서 작성 폼 데이터 저장 (이름, 전화번호, 생년월일, 성별, MBTI, 스타일 등)
- `setUpdate()` 메서드로 특정 필드만 부분 업데이트 가능

#### useGuestHouseStore (`src/stores/guestHouse/`)
- 게스트하우스 등록 5단계 폼 데이터
- **AsyncStorage에 자동 저장** (앱 종료 후 재진입 시 이어서 작성 가능)
- `resetAllData()`로 전체 초기화

#### useStepRecruitmentStore (`src/stores/stepRecruitment/`)
- 스텝 구인 공고 작성 5단계 폼 데이터
- **AsyncStorage에 자동 저장** (key: `step-recruitment-storage`)
- 근무 시간의 `Date` 값은 커스텀 storage reviver로 복원
- `resetAllData()`로 전체 초기화

---

## 7. API 통신

### Axios 설정 (`src/services/api/customAxios.ts`)

```typescript
// 인증이 필요한 API용 — 요청마다 토큰 자동 주입
export const axiosPrivate = axios.create({ baseURL });
axiosPrivate.interceptors.request.use(async (config) => {
  const token = await getAccessToken(TOKEN_KEYS.ACCESS_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 인증 불필요한 API용 (로그인 등)
export const axiosPublic = axios.create({ baseURL });

// 공개 조회 API지만 로그인 사용자의 개인화 필드가 필요한 경우
export const axiosOptionalAuth = axios.create({ baseURL });
axiosOptionalAuth.interceptors.request.use(async (config) => {
  const token = await getAccessToken(TOKEN_KEYS.ACCESS_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

`baseURL`은 `.env`의 `EXPO_PUBLIC_BASE_URL` 또는 `EXPO_PUBLIC_API_URL` 값이며, 값이 없으면 `https://geharbang.org`를 기본값으로 사용한다.
게스트하우스/스텝 공고 목록과 상세처럼 비회원도 조회 가능하지만 로그인 사용자의 `isWished`가 필요한 API는 `axiosOptionalAuth`를 사용한다.

### 서비스 함수 패턴

```typescript
// 단순 GET
export const getMyApplication = async () => {
  const response = await axiosPrivate.get<MyApplicationResponse>("/api/v1/application/my");
  return response.data;
};

// POST with body
export const createApplication = async (data: ApplicationData) => {
  const response = await axiosPrivate.post<{ applicationId: number }>("/api/v1/application", data);
  return response.data.applicationId;
};
```

### 찜 API

찜 추가/삭제는 로그인 토큰이 필요한 기능이므로 `axiosPrivate`를 사용한다.

| 대상 | 추가 | 삭제 |
|------|------|------|
| 스텝 구인 공고 | `POST /api/v1/wish/staff-recruitment/{id}` | `DELETE /api/v1/wish/staff-recruitment/{id}` |
| 게스트하우스 게시글 | `POST /api/v1/wish/guest-houses/{id}` | `DELETE /api/v1/wish/guest-houses/{id}` |

내가 찜한 목록은 `GET /api/v1/wish/staff-recruitment/my`와 `GET /api/v1/wish/guest-houses/my`를 사용한다.
FE 서비스 함수는 `src/services/wish/wish.ts`에 있고, 화면에서는 `src/hooks/wish/useToggleWish.ts`와 `src/hooks/wish/useMyWishedPosts.ts`를 통해 호출한다.
목록 응답의 찜 여부 필드는 `isWished`이며, `wished`가 아니다.

### 이미지 업로드 패턴

게스트하우스/스텝 공고 이미지는 공통 이미지 업로드 API를 사용한다.

```typescript
const formData = new FormData();
files.forEach((file) => formData.append("images", file as unknown as Blob));

const response = await axiosPrivate.post<{ imageUrl: string[] }>(
  "/api/v1/images",
  formData,
  { headers: { "Content-Type": "multipart/form-data" } }
);

return response.data.imageUrl;
```

지원서 프로필 이미지는 `/api/v1/application/images`에 `image` 필드로 1장만 업로드한다.
인증서 파일은 `/api/v1/certificate/file-upload`에 `file`, `fileType`, `fileName`을 함께 보낸다.

### 훅 패턴 — 데이터 조회 (useQuery)

```typescript
export const useMyApplication = () => {
  return useQuery({
    queryKey: ["myApplication"],
    queryFn: () => getMyApplication(),
  });
};

// 사용
const { data, isLoading, isError, refetch } = useMyApplication();
```

### 훅 패턴 — 데이터 변경 (useMutation)

```typescript
export const useCreateApplication = () => {
  return useMutation<number, Error, ApplicationData>({
    mutationFn: (data) => createApplication(data),
    onError: (error) => handleApiError(error),
  });
};

// 사용
const { mutate, isPending } = useCreateApplication();
mutate(formData);
```

### 커스텀 페이지네이션 (스텝 공고 목록)

React Query의 `useInfiniteQuery` 대신 직접 구현:
```
useStaffRecruitmentList
  - page 상태 직접 관리
  - loadMore() → 다음 페이지 fetch
  - AbortController로 이전 요청 취소
  - 검색어 변경 시 300ms 디바운스
  - hasMore 플래그로 무한스크롤 종료 판단
```

---

## 8. 인증 흐름

```
[앱 시작]
  → useAuthStore.loadToken()
  → Expo Secure Store에서 토큰 읽기
  → isAuthReady = true → 스플래시 해제

[로그인]
  → 로그인 화면 → 카카오/구글 버튼 클릭
  → /api/v1/oauth/{provider}/login → loginUri 받기
  → 브라우저(WebView)에서 소셜 로그인
  → 소셜 서버 → 앱으로 딥링크 리다이렉트
    geharbang://oauth-callback?accessToken={token}&userId={id}
  → accessToken을 Expo Secure Store에 저장
  → useAuthStore.setAccessToken(token)
  → 로그인 완료

[로그아웃]
  → Secure Store에서 토큰 삭제
  → useAuthStore.setAccessToken(null)

[API 요청 시]
  → axiosPrivate interceptor
  → Secure Store에서 토큰 읽기
  → Authorization: Bearer {token} 헤더 자동 추가
```

---

## 9. 주요 기능별 구현 방식

### 지원서 작성 (2단계)

```
Step 1: 개인정보
  - 이름, 생년월일, 전화번호, 성별, 활동 가능 시작일
  - useApplicationFormValidation으로 각 필드 유효성 검사

Step 2: 프로필
  - MBTI, 스타일(복수 선택), 인스타그램 ID, 프로필 사진
  - 사진: expo-image-picker → 업로드 API → URL 저장
  - 스타일: 복수 선택 → useMultiSelect 훅

제출: useApplicationSlice 스토어 데이터 → createApplication(data) → 서버 저장
```

### 게스트하우스 등록 (5단계)

```
Step 1: 기본 정보 (이름, 지역, 주소)
  - 주소 검색 → react-native-maps + geocoding
Step 2: 대표 이미지, 소개, 시설 & 분위기 (체크박스 다중선택)
Step 3: 파티 구성 (파티 추가/수정/삭제)
Step 4: 객실 구성 (객실 추가/수정/삭제, 가격 입력)
Step 5: 연락처, 웹사이트, 사장님 한마디

- 5단계 데이터 → useGuestHouseStore (AsyncStorage 자동 저장)
- 뒤로 가거나 앱을 껐다 켜도 데이터 유지
- 이전 작성 내용이 있으면 `useGuestHouseResumeDraft`가 이어쓰기/새로쓰기 모달 표시
- 제출 시 enrollDataTransformer로 API 형식으로 변환 후 전송
```

### 스텝 구인 공고 작성 (5단계)

```
Step 1: 게스트하우스명 + 모집 지역 + 주소
Step 2: 근무 조건 (스케줄, 기간, 성별)
Step 3: 제목, 소개, 대표/소개 이미지, 혜택/특징
Step 4: 연락처, 웹사이트, 사장님 한마디
Step 5: 추가 질문 작성 (자유롭게 추가/삭제)

- 5단계 데이터 → useStepRecruitmentStore (AsyncStorage 자동 저장)
- 이전 작성 내용이 있으면 `useStepRecruitmentResumeDraft`가 이어쓰기/새로쓰기 모달 표시
- 제출 시 transformStoreToApi로 변환 후 전송
```

### 내 게시글/공고 관리

```
내 게스트하우스 관리
  - GET /api/v1/guest-houses/owner
  - PATCH /api/v1/guest-houses/{id}
  - DELETE /api/v1/guest-houses/{id}

구인 공고 관리
  - GET /api/v1/staff-recruitment/owner
  - PATCH /api/v1/staff-recruitment/{id}
  - DELETE /api/v1/staff-recruitment/{id}
```

현재 관리 화면은 목록 조회, 활성/비활성 전환, 삭제, 새 등록 진입을 제공한다.
백엔드에는 `PUT /api/v1/guest-houses/{id}`, `PUT /api/v1/staff-recruitment/{id}` 수정 API가 있지만, 프론트 서비스/화면에는 아직 연결되어 있지 않다.
수정 화면을 만들 때는 등록 스토어를 재사용하되 기존 이미지 URL을 유지할 수 있도록 `file://` 로컬 이미지와 서버 URL 이미지를 구분해야 한다.

### 공고 목록 조회 및 필터링

```
useStaffRecruitmentList 훅:
  - 필터 상태: 지역, 기간, 근무형태, 요일, 스케줄, 성별
  - 검색어: 300ms 디바운스 처리
  - 페이지네이션: page 직접 관리, loadMore()로 추가 로딩
  - 이전 요청 취소: AbortController

UI:
  - 필터 선택 → FilterBottomSheet 컴포넌트
  - 스크롤 끝 도달 → loadMore() 자동 호출
```

### 찜 토글

게스트하우스/스텝 공고 카드의 하트 버튼은 `GuestHouseCard`에서 공통으로 처리한다.

```
GuestHouseCard
  → useState(item.isWished)로 카드 로컬 상태 유지
  → useEffect([item.id, item.isWished])로 서버 목록 데이터 갱신 시 동기화
  → useToggleWish({ type, id })로 optimistic update 실행
  → 실패 시 기존 item.isWished 값으로 rollback
```

현재 목록 훅은 React Query cache 밖에서 page 상태를 직접 관리하므로, 찜 토글은 카드 단위 optimistic update로 처리한다.
목록 훅을 `useInfiniteQuery`로 전환하면 query cache update/invalidation을 함께 적용할 수 있다.
대표 이미지가 없는 게시글/공고는 BE가 `imageUrl: ""`로 내려주며, 카드는 placeholder 아이콘을 표시한다.

### 운영자 인증

```
1. 인증서 파일 선택 (expo-document-picker → PDF/이미지)
2. 파일 업로드 API → fileUrl 반환
3. 사업체명, 대표자명, 전화번호 입력
4. 인증서 제출 → 관리자 심사 대기
5. profile 화면에서 심사 상태 표시
   - certificateStatus == "검토_대기" → "심사 중" 배지
   - certificateStatus == "승인_완료" → "인증 사장님" 배지 + 사장님 메뉴 활성화
   - certificateStatus == "거부됨"   → "거절됨" 안내 + 재신청 유도
   - certificateStatus == null       → 인증서 신청 유도
```

**profile 화면 권한 분기 기준 (`GET /api/v1/user/profile`):**

| 필드 | 값 | 화면 처리 |
|------|----|----------|
| `isOwner` | true | 내 게스트하우스 관리, 구인 공고 관리 메뉴 표시 |
| `inReview` | true | "심사 중" 배지 표시 |
| `isAdmin` | true | 인증서 심사 대시보드 버튼 표시 |
| `certificateStatus` | `거부됨` | 거절 안내 및 재신청 유도 |

⚠️ **현재 확인된 이슈:**
- `profile.tsx`의 사장님 메뉴는 `isOwner`, 운영자 심사 메뉴는 `isAdmin`으로 분기 중이다.
- 다만 `useMyInfomation(myApplicationExist)`가 지원서 존재 여부에 묶여 있어, 지원서를 작성하지 않은 로그인 사용자는 `GET /api/v1/user/profile` 호출이 막힐 수 있다.
- 사장님/운영자 권한 UI는 지원서 존재 여부와 무관해야 하므로, 프로필 조회 query의 `enabled` 조건을 분리하는 수정이 필요하다.

---

## 10. 공통 컴포넌트

### 레이아웃

| 컴포넌트 | 설명 |
|----------|------|
| `CustomSafeAreaView` | 상태바 영역 피해서 화면 표시, 배경색 prop |
| `DismissKeyboardView` | 스크롤하면 키보드 자동 닫힘 |
| `BackArrowHeader` | 뒤로가기 + 타이틀 헤더 |

### 폼 입력

| 컴포넌트 | 설명 |
|----------|------|
| `TextInput` | 커스텀 텍스트 입력 (유효성 메시지 표시) |
| `Button` | variant: primary / gray / outlined |
| `Checkbox` | 단일/복수 선택 체크박스 |
| `RadioButton` | 단일 선택 |
| `DatePicker` | iOS/Android 날짜 선택기 래퍼 |
| `Dropdown` | 커스텀 드롭다운 셀렉트 |
| `SearchInput` | 검색 입력 (디바운스 포함) |
| `WorkScheduleSelector` | 근무 스케줄 선택 특화 컴포넌트 |

### 이미지

| 컴포넌트 | 설명 |
|----------|------|
| `SingleImagePicker` | 갤러리에서 이미지 1장 선택 |
| `MultiImagePicker` | 이미지 여러 장 선택 |
| `AddImageButton` | 이미지 추가 버튼 |
| `PreviewImage` | 선택된 이미지 미리보기 + 삭제 |

### 데이터 표시

| 컴포넌트 | 설명 |
|----------|------|
| `Tag` | 스타일 태그 (색상 변형) |
| `LoadingSkeleton` | 로딩 중 스켈레톤 UI |
| `CollapsibleSection` | 접고 펼치는 섹션 |

### 모달/다이얼로그

| 컴포넌트 | 설명 |
|----------|------|
| `Modal` | 범용 모달 (이미지 포함 가능) |
| `BottomSheet` | 아래에서 올라오는 시트 |
| `ConfirmModal` | 확인/취소 다이얼로그 |

---

## 11. 유틸리티

### 상수 (`src/utils/constants/`)

| 파일 | 내용 |
|------|------|
| `colors.ts` | 앱 컬러 팔레트 (`COLORS.PRIMARY.BLUE` 등) |
| `filterOptions.ts` | 필터 선택지 목록 |
| `regions.ts` | 지역 목록 |
| `mbti.ts` | MBTI 16가지 목록 |
| `TokenKeys.ts` | 스토리지 키 상수 |

### 포맷터 (`src/utils/common/`)

- `dateFormatter` — 날짜 표시 형식 변환 (dayjs 사용)
- `phoneNumberFormatter` — 전화번호 자동 하이픈 삽입
- 유효성 검사 함수들

### 에러 처리 (`src/utils/api/errorHandler.ts`)

API 호출 실패 시 에러 메시지를 추출하는 중앙화된 함수.
useMutation의 `onError` 콜백에서 공통으로 사용.

**403 권한 에러 처리 패턴:**

BE에서 미인증 사장님이 등록 API 호출 시 `403 NOT_APPROVED_OWNER`를 반환함.
각 mutation 훅의 `onError`에서 `axios.isAxiosError()`로 403을 감지해 `Alert`를 띄움.

```typescript
onError: (error) => {
  if (axios.isAxiosError(error) && error.response?.status === 403) {
    Alert.alert('인증 필요', '메시지');
    return;
  }
  console.error(error);
}
```

| 훅 | 에러 메시지 |
|----|------------|
| `useGuestHouseEnrollment` | "게스트하우스 등록은 인증서 심사가 완료된 사장님만 가능합니다." |
| `useCreateStaffRecruitment` | "스텝 공고 등록은 인증서 심사가 완료된 사장님만 가능합니다." |

### 보안 스토리지 (`src/utils/login/secureStore.ts`)

Expo Secure Store를 감싼 래퍼. 토큰 저장/조회/삭제를 추상화.

---

## 12. 환경변수 및 빌드

### 환경변수

| 변수명 | 용도 |
|--------|------|
| `EXPO_PUBLIC_BASE_URL` | API 서버 주소 (예: `https://geharbang.org`) |
| `EXPO_PUBLIC_API_URL` | API 서버 주소 fallback |
| `EXPO_PUBLIC_SENTRY_DSN` | Sentry 에러 추적 DSN |
| `GOOGLE_MAPS_API_KEY` | Google Maps/Geocoding API 키 |

`EXPO_PUBLIC_` 접두사가 붙은 변수만 앱 번들에 포함됨. 나머지는 빌드 타임에만 사용.

### 빌드 종류 (EAS Build)

| 프로필 | 용도 | 특징 |
|--------|------|------|
| `development` | 개발/디버깅 | Metro 서버 연결 필요, 독립 실행 불가 |
| `preview` | 내부 테스트 | 독립 실행 가능, APK 배포 |
| `production` | 스토어 배포 | Play Store / App Store 제출용 |

### 로컬 검증 명령어

배포 전에는 아래 순서로 확인한다.

```bash
npx tsc --noEmit
npx expo-doctor
npx expo export --platform android --output-dir /tmp/geharbang-fe-export --clear
```

`expo-doctor` 기준으로 `app.json`과 `app.config.ts`를 동시에 유지하면 동적 config 충돌이 날 수 있으므로, 현재 앱 설정은 `app.config.ts`로 단일화한다.
`@types/react-native`는 React Native에 타입이 포함되어 있어 직접 설치하지 않는다.
`npm audit fix --force`는 Expo SDK를 깨는 다운그레이드를 유도할 수 있으므로 사용 전에 반드시 영향 범위를 확인한다.

### OTA 업데이트

현재 `expo-updates` **미설치** 상태. 코드 변경 시 매번 전체 EAS Build 필요.
설치하면 JS 코드 변경 시 앱 재설치 없이 업데이트 가능.

### 루트 레이아웃 (`app/_layout.tsx`)

앱 전체에 공통으로 적용되는 설정:
- `QueryClientProvider` — React Query 초기화
- `SafeAreaProvider` — Safe Area 영역 계산
- `useAuthStore.loadToken()` — 앱 시작 시 토큰 로딩
- Sentry 초기화
- 폰트 로딩 완료 + 인증 준비 완료 전까지 스플래시 유지
