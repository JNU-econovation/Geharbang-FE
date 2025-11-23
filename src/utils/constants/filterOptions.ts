export const LOCATION_OPTIONS = [
  '제주시',
  '서귀포시',
  '서부권',
  '동부권',
  '중문/대정',
  '도서지역',
] as const;

export const PERIOD_OPTIONS = [
  { label: '단기', desc: '4주 이하' },
  { label: '중기', desc: '1개월 ~ 3개월' },
  { label: '장기', desc: '3개월 이상' },
] as const;

export const WORKDAYS_OPTIONS = [
  '주 1일 (6일 휴무)',
  '주 2일 (5일 휴무)',
  '주 3일 (4일 휴무)',
  '주 4일 (3일 휴무)',
  '주 5일 (2일 휴무)',
] as const;

export const GENDER_OPTIONS = ['무관', '남', '여'] as const;
