# Geharbang-FE 학습 가이드

이 문서는 Geharbang-FE 코드를 읽으면서 같이 공부하면 좋은 주제를 정리한 문서다.
React Native/Expo 자체를 외우기보다, 이 프로젝트에서 실제로 쓰이는 흐름을 따라가며 학습하는 것을 목표로 한다.

---

## 1. Expo Router와 앱 화면 구조

### 공부할 것

- 파일 기반 라우팅
- `(tabs)` 라우트 그룹
- `_layout.tsx` 역할
- 동적 라우트 `[id]`
- `router.push`, `router.replace`, `useLocalSearchParams`

### 이 프로젝트에서 보는 곳

| 주제 | 코드 |
|------|------|
| 루트 레이아웃 | `app/_layout.tsx` |
| 하단 탭 레이아웃 | `app/(tabs)/_layout.tsx` |
| 지도/AI 준비중 탭 | `app/(tabs)/map.tsx`, `app/(tabs)/ai.tsx` |
| 채팅 탭 | `app/(tabs)/chats.tsx`, `app/chats/index.tsx` |
| 내 정보 탭 | `app/(tabs)/profile.tsx` |
| 게스트하우스 상세 동적 라우트 | `app/guestHouse/guestHouseDetail/[id]/index.tsx` |
| 스텝 공고 상세 동적 라우트 | `app/step/stepDetail/[id]/index.tsx` |
| 게스트하우스 등록 플로우 | `app/guestHouse/enroll/*` |
| 스텝 공고 등록 플로우 | `app/step/recruitment/*` |

### 코드에서 확인할 포인트

- `app/_layout.tsx`에서 `QueryClientProvider`, `SafeAreaProvider`, `ThemeProvider`, Sentry, 폰트 로딩, 인증 토큰 로딩을 묶는다.
- 하단 탭은 `홈 / 지도 / AI / 채팅 / 내정보` 순서로 노출한다.
- 지도와 AI 탭은 현재 `Alert.alert("준비중", ...)`을 띄우고 이동을 막는다.
- `guestHouseEnroll`, `stepRecruitment`는 탭 파일로 남아 있지만 `href: null`로 숨긴다.
- 채팅 탭은 채팅방 `unreadCount` 합산 값을 배지로 표시한다.
- 멀티스텝 폼 라우트는 `gestureEnabled: false`로 뒤로가기 제스처를 제한한다.
- `(tabs)` 폴더는 URL에는 직접 나타나지 않는 라우트 그룹이다.

### 직접 해볼 것

- `profile.tsx`에서 사장님 메뉴를 눌렀을 때 어떤 라우트로 이동하는지 따라가기
- `[id]` 폴더 화면에서 id를 읽어 API 호출에 넘기는 흐름을 확인하기

---

## 2. React Query로 서버 상태 관리하기

### 공부할 것

- `useQuery`와 `useMutation`
- queryKey 설계
- `enabled` 조건
- `invalidateQueries`
- 로딩/에러 상태 처리

### 이 프로젝트에서 보는 곳

| 주제 | 코드 |
|------|------|
| 게스트하우스 추천 조회 | `src/hooks/home/useGuestHouseRecommendation.ts` |
| 스텝 공고 목록 조회 | `src/hooks/stepList/useStaffRecruitmentList.ts` |
| 내 게스트하우스 관리 | `src/hooks/myGuestHouse/useMyGuestHouse.ts` |
| 내 구인 공고 관리 | `src/hooks/myStepRecruitment/useMyStepRecruitment.ts` |
| 게스트하우스 등록 mutation | `src/hooks/guestHouse/useGuestHouseEnrollment.ts` |
| 스텝 공고 등록 mutation | `src/hooks/stepRecruitment/useCreateStaffRecruitment.ts` |

### 코드에서 확인할 포인트

- 서버에서 받은 목록/상세 데이터는 Zustand가 아니라 React Query 또는 hook local state가 관리한다.
- 삭제/상태 변경 성공 후에는 관련 queryKey를 무효화해서 화면을 다시 동기화한다.
- `useStaffRecruitmentList`는 `useInfiniteQuery` 대신 직접 페이지 상태와 `loadMore()`를 관리한다.
- 찜 토글은 현재 목록 cache를 직접 갱신하지 않고 카드 로컬 상태에서 optimistic update와 rollback을 처리한다.

### 직접 해볼 것

