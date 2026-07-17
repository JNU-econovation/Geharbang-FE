import { ExpoConfig } from "@expo/config";
import "dotenv/config";

const sentryOrg = process.env.SENTRY_ORG;
const sentryProject = process.env.SENTRY_PROJECT;
const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN;

const plugins: ExpoConfig["plugins"] = [
  "expo-router",
  "expo-web-browser",
  "expo-notifications",
  [
    "expo-secure-store",
    {
      configureAndroidBackup: true,
      faceIDPermission:
        "Allow $(PRODUCT_NAME) to access your Face ID biometric data.",
    },
  ],
  [
    "@mj-studio/react-native-naver-map",
    {
      client_id: process.env.NAVER_MAP_CLIENT_ID,
    },
  ],
];

if (sentryOrg && sentryProject && sentryAuthToken) {
  plugins.splice(1, 0, [
    "@sentry/react-native/expo",
    {
      organization: sentryOrg,
      project: sentryProject,
    },
  ]);
}

const config: ExpoConfig = {
  name: "게하르방",
  slug: "Geharbang-FE",
  version: "1.2.2",
  orientation: "portrait",
  icon: "./assets/icon.png",
  scheme: "geharbang",
  platforms: ["ios", "android", "web"],
  userInterfaceStyle: "automatic",
  newArchEnabled: true,

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
  },

  android: {
    versionCode: 10,
    softwareKeyboardLayoutMode: "resize",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#33A8F8",
    },

    // edgeToEdgeEnabled: false,
    predictiveBackGestureEnabled: false,
    package: "com.econovation.geharbang",
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
  },

  web: {
    bundler: "metro",
    output: "static",
  },

  plugins,

  experiments: {
    typedRoutes: true,
  },

  extra: {
    router: {},
    eas: {
      projectId: "81bf359a-a232-4d2e-bf98-50c02b62485d",
    },
    naverMapClientId: process.env.NAVER_MAP_CLIENT_ID,
  },
};

export default config;
