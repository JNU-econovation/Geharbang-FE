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
| 시스템 운영자 | `isAdmin: true` (DB 직접 설정) | + 인증서 심사 대시보드, 사장님 기능 메뉴 |

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
| 푸시 알림 | expo-notifications | - | Expo Push Token 발급, OS 알림 수신/클릭 처리 |
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
│   ├── (tabs)/               # 하단 탭 5개
│   ├── application/          # 지원서 작성
│   ├── guestHouse/           # 게스트하우스 목록/상세/등록
│   ├── login/                # 로그인
│   ├── my/                   # 내 지원서/지원 내역, 내 게스트하우스/공고 관리
│   ├── notifications/        # 인앱 알림 목록
│   ├── chats/                # 채팅 목록/채팅방
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
├── assets/
│   ├── icon.png              # 기본 앱 아이콘
│   └── adaptive-icon.png     # Android adaptive icon foreground
│
├── .env                      # 환경변수 (EXPO_PUBLIC_API_URL, EXPO_PUBLIC_ASSET_URL 등)
└── src/config/url.ts         # API/이미지/파일 URL 공통 설정
```

---

## 4. 화면 구조 (Expo Router)

Expo Router는 **파일 경로 = URL 경로** 구조. `app/` 폴더 안에 파일을 만들면 자동으로 라우트가 생성됨.

### 하단 탭 (app/(tabs)/)

| 파일 | 탭 이름 | 설명 |
|------|---------|------|
| `index.tsx` | 홈 | 게스트하우스/스텝 추천 카드 |
| `map.tsx` | 지도 | 현재 준비중, 향후 게스트하우스/스텝 공고 통합 지도 |
| `ai.tsx` | AI | 현재 준비중, 향후 통합 AI 챗봇 진입점 |
| `chats.tsx` | 채팅 | 채팅방 목록, 읽지 않은 메시지 배지 |
| `profile.tsx` | 내정보 | 프로필, 지원서, 운영자 기능 |

`guestHouseEnroll.tsx`, `stepRecruitment.tsx`는 탭 파일로 남아 있지만 `href: null`로 하단 nav에서는 숨긴다.
지도와 AI 탭은 현재 실제 화면 이동 없이 `Alert.alert("준비중", ...)`만 표시한다.
지도 탭은 향후 `react-native-maps` 기반으로 게스트하우스와 스텝 공고 마커를 함께 보여준다. 마커는 `/api/v1/maps/markers`에서 현재 지도 bounds 기준으로 조회하고, 사용자는 게스트하우스/스텝 공고/전체 보기 필터를 전환할 수 있다.
AI 탭은 향후 `/api/v1/ai/chat` 기반 통합 챗봇 화면으로 전환한다. 이 챗봇은 게하르방 서비스 안내, 제주 관광 상담, 게스트하우스 추천, 스텝 공고 추천을 한 대화 화면에서 처리하고, 응답 텍스트와 함께 게스트하우스/스텝 공고/관광지 카드를 렌더링한다.
사장님 기능에는 향후 운영 리포트 화면을 추가한다. 내 게스트하우스/스텝 공고별 조회 수, 찜 수, 채팅 문의, 지원 수, 리뷰 요약, AI 질문 트렌드를 보여주고, 플랫폼 전체 게스트하우스/스텝 공고 인사이트 리포트도 함께 노출한다.
리뷰 AI 키워드는 사용자와 사장님에게 다르게 보여준다. 사용자 상세 화면에는 "청결해요", "혼자 쉬기 좋아요" 같은 대표 태그와 짧은 요약만 노출하고, 사장님 리포트 화면에는 긍정/개선 키워드, 반복 이슈, 상세 페이지 보강 제안을 제공한다.
기본 리뷰 API 서비스와 상세 화면 리뷰 UI는 게스트하우스와 스텝 공고를 모두 지원한다. 스텝 공고 리뷰는 합격한 지원자만 작성할 수 있고, FE는 리뷰 요약 응답의 `canWriteReview`로 작성 버튼 노출 여부를 먼저 판단한다.
리뷰 UI는 `0.5`점 단위 별점, 본문, 사진 최대 5장 첨부, 내 리뷰 수정/삭제를 제공한다.
사용자용 리뷰 AI 요약은 MVP에서 게스트하우스 상세의 리뷰 목록 바로 위에만 노출한다. 리뷰가 3개 이상일 때만 "리뷰 요약"과 "자주 언급된 키워드"를 보여주고, 리뷰가 부족하면 영역을 숨긴다.
구현 순서는 AI 탭 채팅 화면, 사용자용 리뷰 AI 요약, 사장님 관리 리포트, 플랫폼 공통 인사이트 순서로 진행한다. 사장님 리포트는 `my/reports/` 하위에 게스트하우스별/스텝 공고별 상세 리포트와 "이번 주 게하르방 트렌드" 화면을 분리해 둔다.

지도 탭 구현 상세:

| 단계 | 작업 | 주요 파일/영역 |
|------|------|----------------|
| 1 | 지도 탭 준비중 알림 제거, `MapView` 렌더링 | `app/(tabs)/map.tsx` |
| 1 | 지도 마커 타입/API 서비스 추가 | `src/types/models/map/`, `src/services/map/map.ts` |
| 1 | 게스트하우스/스텝 공고/전체 보기 필터 추가 | 지도 상단 segmented control |
| 1 | bounds 변경 시 `/api/v1/maps/markers` 호출 | 지도 이동 완료 이벤트 |
| 1 | 마커 클릭 시 바텀시트 카드 표시 | 게스트하우스/스텝 공고 요약 카드 |
| 2 | 현재 위치 이동, 지역 빠른 필터 추가 | 지도 floating button/filter |
| 2 | AI 챗봇 추천 결과와 지도 연결 | AI 카드에서 지도 탭으로 이동 |

지도 탭 화면 구성:

- 상단: 검색 입력 또는 지역 필터
- 지도: 게스트하우스/스텝 공고 마커
- 필터: 전체, 게스트하우스, 스텝 공고
- 마커 선택: 하단 바텀시트에 이미지, 이름, 요약, 상세 이동 버튼
- 빈 상태: 현재 지도 영역에 결과가 없다는 안내
- 에러 상태: 재시도 버튼

AI/리포트 프론트 구현 상세:

| 단계 | 작업 | 주요 파일/영역 |
|------|------|----------------|
| 1 | AI 탭 채팅 UI 구현 | `app/(tabs)/ai.tsx` |
| 1 | AI 메시지/카드 타입 추가 | `src/types/models/ai/` |
| 1 | AI 채팅 API 서비스 추가 | `src/services/ai/ai.ts` |
| 1 | 답변 카드 컴포넌트 구현 | 게스트하우스/스텝 공고/관광지 카드 |
| 2 | 게스트하우스 상세 리뷰 섹션 위 AI 요약 노출 | `app/guestHouse/guestHouseDetail/[id]/` |
| 2 | 리뷰 키워드 API 서비스/타입 추가 | `src/services/review/`, `src/types/models/review/` |
| 3 | 사장님 리포트 진입점 추가 | 내 게스트하우스 관리, 내 스텝 공고 관리 |
| 3 | 게스트하우스별 운영 리포트 화면 | `app/my/reports/guestHouse/[id].tsx` |
| 3 | 스텝 공고별 운영 리포트 화면 | `app/my/reports/stepRecruitment/[id].tsx` |
| 4 | 플랫폼 공통 인사이트 화면 | `app/my/reports/insights.tsx` |

AI 탭 화면 구성:

- 상단: 대화 제목 또는 "게하르방 AI"
- 본문: 사용자 말풍선, AI 말풍선, 추천 카드 리스트
- 하단: 메시지 입력창, 전송 버튼
- 빈 상태: 추천 질문 3~4개
- 에러 상태: 재시도 버튼과 간단한 안내

유저용 리뷰 AI 요약 화면 구성:

- 위치: 리뷰 목록 바로 위
- 노출 조건: `visible === true`
- 표시 항목: `리뷰 요약`, `자주 언급된 키워드`
- 숨김 조건: 리뷰 3개 미만 또는 API 응답 `visible === false`

사장님 리포트 화면 구성:

- 상단: 대상 게시글/공고 이름, 기간 선택
- 지표 카드: 조회 수, 찜 수, 채팅 문의 수, 지원 수, 리뷰 수, 평균 평점
- AI 인사이트: 반복 질문, 리뷰 긍정/개선 키워드, 상세 페이지 보강 제안
- 플랫폼 비교: 이번 주 전체 트렌드와 내 게시글의 부족한 정보

### 주요 화면 경로

```
app/
├── (tabs)/
│   ├── index.tsx                        # 홈
│   ├── map.tsx                          # 지도 탭 (준비중)
│   ├── ai.tsx                           # AI 탭 (향후 통합 AI 챗봇)
│   ├── chats.tsx                        # 채팅 탭
│   ├── guestHouseEnroll.tsx             # 숨김 탭
│   ├── stepRecruitment.tsx              # 숨김 탭
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
│   ├── reports/                         # 향후 사장님 운영/플랫폼 인사이트 리포트
│   │   ├── guestHouse/[id].tsx          # 향후 게스트하우스별 운영 리포트
│   │   ├── stepRecruitment/[id].tsx     # 향후 스텝 공고별 운영 리포트
│   │   └── insights.tsx                 # 향후 플랫폼 공통 인사이트 리포트
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
| URL 설정 | `src/config/url.ts` | API/이미지/파일 URL 생성, fallback 관리 |
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

