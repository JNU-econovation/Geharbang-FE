declare const require: (moduleName: string) => any;

let cachedNotifications: any | null | undefined;

export const getExpoNotifications = () => {
  if (cachedNotifications !== undefined) {
    return cachedNotifications;
  }

  try {
    cachedNotifications = require("expo-notifications");
  } catch {
    cachedNotifications = null;
  }

  return cachedNotifications;
};