- `usePatchMyGuestHouseStatus()` 성공 후 어떤 queryKey가 무효화되는지 확인하기
- 게스트하우스 수정 API를 붙인다면 어떤 queryKey를 invalidate해야 하는지 적어 보기
- `useToggleWish`가 `type`에 따라 스텝 공고/게스트하우스 찜 API를 어떻게 나누어 호출하는지 따라가기
- `useMyWishedPosts`가 내가 찜한 스텝 공고/게스트하우스 목록 API를 기존 목록 응답 타입으로 재사용하는지 확인하기

---

## 3. Axios 인스턴스와 인증 토큰

### 공부할 것

- Axios instance
- request interceptor
- Authorization Bearer header
- Expo Secure Store
- 공개 API와 인증 API 분리

### 이 프로젝트에서 보는 곳

| 주제 | 코드 |
|------|------|
| Axios 설정 | `src/services/api/customAxios.ts` |
| 토큰 전역 상태 | `src/stores/auth/useAuthStore.ts` |
| Secure Store 래퍼 | `src/utils/login/secureStore.ts` |
| OAuth callback 처리 | `app/oauth-callback.tsx` |
| 로그인 URL 요청 | `src/services/login/loginUrlRequest.ts` |
| OAuth 인증 요청 | `src/services/login/oauthAuth.ts` |

### 코드에서 확인할 포인트

- `axiosPrivate`는 요청마다 Secure Store에서 access token을 읽어 `Authorization: Bearer {token}`을 붙인다.
- `axiosPublic`은 공개 목록 조회나 로그인처럼 토큰이 필요 없는 API에 사용한다.
- `axiosOptionalAuth`는 토큰이 있으면 붙이고 없으면 그대로 요청한다. 비회원도 볼 수 있지만 로그인 사용자의 `isWished`가 필요한 게스트하우스/스텝 공고 목록과 상세 조회에 사용한다.
- 찜 추가/삭제 API는 로그인 필수이므로 `axiosPrivate`를 사용한다.
- `src/config/url.ts`가 API 기본 주소와 이미지/파일 URL 생성 규칙을 함께 관리한다.
- 앱 시작 시 `useAuthStore.loadToken()`을 호출하고, `isAuthReady`가 true가 될 때까지 화면을 렌더링하지 않는다.

### 직접 해볼 것

- 토큰이 없는 상태에서 `axiosPrivate` API를 호출하면 서버가 어떻게 응답하는지 확인하기
- 공개 조회 API에 `axiosPrivate`를 쓰면 어떤 문제가 생길 수 있는지 정리하기
- `axiosOptionalAuth`를 쓰는 API에서 로그인/비로그인 응답의 `isWished` 값이 어떻게 달라지는지 비교하기

---

## 4. Zustand와 멀티스텝 폼 상태

### 공부할 것

- Zustand store
- slice 패턴
- `persist` middleware
- AsyncStorage
- Date 직렬화/역직렬화

### 이 프로젝트에서 보는 곳

| 주제 | 코드 |
|------|------|
| 게스트하우스 등록 스토어 | `src/stores/guestHouse/useGuestHouseStore.ts` |
| 게스트하우스 단계별 slice | `src/stores/guestHouse/slice/*` |
| 스텝 공고 등록 스토어 | `src/stores/stepRecruitment/useStepRecruitmentStore.ts` |
| 스텝 공고 단계별 slice | `src/stores/stepRecruitment/slice/*` |
| 지원서 작성 스토어 | `src/stores/application/useApplicationSlice.ts` |
| 활성 채팅방 스토어 | `src/stores/chat/useActiveChatRoomStore.ts` |
| 스토어 타입 | `src/types/store/*` |

### 코드에서 확인할 포인트

- 게스트하우스 등록 스토어는 `guesthouse-enrollment-storage` key로 AsyncStorage에 저장된다.
- 스텝 공고 등록 스토어는 `step-recruitment-storage` key를 쓰고, `Date` 필드를 복원하기 위한 custom storage reviver가 있다.
- 등록 완료 후에는 `resetAllData()`를 호출해 이전 작성 데이터가 남지 않게 해야 한다.
- `useActiveChatRoomStore`는 현재 열어둔 채팅방 id를 저장한다. 전역 WebSocket이 현재 방 메시지를 읽지 않은 수로 누적하지 않게 하는 용도다.

### 직접 해볼 것

- 앱을 껐다 켜도 게스트하우스 등록 데이터가 유지되는 흐름을 AsyncStorage 관점에서 설명하기
- 스텝 공고 근무 시간의 `Date`가 JSON 저장 후 다시 `Date` 객체로 복원되는 이유를 설명하기

