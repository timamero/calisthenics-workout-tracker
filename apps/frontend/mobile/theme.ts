import {
  MD3LightTheme as DefaultTheme,
  configureFonts,
} from 'react-native-paper';
import { Platform } from 'react-native';

export type CustomTheme = typeof DefaultTheme & {
  colors: typeof DefaultTheme.colors & {
    beginnerPillColor: string;
    intermediatePillColor: string;
    advancedPillColor: string;
    musclePillColor: string;
    musclePillBgColor: string;
    grey: string;
    darkGrey: string;
    dark8: string;
    dark9: string;
    orange1: string;
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
    letterSpaorangecing: 0,
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
    primary: 'rgb(247 103 7)',
    secondary: 'rgb(219, 100, 50)',
    background: 'rgb(20 20 20)',
    // Semantic colors
    beginnerPillColor: 'rgb(34, 139, 230)',
    intermediatePillColor: 'rgb(250, 176, 5)',
    advancedPillColor: 'rgb(250, 82, 82)',
    musclePillColor: 'rgb(190, 75, 219)', // mantine: grape.6
    musclePillBgColor: 'rgb(248 240 252)', // mantine: grape.0
    grey: 'rgb(206 212 218)',
    darkGrey: 'rgb(33 37 41)', // mantine: gray.9
    dark8: 'rgb(31 31 31)', // mantin: dark.8
    dark9: 'rgb(20 20 20)', // mantine: dark.9
    orange1: 'rgb(255 232 204)', // mantine: orange.1
    light: 'rgb(255 244 230)', // mantine: orange.0
  },
};

export default theme;