#### useActiveChatRoomStore (`src/stores/chat/`)
```typescript
{
  activeRoomId: number | null,
  setActiveRoomId(roomId): void
}
```
현재 사용자가 열어둔 채팅방 id를 저장한다. 전역 채팅 WebSocket이 새 메시지를 받을 때 현재 방의 메시지라면 채팅 탭의 읽지 않은 수를 올리지 않기 위해 사용한다.

---

## 7. API 통신

### Axios 설정 (`src/services/api/customAxios.ts`, `src/config/url.ts`)

```typescript
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  process.env.EXPO_PUBLIC_BASE_URL ||
  "https://geharbang.org";

export const ASSET_BASE_URL =
  process.env.EXPO_PUBLIC_ASSET_URL ||
  process.env.EXPO_PUBLIC_BASE_URL ||
  process.env.EXPO_PUBLIC_API_URL ||
  "https://geharbang.org";

// 인증이 필요한 API용 — 요청마다 토큰 자동 주입
export const axiosPrivate = axios.create({ baseURL: API_BASE_URL });
axiosPrivate.interceptors.request.use(async (config) => {
  const token = await getAccessToken(TOKEN_KEYS.ACCESS_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 인증 불필요한 API용 (로그인 등)
export const axiosPublic = axios.create({ baseURL: API_BASE_URL });

// 공개 조회 API지만 로그인 사용자의 개인화 필드가 필요한 경우
export const axiosOptionalAuth = axios.create({ baseURL: API_BASE_URL });
axiosOptionalAuth.interceptors.request.use(async (config) => {
  const token = await getAccessToken(TOKEN_KEYS.ACCESS_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

이미지와 파일 경로는 `src/config/url.ts`의 `buildAssetUrl()`을 통해 공통 생성한다. 이 함수는 상대 경로에 `ASSET_BASE_URL`을 붙이고, 이미 `http/https`인 절대 URL은 그대로 사용한다.

`API_BASE_URL`은 `.env`의 `EXPO_PUBLIC_API_URL` 또는 `EXPO_PUBLIC_BASE_URL` 값이며, 값이 없으면 `https://geharbang.org`를 기본값으로 사용한다.
`ASSET_BASE_URL`은 `EXPO_PUBLIC_ASSET_URL`을 최우선으로 사용하고, 값이 없으면 `EXPO_PUBLIC_BASE_URL`, `EXPO_PUBLIC_API_URL`, 기본값 순서로 fallback 한다.
에셋 서버를 별도로 두지 않는 환경에서는 `EXPO_PUBLIC_ASSET_URL` 없이도 동작한다.
게스트하우스/스텝 공고 목록과 상세처럼 비회원도 조회 가능하지만 로그인 사용자의 `isWished`가 필요한 API는 `axiosOptionalAuth`를 사용한다.
`axiosOptionalAuth`는 토큰이 있으면 붙이되, 서버가 `INVALID_TOKEN`을 반환하면 로컬 토큰을 제거하고 같은 요청을 익명으로 한 번 재시도한다.
공개 상세 화면이 오래된 토큰 때문에 빈 화면처럼 보이는 것을 막기 위한 방어 로직이다.

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
페이지 번호는 수동 query string 대신 Axios `params` 옵션으로 전달한다.
목록 응답의 찜 여부 필드는 `isWished`이며, `wished`가 아니다.