---

## 5. 멀티스텝 폼 검증과 제출 변환

### 공부할 것

- 단계별 validation
- UI 상태와 API request DTO 분리
- transformer 함수
- enum/string 매핑
- 로컬 이미지와 서버 이미지 URL 구분

### 이 프로젝트에서 보는 곳

| 주제 | 코드 |
|------|------|
| 게스트하우스 단계별 검증 | `src/hooks/guestHouse/useGuestHouseStep*Validation.ts` |
| 게스트하우스 요청 변환 | `src/utils/guestHouse/enrollDataTransformer.ts` |
| 스텝 공고 단계별 검증 | `src/hooks/stepRecruitment/useStep*Validation.ts` |
| 스텝 공고 요청 변환 | `src/utils/stepRecruitment/transformStoreToApi.ts` |
| 게스트하우스 제출 hook | `src/hooks/guestHouse/useGuestHouseEnrollment.ts` |
| 스텝 공고 제출 hook | `src/hooks/stepRecruitment/useHandleStepRecruitmentSubmit.ts` |

### 코드에서 확인할 포인트

- UI에서 쓰는 값과 백엔드 enum 값이 다를 수 있어 transformer에서 변환한다.
- 게스트하우스 이미지 제출 전 `file://` 로컬 이미지는 먼저 업로드하고, 서버 URL만 request body에 넣는다.
- `transformImagesToUrls()`는 아직 업로드되지 않은 `file://` 이미지가 남아 있으면 에러를 던진다.

### 직접 해볼 것

- `디너 파티`가 API 요청에서 `디너_파티`로 바뀌는 흐름을 찾아보기
- 수정 화면을 만들 때 기존 이미지 URL과 새 로컬 이미지를 어떻게 섞어 처리해야 하는지 설계해 보기

---

## 6. 이미지/파일 업로드

### 공부할 것

- Expo ImagePicker
- Expo DocumentPicker
- React Native FormData
- multipart/form-data
- 서버 URL과 앱 내부 파일 URI의 차이

### 이 프로젝트에서 보는 곳

| 주제 | 코드 |
|------|------|
| 다중 이미지 선택 hook | `src/hooks/form/useMultiImagePicker.ts` |
| 단일 이미지 선택 hook | `src/hooks/form/useSingleImagePicker.ts` |
| 게스트하우스 이미지 업로드 | `src/services/guestHouse/uploadGuestHouseImages.ts` |
| 스텝 공고 이미지 업로드 | `src/services/step/uploadRecruitmentImages.ts` |
| 지원서 프로필 이미지 업로드 | `src/services/application/uploadImage.ts` |
| 인증서 파일 업로드 | `src/services/operator/uploadCertificateFile.ts` |
| 인증서 파일 처리 유틸 | `src/utils/operator/fileOperations.ts`, `src/utils/operator/documentUpload.ts` |

### 코드에서 확인할 포인트

- 게스트하우스/스텝 공고 이미지는 `/api/v1/images`에 `images` 필드로 업로드하고 `imageUrl` 배열을 받는다.
- 지원서 프로필 이미지는 `/api/v1/application/images`에 `image` 필드로 1장만 업로드한다.
- 인증서 파일은 `file`, `fileType`, `fileName`을 함께 보낸다.

### 직접 해볼 것

- 이미지 업로드 응답 URL이 등록 request의 `imageUrls`에 들어가기까지 흐름을 그려 보기
- 수정 API를 붙일 때 이미 업로드된 URL은 다시 업로드하지 않아야 하는 이유를 설명하기

---

## 7. 권한 UI 분기와 사용자 프로필

### 공부할 것

- 인증 여부와 권한 여부의 차이
- `isOwner`, `inReview`, `isAdmin`, `certificateStatus` 의미
- 401/403 에러 처리
- 권한 UI와 서버 권한 검증의 관계

### 이 프로젝트에서 보는 곳

| 주제 | 코드 |
|------|------|
| 내 정보 화면 | `app/(tabs)/profile.tsx` |
| 프로필 조회 service | `src/services/application/myApplication/myInfomation.ts` |
| 프로필 조회 hook | `src/hooks/application/myApplication/useMyInfomation.ts` |
| 인증서 제출 화면 | `app/operator/verify/index.tsx` |
| 인증서 심사 화면 | `app/operator/management/index.tsx` |
| 인증서 승인/거부 hook | `src/hooks/operator/useUpdateCertificateStatus.ts` |

