import 'dotenv/config';

export default ({ config }) => {
  const { FBSDK_APP_ID, FBSDK_CLIENT_TOKEN, GOOGLE_SERVICES_JSON } = process.env;
  const appConfig = {
    ...config,
    android: {
        ...config.android,
        googleServicesFile: GOOGLE_SERVICES_JSON || 'google-services.json',
    },
    plugins: [
        ...config.plugins,
        [
            "react-native-fbsdk-next",
            {
              appID: FBSDK_APP_ID || "YOUR_APP_ID",
              clientToken: FBSDK_CLIENT_TOKEN || "YOUR_CLIENT_TOKEN",
              displayName: "MiNotes"
            }
          ],
    ],
  };

  return appConfig;
};
