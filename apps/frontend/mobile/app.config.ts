import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const profile = process.env.APP_VARIANT;
  if (profile === 'preview') {
    return {
      ...config,
      name: 'cwt_mobile-preview',
      slug: 'cwt-mobile',
      icon: './assets/icon-preview.png',
      android: {
        ...config.android,
        package: 'com.fcamero.cwtmobile_preview',
      },
    };
  }
  // Default to development
  return {
    ...config,
    name: 'cwt_mobile-dev',
    slug: 'cwt-mobile',
    icon: './assets/icon-development.png',
    android: {
      ...config.android,
      package: 'com.fcamero.cwtmobile_development',
    },
  };
};