### 알림 API

알림 목록/읽음 처리는 로그인 토큰이 필요한 기능이므로 `axiosPrivate`를 사용한다.

| 기능 | Endpoint | FE 위치 |
|------|----------|---------|
| 내 알림 목록 | `GET /api/v1/notifications?pageNumber=0` | `src/services/notification/notification.ts` |
| 읽지 않은 개수 | `GET /api/v1/notifications/unread-count` | 홈 헤더 알림 배지 |
| 단일 읽음 처리 | `PATCH /api/v1/notifications/{id}/read` | 알림 카드 클릭 |
| 전체 읽음 처리 | `PATCH /api/v1/notifications/read-all` | 알림 화면의 `모두 읽음` |
| 알림 설정 조회 | `GET /api/v1/notification-settings` | 내 정보 > 알림 설정 |
| 알림 설정 변경 | `PATCH /api/v1/notification-settings` | 푸시/채팅 알림 on/off |
| 푸시 토큰 등록 | `POST /api/v1/push-tokens` | 로그인 후 Expo Push Token 등록 |
| 푸시 토큰 해제 | `DELETE /api/v1/push-tokens` | 로그아웃 시 토큰 비활성화 |

알림 화면은 `app/notifications/index.tsx`이며, React Query 훅은 `src/hooks/notification/useNotifications.ts`에 모아둔다.
푸시 권한/토큰 등록과 알림 클릭 이동은 `src/hooks/notification/usePushNotifications.ts`에서 처리한다.
`pushEnabled`는 앱 외부 OS 푸시만 제어하고, `chatPushEnabled`는 채팅 알림 자체를 제어한다. 따라서 `chatPushEnabled=false`이면 채팅 인앱 알림도 쌓이지 않고 푸시도 발송되지 않는다.
기존 dev client에 `expo-notifications` 네이티브 모듈이 없을 수 있으므로 `src/utils/notification/getExpoNotifications.ts`에서 optional load로 감싼다.
알림 설정 화면의 사용자 문구는 `휴대폰 알림`, `새 채팅 알림`으로 표시한다.
채팅 WebSocket으로 새 메시지를 받으면 `notifications` query도 invalidate 해서 홈 알림 배지와 알림 목록이 뒤늦게 갱신되지 않게 한다.

