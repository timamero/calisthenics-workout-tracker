import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const profile = process.env.EAS_BUILD_PROFILE;
  if (profile === 'preview') {
    return {
      ...config,
      name: 'cwt_mobile-preview',
      slug: 'cwt_mobile-preview',
      icon: './assets/icon-preview.png',
      android: {
        ...config.android,
        package: 'com.cwt.mobile-preview',
      },
    };
  }
  // Default to development
  return {
    ...config,
    name: 'cwt_mobile-dev',
    slug: 'cwt_mobile-dev',
    icon: './assets/icon-development.png',
    android: {
      ...config.android,
      package: 'com.cwt.mobile-development',
    },
  };
};
