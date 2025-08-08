import {
  MD3LightTheme as DefaultTheme,
  configureFonts,
} from 'react-native-paper';
import { Platform } from 'react-native';

export type CustomTheme = typeof DefaultTheme & {
  colors: typeof DefaultTheme.colors & {
    blue: string;
    orange: string;
    red: string;
    purple: string;
    purpleLight: string;
    grey: string;
    dark: string;
    light: string;
  };
};

const fontConfig = {
  default: {
    fontFamily: Platform.select({
      web: 'Courier New, Courier, monospace',
      ios: 'Courier',
      android: 'monospace',
      default: 'monospace',
    }),
    fontWeight: '400',
    letterSpacing: 0,
    fontSize: 16,
    lineHeight: 24,
  },
  headlineLarge: {
    fontFamily: Platform.select({
      web: 'Courier New, Courier, monospace',
      ios: 'Courier',
      android: 'monospace',
      default: 'monospace',
    }),
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: Platform.select({
      web: 'Courier New, Courier, monospace',
      ios: 'Courier',
      android: 'monospace',
      default: 'monospace',
    }),
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 36,
  },
  bodyLarge: {
    fontFamily: Platform.select({
      web: 'Courier New, Courier, monospace',
      ios: 'Courier',
      android: 'monospace',
      default: 'monospace',
    }),
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: Platform.select({
      web: 'Optima, Candara, Noto Sans, source-sans-pro, sans-serif',
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.4,
    lineHeight: 16,
  },
} as const;

const theme: CustomTheme = {
  ...DefaultTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 99, 71)', // tomato,
    secondary: 'rgb(219, 100, 50)',
    background: 'rgb(255, 255, 255)',
    blue: 'rgb(34, 139, 230)',
    red: 'rgb(250, 82, 82)',
    purple: 'rgb(190, 75, 219)',
    purpleLight: 'rgba(190, 75, 219, 0.1)',
    orange: 'rgb(250, 176, 5)',
    grey: 'rgb(73, 80, 87)',
    dark: 'rgb(46, 46, 46)',
    light: '#fff',
  },
};

export default theme;
