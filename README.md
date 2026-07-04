# Geharbang-FE

Brains팀의 제주도 게스트하우스 플랫폼 프론트엔드 레포지토리다.

Expo Router 기반 React Native 앱이며, 게스트하우스 탐색, 스텝 공고 탐색/지원, 운영자 인증, 사장님 관리 기능을 제공한다.

## 빠른 시작

```bash
npm install
npx expo start
```

안드로이드 실행:

```bash
npx expo run:android
```

구글 플레이스토어 업로드용 AAB 빌드:

```bash
npx eas build -p android --profile production
```

## 환경변수

`.env`에 아래 값을 준비한다.

```env
EXPO_PUBLIC_BASE_URL=
EXPO_PUBLIC_API_URL=
EXPO_PUBLIC_ASSET_URL=
GOOGLE_MAPS_API_KEY=
```

- API 요청 기본 주소는 `src/config/url.ts`에서 관리한다.
- 이미지/파일 URL도 같은 모듈의 `buildAssetUrl()`을 통해 생성한다.
- `EXPO_PUBLIC_ASSET_URL`은 선택 사항이며, 에셋 서버를 API 서버와 분리할 때 사용한다.
- API는 `EXPO_PUBLIC_API_URL -> EXPO_PUBLIC_BASE_URL -> https://geharbang.org` 순서로 fallback 한다.
- 에셋은 `EXPO_PUBLIC_ASSET_URL -> EXPO_PUBLIC_BASE_URL -> EXPO_PUBLIC_API_URL -> https://geharbang.org` 순서로 fallback 한다.

## 검증 명령어

```bash
npx tsc --noEmit
npx expo prebuild --platform android --no-install
npx expo-doctor
npx expo export --platform web
```