### 코드에서 확인할 포인트

- 사장님 메뉴는 `isOwner || isAdmin` 기준으로 표시한다. 관리자는 사장님 인증 없이도 게스트하우스/스텝 공고 작성 권한을 가진다.
- 시스템 운영자 심사 메뉴는 `isAdmin` 기준으로 표시한다.
- `inReview`는 심사 중 안내에 사용하고, 사장님 메뉴 노출 기준으로 쓰면 안 된다.
- 프로필 조회 hook은 로그인 여부만 기준으로 실행한다. 지원서가 없는 사용자도 권한 정보를 볼 수 있어야 한다.
- 배지는 관리자 우선이다. `isAdmin`이면 "관리자"만 표시하고, 관리자가 아니면서 `isOwner`이면 "인증 사장님"을 표시한다.

### 직접 해볼 것

- 지원서를 작성하지 않았지만 사장님 인증은 완료된 사용자가 내 정보 화면에서 사장님 메뉴를 볼 수 있는지 확인하기
- 관리자 계정이 "관리자" 배지와 사장님 기능 메뉴를 동시에 갖는지 확인하기
- 403 `NOT_APPROVED_OWNER`가 발생했을 때 어떤 hook에서 Alert를 띄우는지 확인하기

---

## 8. 목록 필터, 검색, 페이지네이션

### 공부할 것

- controlled input
- debounce
- Axios `params` 옵션
- 무한 스크롤
- AbortController
- hasNext 기반 페이지 종료

### 이 프로젝트에서 보는 곳

| 주제 | 코드 |
|------|------|
| 게스트하우스 목록 hook | `src/hooks/guestHouse/useGuestHousePostList.ts` |
| 스텝 공고 목록 hook | `src/hooks/stepList/useStaffRecruitmentList.ts` |
| 게스트하우스 목록 service | `src/services/guestHouse/guestHouseList.ts` |
| 스텝 공고 목록 service | `src/services/step/staffRecruitment.ts` |
| 필터 상수 | `src/utils/constants/filterOptions.ts` |
| debounce hook | `src/hooks/useDebounce.ts` |

### 코드에서 확인할 포인트

- 검색어는 300ms debounce 후 요청한다.
- query parameter는 가능하면 Axios `params`로 전달한다.
- 필터가 배열이면 같은 query key를 여러 번 append한다. 예: `region=제주시&region=서귀포시`
- 이전 요청이 남아 있으면 AbortController로 취소한다.

### 직접 해볼 것

- 스텝 공고 목록에서 필터를 바꾸면 `page`, `data`, `hasMore`가 어떻게 초기화되는지 따라가기
- BE Querydsl 필터 조건과 FE query string 이름이 맞는지 대조해 보기

---

## 9. 공통 UI 컴포넌트와 NativeWind

### 공부할 것

- React Native 기본 컴포넌트
- NativeWind className
- tailwind-variants
- 공통 컴포넌트 추상화 기준
- controlled component

### 이 프로젝트에서 보는 곳

| 주제 | 코드 |
|------|------|
| 버튼 | `src/components/ui/Button/Button.tsx`, `button.variants.ts` |
| 텍스트 | `src/components/ui/TextSize.tsx` |
| 입력 | `src/components/ui/TextInput.tsx` |
| 체크박스 | `src/components/ui/Checkbox/*` |
| 폼 섹션 | `src/components/ui/Form/*` |
| 모달 | `src/components/ui/Modal/*` |
| 레이아웃 | `src/components/layout/*` |
| 색상 상수 | `src/utils/constants/colors.ts` |
| Tailwind 설정 | `tailwind.config.js` |

### 코드에서 확인할 포인트

- 공통 UI는 `src/components/ui`, 화면 전용 컴포넌트는 `app/{feature}/_components`에 둔다.
- Button은 variant를 분리해 화면마다 색상/상태를 직접 중복 구현하지 않는다.
- `TextSize`를 사용해 텍스트 스타일을 통일한다.

### 직접 해볼 것

- 기존 Button variant에 없는 상태가 필요할 때 새 variant를 어디에 추가해야 하는지 찾아보기
- 화면 전용 컴포넌트를 공통 컴포넌트로 승격해야 하는 기준을 사례로 정리하기

---

## 10. 타입스크립트 타입 설계

### 공부할 것

- interface와 type 차이
- API request/response 타입
- 도메인 모델 타입
- store 타입
- nullable과 optional

### 이 프로젝트에서 보는 곳

