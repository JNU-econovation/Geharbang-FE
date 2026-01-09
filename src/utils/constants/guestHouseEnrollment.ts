/**
 * 게스트하우스 등록 관련 상수
 */

// ========================================
// 선택 옵션
// ========================================

/**
 * 편의시설 옵션
 */
export const FACILITY_OPTIONS = [
  '세탁시설',
  '개별 화장실',
  '조식제공',
  'CCTV',
  '주차장',
] as const;

/**
 * 분위기 옵션
 */
export const ATMOSPHERE_OPTIONS = [
  '감성',
  '조용한',
  '휴식',
  '활발한',
  '사교적',
  '힐링',
  '사색',
  '잔잔한',
] as const;

/**
 * 파티 타입 옵션
 */
export const PARTY_TYPES = [
  '술파티',
  '포틀럭',
  '디너 파티',
  '클럽 파티',
  '기타',
] as const;

/**
 * 요일 옵션 (단순 배열)
 * @note options.ts의 DAYS_OF_WEEK는 {value, label} 형식
 */
export const DAYS_OF_WEEK_SIMPLE = [
  '월',
  '화',
  '수',
  '목',
  '금',
  '토',
  '일',
] as const;

/**
 * 객실 타입 옵션 (색상 포함)
 */
export const ROOM_TYPES = [
  {
    label: '여성 전용 도미토리',
    value: '여성 전용 도미토리',
    color: '#fa2b36',
  },
  {
    label: '남성 전용 도미토리',
    value: '남성 전용 도미토리',
    color: '#3b82f6',
  },
] as const;

/**
 * 객실 인원 옵션
 */
export const OCCUPANCY_OPTIONS = ['1인실', '2인실', '3인이상'] as const;

// ========================================
// 업로드 제한
// ========================================

/**
 * 이미지 업로드 제한
 */
export const IMAGE_UPLOAD_LIMITS = {
  MAX_COUNT: 10,
  DESCRIPTION: '최대 10장까지 등록할 수 있습니다',
} as const;

/**
 * 항목 최대 개수
 */
export const MAX_ITEMS = {
  ROOMS: 10,
  PARTIES: 10,
  FACILITIES: 10,
} as const;

// ========================================
// 입력 제약 조건
// ========================================

/**
 * 입력 필드 최대 길이
 */
export const INPUT_MAX_LENGTHS = {
  INSTAGRAM: 30,
  PHONE: 13,
  EMAIL: 30,
  WEBSITE: 100,
  OWNER_MESSAGE: 50,
} as const;

/**
 * 입력 필드 높이
 */
export const INPUT_HEIGHTS = {
  INTRODUCTION: 400,
  PARTY_DESCRIPTION: 120,
  OWNER_MESSAGE: 120,
} as const;

// ========================================
// 검증 제한
// ========================================

/**
 * 폼 검증 제한값
 */
export const VALIDATION_LIMITS = {
  MAIN_IMAGES: { MIN: 1, MAX: 10 },
  INTRODUCTION: { MIN: 10, MAX: 500 },
  FACILITIES: { MAX: 10, ITEM_MAX_LENGTH: 20 },
  ATMOSPHERE: { MAX: 2 },
  GUEST_HOUSE_NAME: { MIN: 2, MAX: 30 },
  ROOM_NAME: { MIN: 1, MAX: 20 },
  ROOM_IMAGES: { MIN: 1, MAX: 10 },
  PARTY_IMAGES: { MIN: 1, MAX: 10 },
} as const;

// ========================================
// Placeholder 텍스트
// ========================================

/**
 * 입력 필드 플레이스홀더
 */
export const PLACEHOLDERS = {
  // Step 1
  GUEST_HOUSE_NAME: '게스트하우스 이름을 입력해주세요',

  // Step 2
  INTRODUCTION: '우리 게스트하우스를 소개해주세요',
  FACILITY_CUSTOM: '예: 공용주방, 세탁시설',

  // Step 2 - Party
  PARTY_CUSTOM_TYPE: '예: 테마 파티, 퀴즈 파티',
  PARTY_LOCATION: '예: 1층 바 라운지',
  PARTY_MOOD: '예: 음악 / 술 / 소셜게임',
  PARTY_FEE: '0 (무료인 경우 0 입력)',
  PARTY_DESCRIPTION: '파티에 대해 자유롭게 소개해주세요',

  // Step 3 - Room
  ROOM_NAME: '예: 더블룸',
  ROOM_PRICE: '예 : 30000',

  // Step 4
  INSTAGRAM: '예: @jeju_guesthouse',
  PHONE: '예: 064-123-4567',
  EMAIL: '예: owner@naver.com',
  WEBSITE: '예: https://www.jejuguesthouse.com',
  OWNER_MESSAGE: '스텝들에게 전하고 싶은 메시지를 입력해주세요',
} as const;

// ========================================
// 버튼 레이블
// ========================================

/**
 * 버튼 텍스트
 */
export const BUTTON_LABELS = {
  ADD_PARTY: '파티 추가',
  ADD_ROOM: '객실 타입 추가',
  ADD_FACILITY: '편의시설 추가',
  MAKE_PARTY: '파티 만들기',
  EDIT_PARTY: '파티 수정하기',
  ADD_ROOM_SUBMIT: '객실 추가',
  EDIT_ROOM: '객실 수정',
  NEXT: '다음',
  SUBMIT: '게스트하우스 등록하기',
  RESET: '초기화',
  APPLY: '적용',
} as const;

// ========================================
// 안내 메시지
// ========================================

/**
 * 안내 박스 텍스트
 */
export const NOTICE_TEXTS = {
  ROOM_TYPE_TITLE: '객실 타입 등록 안내',
  ROOM_TYPE_MESSAGES: [
    '도미토리, 개인실, 더블룸 등 각 타입별로 등록해주세요',
    '같은 타입이라도 가격이 다르면 별도로 등록해주세요',
  ],
} as const;

/**
 * 폼 설명 텍스트
 */
export const FORM_DESCRIPTIONS = {
  MAX_10_ITEMS: '최대 10개까지 등록할 수 있습니다',
  MAX_10_IMAGES: '최대 10장까지 등록할 수 있습니다',
  MAX_2_ATMOSPHERE: '최대 2개까지 선택할 수 있습니다',
  MULTIPLE_SELECT: '중복 선택 가능',
  CUSTOM_FACILITY_INFO: '목록에 없는 시설은 직접 입력해 추가할 수 있습니다',
  GUESTHOUSE_INTRO: '우리 게스트하우스만의 특별한 이야기를 들려주세요',
} as const;

// ========================================
// 색상
// ========================================

/**
 * 객실 타입별 색상
 */
export const ROOM_TYPE_COLORS = {
  FEMALE: '#fa2b36',
  MALE: '#3b82f6',
  PLACEHOLDER: '#99a1af',
} as const;

// ========================================
// 타입 추론
// ========================================

export type FacilityOption = (typeof FACILITY_OPTIONS)[number];
export type AtmosphereOption = (typeof ATMOSPHERE_OPTIONS)[number];
export type PartyType = (typeof PARTY_TYPES)[number];
export type DayOfWeek = (typeof DAYS_OF_WEEK_SIMPLE)[number];
export type OccupancyOption = (typeof OCCUPANCY_OPTIONS)[number];