### 채팅 API

채팅은 REST로 방/메시지를 조회·저장하고, WebSocket으로 새 메시지를 실시간 반영한다.

| 기능 | Endpoint | FE 위치 |
|------|----------|---------|
| 채팅방 생성/조회 | `POST /api/v1/chats/rooms` | `src/services/chat/chat.ts` |
| 채팅방 목록 | `GET /api/v1/chats/rooms` | `app/chats/index.tsx` |
| 메시지 목록 | `GET /api/v1/chats/rooms/{roomId}/messages?pageNumber=0` | `app/chats/[roomId].tsx` |
| 메시지 전송 | `POST /api/v1/chats/rooms/{roomId}/messages` | 채팅 입력창 |
| 읽음 처리 | `PATCH /api/v1/chats/rooms/{roomId}/read` | 채팅방 진입 시 |
| 실시간 수신 | `/ws/chats?token={accessToken}` | 전역 채팅 목록/탭 배지 갱신 |
| 채팅방 실시간 수신 | `/ws/chats?token={accessToken}&roomId={roomId}` | 현재 채팅방 메시지 갱신 |

스텝 공고 상세는 하단 고정 액션바에서 `채팅하기:지원하기 = 3:7` 비율로 제공한다.
게스트하우스 상세는 하단 고정 `채팅하기` 버튼으로 채팅방을 생성/진입한다.
채팅방에서는 내 메시지는 오른쪽 파란 말풍선, 상대 메시지는 왼쪽 프로필/이름/흰 말풍선으로 구분한다.
메시지 목록은 날짜가 바뀌는 첫 메시지 앞에 날짜 구분선을 표시한다. 오늘/어제는 짧게 표시하고, 이전 날짜 메시지는 말풍선 시간에도 날짜를 함께 노출해 긴 대화에서도 날짜를 구분할 수 있게 한다.
Android 키보드가 입력창을 가리지 않도록 키보드 높이를 감지해 입력바를 `absolute bottom`으로 직접 올린다.
채팅방 WebSocket 연결에는 `roomId`를 함께 전달해 BE가 상대방의 채팅방 접속 상태를 판단할 수 있게 한다.
루트 레이아웃의 `AppChatEffects`에서 로그인 상태일 때 전역 WebSocket을 연결한다. 이 연결은 채팅 목록을 보고 있지 않아도 채팅 탭의 읽지 않은 메시지 배지를 갱신한다.
채팅방 화면도 별도 WebSocket을 연결한다. 현재 방 id는 `useActiveChatRoomStore`에 저장해, 열어둔 방에서 온 메시지는 읽지 않은 수로 누적하지 않는다.
채팅방 진입/새 메시지 수신 후 읽음 처리가 완료되면 `chats.rooms`와 `notifications` query를 함께 invalidate 한다.

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

