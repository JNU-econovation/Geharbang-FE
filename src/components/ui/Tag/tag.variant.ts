export const TAG_VARIANTS = {
  primary: 'bg-blue-500/5 border-blue-500/10 text-blue-500',
  secondary: 'bg-gray-500/5 border-gray-500/10 text-gray-500',
  success: 'bg-green-500/5 border-green-500/10 text-green-500',
  warning: 'bg-yellow-500/5 border-yellow-500/10 text-yellow-500',
  info: 'bg-sky-500/5 border-sky-500/10 text-sky-500',
} as const;

export const TAG_SIZES = {
  sm: 'px-[7px] pt-1 pb-[3px] text-[10px]',
  md: 'px-2 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
} as const;

export type TagVariant = keyof typeof TAG_VARIANTS;
export type TagSize = keyof typeof TAG_SIZES;
