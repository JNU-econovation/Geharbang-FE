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
GOOGLE_MAPS_API_KEY=
```

- API 요청 기본 주소는 `src/config/url.ts`에서 관리한다.
- 이미지/파일 URL도 같은 모듈의 `buildAssetUrl()`을 통해 생성한다.
- `EXPO_PUBLIC_BASE_URL`이 없으면 `EXPO_PUBLIC_API_URL`, 그것도 없으면 `https://geharbang.org`를 fallback으로 사용한다.

## 검증 명령어

```bash
npx tsc --noEmit
npx expo-doctor
npx expo export --platform web
```

## 문서

- 전체 구조: [ARCHITECTURE.md](./ARCHITECTURE.md)
- 협업 규칙: [COLLABORATION_GUIDE.md](./COLLABORATION_GUIDE.md)
- 학습 가이드: [STUDY_GUIDE.md](./STUDY_GUIDE.md)
