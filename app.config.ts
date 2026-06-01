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
  version: "1.2.0",
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
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },

  android: {
    versionCode: 8,
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

  plugins,

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