### 리뷰 UI

게스트하우스 상세와 스텝 공고 상세는 같은 `ReviewSection` 컴포넌트를 사용한다.

| 기능 | 동작 |
|------|------|
| 리뷰 목록 | 최신순 리뷰와 첨부 이미지를 표시 |
| 리뷰 요약 | 평균 별점, 리뷰 수, 내 리뷰 작성 여부를 표시 |
| 작성 버튼 | `canWriteReview`가 true일 때 노출. 게스트하우스는 내 리뷰가 없으면 노출 |
| 스텝 공고 권한 안내 | 합격자가 아니면 작성 버튼 대신 안내 문구 표시 |
| 별점 | 별의 왼쪽/오른쪽 터치로 `0.5`점 단위 선택 |
| 사진 첨부 | 공통 `/api/v1/images` 업로드 API 사용, 최대 5장 |
| 수정/삭제 | `review.isMine`인 리뷰에만 수정/삭제 버튼 노출 |

관련 파일:

| 역할 | 파일 |
|------|------|
| 리뷰 섹션 UI | `src/components/review/ReviewSection.tsx` |
| 리뷰 조회/작성/수정/삭제 hook | `src/hooks/review/useReviews.ts` |
| 리뷰 API service | `src/services/review/review.ts` |
| 리뷰 이미지 업로드 | `src/services/review/uploadReviewImages.ts` |

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
  → accessToken, userId를 Expo Secure Store에 저장
  → useAuthStore.setAccessToken(token)
  → 로그인 완료