| 주제 | 코드 |
|------|------|
| 게스트하우스 등록 request 타입 | `src/types/api/guestHouse/GuestHouseEnrollRequest.ts` |
| 게스트하우스 목록 모델 | `src/types/models/guestHouse/types.ts` |
| 스텝 공고 request 타입 | `src/types/models/stepRecruitment/StaffRecruitmentRequest.ts` |
| 게스트하우스 store 타입 | `src/types/store/guestHouseStore.ts` |
| 스텝 공고 store 타입 | `src/types/store/stepRecruitmentStore.ts` |
| 공통 파일 타입 | `src/types/File.ts` |

### 코드에서 확인할 포인트

- API request 타입은 백엔드 DTO와 필드명이 맞아야 한다.
- UI 단계별 store 타입은 사용자가 입력하기 좋은 형태이고, submit 직전에 API 타입으로 변환된다.
- nullable 필드는 백엔드와 맞춰 `null`을 명확히 보내는 편이 좋다.

### 직접 해볼 것

- `GuestHouseEnrollData`와 `GuestHouseEnrollRequest`가 어떻게 다른지 비교해 보기
- 백엔드 DTO에 필드가 추가되면 FE에서 어떤 타입, transformer, validation을 수정해야 하는지 체크리스트 만들기

---

## 11. 에러 처리와 사용자 피드백

### 공부할 것

- AxiosError 판별
- HTTP status별 처리
- Alert와 화면 에러 메시지
- 요청 취소 에러 무시
- 로딩 상태와 버튼 비활성화

### 이 프로젝트에서 보는 곳

| 주제 | 코드 |
|------|------|
| API 에러 메시지 유틸 | `src/utils/api/errorHandler.ts` |
| 게스트하우스 등록 403 처리 | `src/hooks/guestHouse/useGuestHouseEnrollment.ts` |
| 스텝 공고 등록 403 처리 | `src/hooks/stepRecruitment/useCreateStaffRecruitment.ts` |
| 목록 조회 에러 처리 | `src/hooks/stepList/useStaffRecruitmentList.ts` |
| 공통 에러 화면 | `src/components/ui/ErrorMessage.tsx` |
| 로딩 스켈레톤 | `src/components/ui/LoadingSkeleton.tsx` |

### 코드에서 확인할 포인트

- 403은 사장님 인증 필요 Alert로 사용자에게 안내한다.
- 요청 취소(`AbortError`, `CanceledError`)는 실제 실패가 아니므로 에러 UI를 띄우지 않는다.
- mutation의 `isPending`을 버튼 로딩/비활성화에 연결한다.

### 직접 해볼 것

- 네트워크를 끊고 목록 조회를 했을 때 어떤 에러 메시지가 표시되는지 확인하기
- 등록 버튼을 여러 번 누르지 못하게 하려면 어떤 상태를 Button에 넘겨야 하는지 찾기

---

## 12. 지도, 주소, 외부 API

### 공부할 것

- react-native-maps
- Geocoding
- Google Maps API key
- 주소와 좌표 저장 구조
- 앱 환경변수와 빌드 설정

### 이 프로젝트에서 보는 곳

| 주제 | 코드 |
|------|------|
| 주소 입력 컴포넌트 | `src/components/ui/Address/Address.tsx` |
| 지도 컴포넌트 | `src/components/ui/Address/AddressMap.tsx` |
| 주소 상세 지도 | `src/components/ui/AddressMapDetail.native.tsx`, `src/components/ui/AddressMapDetail.web.tsx` |
| Google Maps 설정 | `app.config.ts` |
| 위치 request 변환 | `src/utils/guestHouse/enrollDataTransformer.ts`, `src/utils/stepRecruitment/transformStoreToApi.ts` |

### 코드에서 확인할 포인트

- API 요청의 좌표는 `[longitude, latitude]` 순서로 만들어진다.
- `GOOGLE_MAPS_API_KEY`는 `app.config.ts`에서 iOS/Android config에 주입된다.
- 웹에서는 `react-native-maps` 대신 fallback UI를 렌더링하도록 플랫폼 파일을 분리했다.

### 직접 해볼 것

- 주소 선택 후 store에 저장되는 값과 API request의 `location.coordinates` 값을 비교해 보기
- 위도/경도 순서를 반대로 보내면 백엔드 검색/지도 표시에서 어떤 문제가 생길지 생각해 보기

---

## 13. 빌드, 환경변수, 앱 설정

### 공부할 것

