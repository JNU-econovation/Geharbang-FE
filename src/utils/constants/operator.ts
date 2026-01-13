import { TabType } from '@/src/types/operator';

export const MANAGEMENT_TABS: { key: TabType; label: string }[] = [
  { key: 'pending', label: '검토 대기' },
  { key: 'approved', label: '승인 완료' },
  { key: 'rejected', label: '거부됨' },
];

export const STATUS_STYLES = {
  pending: {
    container: 'bg-amber-50 border-[#fde585]',
    text: 'text-[#ba4c00]',
    label: '검토 대기',
  },
  approved: {
    container: 'bg-green-50 border-green-500',
    text: 'text-green-600',
    label: '승인 완료',
  },
  rejected: {
    container: 'bg-red-50 border-red-500',
    text: 'text-red-600',
    label: '거부됨',
  },
} as const;
