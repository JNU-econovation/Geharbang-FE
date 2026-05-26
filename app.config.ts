import { ExpoConfig } from "@expo/config";
import "dotenv/config";

const sentryOrg = process.env.SENTRY_ORG;
const sentryProject = process.env.SENTRY_PROJECT;
const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN;

const plugins: ExpoConfig["plugins"] = [
  "expo-router",
  "expo-web-browser",
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
  name: "Geharbang-FE",
  slug: "Geharbang-FE",
  version: "1.0.0",
  orientation: "portrait",
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
    versionCode: 5,
    adaptiveIcon: {
      backgroundColor: "#ffffff",
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
    naverMapClientSecret: process.env.NAVER_MAP_CLIENT_SECRET,
  },
};

export default config;