- Expo app config
- EAS build profile
- development build와 production build 차이
- `EXPO_PUBLIC_` 환경변수
- Sentry 초기화
- SVG transformer

### 이 프로젝트에서 보는 곳

| 주제 | 코드 |
|------|------|
| Expo 설정 | `app.config.ts` |
| EAS 빌드 설정 | `eas.json` |
| Metro/SVG 설정 | `metro.config.js` |
| Babel/NativeWind 설정 | `babel.config.js` |
| Tailwind 설정 | `tailwind.config.js` |
| Sentry 초기화 | `app/_layout.tsx` |

### 코드에서 확인할 포인트

- `EXPO_PUBLIC_API_URL`은 API 요청 기본 주소다.
- `EXPO_PUBLIC_ASSET_URL`은 선택 사항이며, 이미지/파일 서버를 분리할 때 사용한다.
- `EXPO_PUBLIC_BASE_URL`은 이미지/파일 URL 기본 주소이며, API 주소 fallback으로도 사용된다.
- `GOOGLE_MAPS_API_KEY`는 `app.config.ts`를 통해 native config에 들어간다.
- 현재 앱 설정은 `app.config.ts`로 단일화한다. `app.json`을 같이 두면 Expo 동적 config 검증에서 충돌이 날 수 있다.
- `@sentry/react-native`와 `expo-web-browser`는 `app.config.ts`의 `plugins`에 등록되어야 한다.
- 현재 OTA 업데이트용 `expo-updates`는 설치되어 있지 않으므로 앱 코드 변경은 새 빌드가 필요하다.
- `TOKEN_KEYS`에는 `ACCESS_TOKEN`, `USER_ID` 같은 Secure Store 키가 모여 있어 하드코딩을 줄인다.

### 직접 해볼 것

- `development`, `preview`, `production` 빌드 프로필의 차이를 `eas.json`에서 정리하기
- `.env` 값을 바꿨을 때 Metro 재시작이 필요한 경우를 확인하기
- `npx tsc --noEmit`, `npx expo-doctor`, `npx expo export --platform web`가 각각 무엇을 검증하는지 정리하기
- `npm audit fix --force`가 Expo SDK 다운그레이드를 제안할 때 바로 적용하면 안 되는 이유를 설명하기

---

## 14. 백엔드와 맞춰 읽기

### 공부할 것

- API 명세와 FE 타입 동기화
- BE enum과 FE 표시 문구 매핑
- 401/403/404 응답 처리
- 전체 교체형 수정 API
- `isWished`처럼 boolean 필드명이 BE JSON 응답과 FE 타입에서 정확히 맞아야 하는 이유
- BE가 `imageUrl: ""`를 내려줄 때 FE 카드가 placeholder를 보여주는 fallback 처리

### 같이 볼 파일

| FE | BE |
|----|----|
| `src/types/api/guestHouse/GuestHouseEnrollRequest.ts` | `GuestHouseCreateRequest.java` |
| `src/utils/guestHouse/enrollDataTransformer.ts` | `GuestHouseMapper.java`, `GuestHousePostService.java` |
| `src/types/models/stepRecruitment/StaffRecruitmentRequest.ts` | 스텝 공고 request DTO, `StaffRecruitmentService.java` |
| `src/services/api/customAxios.ts` | `TokenProcessor.java`, `@UserId` 처리 코드 |
| `app/(tabs)/profile.tsx` | `UserService.getProfile()` |

### 직접 해볼 것

- 게스트하우스 등록 request를 FE transformer 결과와 BE DTO 기준으로 필드별 대조하기
- 백엔드에 추가된 `PUT /api/v1/guest-houses/{id}`를 프론트에 연결할 때 필요한 파일 목록을 작성하기

---

## 15. 알림 기능 학습과 구현 가이드

알림은 **인앱 알림 화면**과 **푸시 알림 권한/토큰 등록**을 분리해서 생각한다.
앱 안에서 알림 목록이 먼저 안정적으로 동작해야, 푸시 알림이 실패해도 사용자가 나중에 알림을 확인할 수 있다.

### 공부할 것

- Expo Notifications 권한 요청
- Expo push token 발급과 서버 등록
- React Query로 알림 목록, 안 읽은 개수 관리
- 앱 상태별 알림 처리: foreground, background, killed
- 알림 클릭 시 특정 화면으로 이동하는 deep link 처리

### 추천 파일 구조

