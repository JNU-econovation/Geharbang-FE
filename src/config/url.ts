const DEFAULT_BASE_URL = "https://geharbang.org";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  process.env.EXPO_PUBLIC_BASE_URL ||
  DEFAULT_BASE_URL;

export const ASSET_BASE_URL =
  process.env.EXPO_PUBLIC_ASSET_URL ||
  process.env.EXPO_PUBLIC_BASE_URL ||
  process.env.EXPO_PUBLIC_API_URL ||
  DEFAULT_BASE_URL;

export const buildAssetUrl = (path?: string | null) => {
  const normalizedPath = path?.trim();
  if (
    !normalizedPath ||
    normalizedPath === "null" ||
    normalizedPath === "undefined"
  ) {
    return null;
  }

  if (/^https?:\/\//.test(normalizedPath)) {
    return normalizedPath;
  }

  return `${ASSET_BASE_URL}${normalizedPath}`;
};
