import { ExpoConfig } from "@expo/config";
import "dotenv/config";

const config: ExpoConfig = {
  name: "게하르방",
  slug: "Geharbang-FE",
  owner: "superkid0714",
  version: "1.0.0",
  icon: "./assets/icon.png",
  orientation: "portrait",
  scheme: "geharbang",
  platforms: ["ios", "android", "web"],
  userInterfaceStyle: "automatic",
  newArchEnabled: true,

  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },

  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.econovation.geharbang",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,

      CFBundleURLTypes: [
        {
          CFBundleURLSchemes: ["geharbang"],
        },
      ],
    },
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },

  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },

    // edgeToEdgeEnabled: false,
    predictiveBackGestureEnabled: false,
    package: "com.econovation.geharbang",
    versionCode: 1,
    intentFilters: [
      {
        action: "VIEW",
        data: [
          {
            scheme: "geharbang",
            host: "oauth-callback",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
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
      projectId: "81bf359a-a232-4d2e-bf98-50c02b62485d",
    },
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  },
};

export default config;
