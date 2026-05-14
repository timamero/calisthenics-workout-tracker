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
    return './assets/adaptive-icon-development.png';
  }

  if (IS_PREVIEW) {
    return './assets/adaptive-icon-preview.png';
  }

  return './assets/adaptive-icon.png';
};

export default ({ config }: any) => ({
  ...config,
  name: getAppName(),
  slug: config.slug ?? 'cwt-mobile',
  icon: getIcon(),
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
    adaptiveIcon: {
      foregroundImage: getIcon(),
      backgroundColor: '#F5F5F5',
    },
  },
});
