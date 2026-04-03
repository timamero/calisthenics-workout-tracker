import { ExpoConfig, ConfigContext } from 'expo/config';

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.fcamero.cwtmobile_development';
  }

  if (IS_PREVIEW) {
    return 'com.fcamero.cwtmobile_preview';
  }

  return 'com.fcamero.cwtmobile';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'CWT (Dev)';
  }

  if (IS_PREVIEW) {
    return 'CWT (Preview)';
  }

  return 'CWT';
};

const getIcon = () => {
  if (IS_DEV) {
    return './assets/icon-development.png';
  }

  if (IS_PREVIEW) {
    return './assets/icon-preview.png';
  }

  return './assets/icon.png';
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: config.slug ?? 'cwt-mobile',
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
    icon: getIcon(),
  },
});
