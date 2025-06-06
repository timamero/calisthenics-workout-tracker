// @ts-check

/**
 * Expo config with profile-based overrides for name and icon.
 * Uses process.env.EAS_BUILD_PROFILE to determine the profile.
 */

const commonConfig = {
  version: '0.1.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.fcamero.mobile',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  owner: 'fcamero',
  extra: {
    eas: {
      projectId: '7d3f3567-d6ae-4932-a521-23c22bbbe813',
    },
  },
};

module.exports = () => {
  const profile = process.env.EAS_BUILD_PROFILE;
  if (profile === 'preview') {
    return {
      ...commonConfig,
      name: 'cwt_mobile-preview',
      slug: 'cwt_mobile-preview',
      icon: './assets/icon-preview.png',
      android: {
        ...commonConfig.android,
        package: 'com.cwt.mobile-preview',
      },
    };
  }
  // Default to development
  return {
    ...commonConfig,
    name: 'cwt_mobile-dev',
    slug: 'cwt_mobile-dev',
    icon: './assets/icon-development.png',
    android: {
      ...commonConfig.android,
      package: 'com.cwt.mobile-development',
    },
  };
};
