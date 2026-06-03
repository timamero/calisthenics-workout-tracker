const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'app.torquefitdevelopment';
  }

  if (IS_PREVIEW) {
    return 'app.torquefitpreview';
  }

  return 'app.torquefit';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'Torque Calisthenics Tracker - Dev';
  }

  if (IS_PREVIEW) {
    return 'Torque Calisthenics Tracker - Preview';
  }

  return 'Torque Calisthenics Tracker';
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

const getBackgroundColor = () => {
  if (IS_DEV) {
    return '#f1f3f5';
  }

  if (IS_PREVIEW) {
    return '#868e96';
  }

  return '#f4fce3';
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
      backgroundColor: getBackgroundColor(),
    },
  },
});
