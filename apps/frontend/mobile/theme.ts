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
    background: 'rgb(46, 46, 46)',
    // Semantic colors
    beginnerPillColor: 'rgb(34, 139, 230)',
    intermediatePillColor: 'rgb(250, 176, 5)',
    advancedPillColor: 'rgb(250, 82, 82)',
    musclePillColor: 'rgb(190, 75, 219)', // mantine: grape.6
    musclePillBgColor: 'rgb(248 240 252)', // mantine: grape.0
    grey: 'rgb(206 212 218)',
    darkGrey: 'rgb(52 58 64)', // mantine: gray.8
    dark: 'rgb(46, 46, 46)',
    light: '#fff',
  },
};

export default theme;