```
src/services/notification/
├── notification.ts          # 알림 목록, 읽음 처리 API
└── pushToken.ts             # Expo Push Token 등록/해제 API

src/hooks/notification/
├── useNotifications.ts      # 목록, unread count, 읽음 mutation
└── usePushNotifications.ts  # 권한 요청, token 등록, 푸시 클릭 이동

app/notifications/
└── index.tsx                # 알림 목록 화면
```

`expo-notifications` 네이티브 모듈이 아직 dev client에 없을 수 있으므로 `src/utils/notification/getExpoNotifications.ts`에서 optional load로 감싼다.

### 1단계: 인앱 알림 화면

먼저 서버 알림 목록을 조회해서 앱 안에서 보여준다.

**API 연결 예시:**

| 기능 | Method / Endpoint | FE 처리 |
|------|-------------------|---------|
| 알림 목록 | `GET /api/v1/notifications?pageNumber=0` | `useNotifications` |
| 안 읽은 개수 | `GET /api/v1/notifications/unread-count` | 홈 헤더 알림 배지 |
| 읽음 처리 | `PATCH /api/v1/notifications/{id}/read` | 알림 클릭 시 실행 |
| 전체 읽음 | `PATCH /api/v1/notifications/read-all` | 전체 읽음 버튼 |
| 알림 설정 조회 | `GET /api/v1/notification-settings` | 설정 화면 진입 시 조회 |
| 알림 설정 변경 | `PATCH /api/v1/notification-settings` | 푸시/채팅 알림 on/off |
| 푸시 토큰 등록 | `POST /api/v1/push-tokens` | 로그인 후 자동 등록 |
| 푸시 토큰 해제 | `DELETE /api/v1/push-tokens` | 로그아웃 시 자동 비활성화 |

`pushEnabled`는 OS 푸시 수신 여부만 제어하고, `chatPushEnabled`는 채팅 알림 자체를 제어한다. 채팅 알림을 끄면 알림함에도 새 채팅 알림이 쌓이지 않는다.
사용자에게 보이는 설정 문구는 `휴대폰 알림`, `새 채팅 알림`처럼 기능 중심으로 적는다.

**알림 타입별 이동 예시:**

| type | targetType | 이동 화면 |
|------|------------|----------|
| `CERTIFICATE_APPROVED` | `CERTIFICATE` | 내 정보 또는 사장님 기능 안내 |
| `CERTIFICATE_REJECTED` | `CERTIFICATE` | 사장님 인증 신청 화면 |
| `STAFF_APPLICATION_CREATED` | `APPLICATION_RECORD` | 내 스텝 공고 관리 |
| `APPLICATION_ACCEPTED` | `APPLICATION_RECORD` | 내 지원 내역 |
| `CHAT_MESSAGE_CREATED` | `CHAT_ROOM` | 채팅방 |

### 2단계: 푸시 권한 요청

로그인 후 한 번만 권한을 요청한다.

구현 원칙:

- 비로그인 상태에서는 push token을 등록하지 않는다.
- 권한 거부 시 앱 사용은 막지 않는다.
- 권한 승인 후 받은 Expo push token을 BE에 저장한다.
- 로그아웃 시 토큰 삭제 또는 비활성화 API를 호출한다.

### 3단계: Expo push token 등록

`expo-notifications`를 사용한다.

필요 패키지:

```bash
npx expo install expo-notifications expo-device
```

기본 흐름:

```text
앱 실행/로그인
→ 알림 권한 확인
→ 권한 없으면 요청
→ Expo push token 발급
→ POST /api/v1/push-tokens 로 서버 저장
→ 로그아웃 시 DELETE /api/v1/push-tokens 로 비활성화
```

### 4단계: 앱 상태별 처리

| 상태 | 처리 |
|------|------|
| foreground | 앱 내부 toast/banner 또는 React Query invalidate |
| background | OS 알림 표시, 클릭 시 화면 이동 |
| killed | 앱 실행 후 notification response 확인, target 화면 이동 |

알림 클릭 이동은 `targetType`, `targetId`를 기준으로 라우트 매핑을 만든다.

### 5단계: React Query 캐시 전략

- 알림 목록 query key: `['notifications']`
- 안 읽은 개수 query key: `['notifications', 'unreadCount']`
- 알림 읽음 처리 성공 시 두 query를 invalidate
- foreground 알림을 받으면 알림 목록과 unread count를 invalidate
- 채팅 WebSocket으로 새 메시지를 받아도 `notifications` query를 invalidate 해서 홈 알림 배지가 뒤늦게 갱신되지 않게 한다.

