const DEFAULT_BASE_URL = "https://geharbang.org";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  process.env.EXPO_PUBLIC_BASE_URL ||
  DEFAULT_BASE_URL;

export const ASSET_BASE_URL =
  process.env.EXPO_PUBLIC_BASE_URL ||
  process.env.EXPO_PUBLIC_API_URL ||
  DEFAULT_BASE_URL;

export const buildAssetUrl = (path?: string | null) => {
  if (!path) {
    return "";
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${ASSET_BASE_URL}${path}`;
};
