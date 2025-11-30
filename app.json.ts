import { ExpoConfig } from "@expo/config";
import "dotenv/config";

const config: ExpoConfig = {
  name: "Geharbang-FE",
  slug: "Geharbang-FE",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "geharbang",
  platforms: ["ios", "android", "web"],
  userInterfaceStyle: "automatic",
  newArchEnabled: true,

  splash: {
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },

  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.econovation.geharbang",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },

  android: {
    adaptiveIcon: {
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: "com.econovation.geharbang",
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
  },

  web: {
    bundler: "metro",
    output: "static",
  },

  plugins: [
    "expo-router",
    [
      "expo-secure-store",
      {
        configureAndroidBackup: true,
        faceIDPermission:
          "Allow $(PRODUCT_NAME) to access your Face ID biometric data.",
      },
    ],
  ],

  experiments: {
    typedRoutes: true,
  },

  extra: {
    router: {},
    eas: {
      projectId: "a2ddf256-212f-4d72-80cf-530c3f1e238c",
    },
  },
};

export default config;