### 직접 해볼 것

- 알림 권한을 거부한 사용자가 앱을 정상 사용할 수 있는지 확인하기
- 로그인 전/후 push token 등록 시점을 구분해서 그려 보기
- `APPLICATION_ACCEPTED` 알림을 눌렀을 때 어느 화면으로 이동해야 하는지 라우트 작성하기
- 알림 읽음 처리 후 unread count가 즉시 줄어드는지 확인하기

## 16. 채팅 기능 학습과 구현 가이드

채팅은 **REST 저장/조회 + WebSocket 수신 + 알림 연동**으로 구성한다.

### 주요 파일

```
app/chats/
├── index.tsx                # 채팅방 목록
└── [roomId].tsx             # 채팅방 메시지 화면

src/services/chat/
└── chat.ts                  # 채팅 REST API, WebSocket URL 생성

src/hooks/chat/
├── useChat.ts               # 채팅 REST query/mutation
└── useChatWebSocket.ts      # 새 메시지 수신

src/stores/chat/
└── useActiveChatRoomStore.ts # 현재 열어둔 채팅방 id
```

### 진입 경로

- 스텝 공고 상세: 하단 고정 액션바에서 `채팅하기`와 `지원하기`를 함께 제공한다.
- 게스트하우스 상세: 하단 고정 `채팅하기` 버튼으로 채팅방을 생성/진입한다.
- 탭 바의 `채팅`에서 진행 중인 채팅방 목록을 확인한다.
- 알림/푸시의 `CHAT_MESSAGE_CREATED`를 누르면 해당 채팅방으로 이동한다.
- 루트 레이아웃의 전역 WebSocket은 `/ws/chats?token={accessToken}`로 연결해 채팅 목록과 채팅 탭 배지를 갱신한다.
- 채팅방 WebSocket은 `/ws/chats?token={accessToken}&roomId={roomId}`로 연결해 현재 방 메시지를 즉시 반영하고, BE가 채팅방 접속 상태를 판단할 수 있게 한다.

### UI 원칙

- 내 메시지는 오른쪽 파란 말풍선으로 표시한다.
- 상대 메시지는 왼쪽에 프로필/이름/흰 말풍선을 함께 표시한다.
- Android에서는 키보드가 입력창을 가리지 않도록 키보드 높이를 감지해 입력바를 직접 위로 올린다.
- 채팅방 헤더는 route param의 `title`이 없으면 채팅방 목록의 `opponentName`으로 보완한다.
- 현재 열어둔 방에서 온 메시지는 읽지 않은 수를 올리지 않는다.

## 17. 앱 이름과 아이콘 설정

앱 표시 이름과 아이콘은 `app.config.ts`에서 관리한다.

### 주요 파일

| 파일 | 역할 |
|------|------|
| `app.config.ts` | 앱 이름, 버전, 아이콘 경로, Android adaptive icon 설정 |
| `assets/icon.png` | 기본 앱 아이콘 |
| `assets/adaptive-icon.png` | Android adaptive icon foreground |

### 확인할 포인트

- 앱 표시 이름은 `name: "게하르방"`으로 관리한다.
- 기본 아이콘은 1024x1024 PNG를 사용한다.
- Android adaptive icon은 런처 마스크에 잘리지 않도록 foreground 이미지를 따로 둔다.
- Android adaptive icon의 여백 색은 이미지 파일이 아니라 `android.adaptiveIcon.backgroundColor`로 관리한다.
- 이름/아이콘 변경은 JS reload만으로 반영되지 않는다. `npx expo prebuild --platform android --no-install` 후 새 빌드를 설치해야 확인할 수 있다.

---

## 추천 학습 순서

1. Expo Router 화면 구조와 `_layout.tsx` 이해
2. Axios, Secure Store, AuthStore로 인증 흐름 이해
3. React Query의 조회/변경/캐시 무효화 이해
4. Zustand persist로 멀티스텝 폼 상태 이해
5. transformer로 UI 데이터가 API request로 바뀌는 과정 이해
6. 이미지 업로드와 서버 URL 처리 이해
7. 권한 UI 분기와 403 처리 이해
8. BE DTO와 FE 타입을 나란히 보며 수정 API 연동 설계
9. 알림 목록 UI를 만든 뒤 Expo push token 등록으로 확장
10. 채팅 WebSocket과 알림/배지 동기화 흐름 이해
11. 앱 이름/아이콘 변경 후 native prebuild와 재설치 흐름 확인