[로그아웃]
  → Secure Store에서 accessToken, userId 삭제
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
  - 웹에서는 `AddressMapDetail.web.tsx` fallback UI 사용
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

### 사장님 인증

```
1. 인증서 파일 선택 (expo-document-picker → PDF/이미지)
2. 파일 업로드 API → fileUrl 반환
3. 사업체명, 대표자명, 전화번호 입력
4. 인증서 제출 → 관리자 심사 대기
5. profile 화면에서 심사 상태 표시
   - isAdmin == true                  → "관리자" 배지 + 관리자 기능 + 사장님 기능 활성화
   - certificateStatus == "검토_대기" → "심사 중" 배지
   - certificateStatus == "승인_완료" → "인증 사장님" 배지 + 사장님 기능 활성화
   - certificateStatus == "거부됨"   → "거절됨" 안내 + 재신청 유도
   - certificateStatus == null       → 인증서 신청 유도
```

**profile 화면 권한 분기 기준 (`GET /api/v1/user/profile`):**

| 필드 | 값 | 화면 처리 |
|------|----|----------|
| `isOwner` | true | "인증 사장님" 배지, 내 게스트하우스 관리, 구인 공고 관리 메뉴 표시 |
| `inReview` | true | "심사 중" 배지 표시 |
| `isAdmin` | true | "관리자" 배지, 인증서 심사 대시보드 버튼 표시, 사장님 기능 메뉴 표시 |
| `certificateStatus` | `거부됨` | 거절 안내 및 재신청 유도 |

**현재 구현 기준:**
- 프로필 조회는 로그인 여부만 기준으로 실행한다. 지원서 작성 여부와 권한 정보는 분리되어 있다.
- 사장님 기능 메뉴는 `isOwner || isAdmin`이면 표시한다.
- 배지는 `isAdmin`을 우선한다. 관리자면 "관리자"만 표시하고, 관리자가 아닌 인증 사장님이면 "인증 사장님"을 표시한다.

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
| `TokenKeys.ts` | 스토리지 키 상수 (`ACCESS_TOKEN`, `USER_ID`) |

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

Expo Secure Store를 감싼 래퍼. access token과 userId 저장/조회/삭제를 공통 처리한다.

---

## 12. 환경변수 및 빌드

### 앱 설정 (`app.config.ts`)

앱 표시 이름과 아이콘은 `app.config.ts`에서 관리한다.

```typescript
const config: ExpoConfig = {
  name: "게하르방",
  icon: "./assets/icon.png",
  android: {
    versionCode: 7,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#33A8F8",
    },
  },
  ios: {
    bundleIdentifier: "com.econovation.geharbang",
  },
};
```

- `assets/icon.png`: 기본 앱 아이콘. 1024x1024 PNG를 사용한다.
- `assets/adaptive-icon.png`: Android adaptive icon foreground. 런처 마스크에 잘리지 않도록 로고를 중앙에 작게 배치하고 주변은 투명하게 둔다.
- Android adaptive icon의 실제 배경색은 `android.adaptiveIcon.backgroundColor`가 담당한다.
- 이름/아이콘 변경은 JS reload만으로 반영되지 않으며, `npx expo prebuild --platform android --no-install` 후 새 네이티브 빌드를 설치해야 확인할 수 있다.

### 환경변수

| 변수명 | 용도 |
|--------|------|
| `EXPO_PUBLIC_ASSET_URL` | 선택 사항. 이미지/파일 전용 에셋 서버 주소 |
| `EXPO_PUBLIC_BASE_URL` | 이미지/파일 URL 기본 주소, API URL fallback |
| `EXPO_PUBLIC_API_URL` | API 요청 기본 주소 |
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
npx expo prebuild --platform android --no-install
npx expo-doctor
npx expo export --platform web
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
