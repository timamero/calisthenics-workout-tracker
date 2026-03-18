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

    errorLight: string;

    orange50: string;
    orange100: string;
    orange200: string;
    orange300: string;
    orange400: string;
    orange500: string;
    orange600: string;
    orange700: string;
    orange800: string;
    orange900: string;
    orange950: string;

    dark50: string;
    dark100: string;
    dark200: string;
    dark300: string;
    dark400: string;
    dark500: string;
    dark600: string;
    dark700: string;
    dark800: string;
    dark900: string;
    dark950: string;
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
    fontSize: 18,
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

    errorLight: '#FFA07A',

    orange50: '#fff0ef',
    orange100: '#ffe1df',
    orange200: '#ffbfba',
    orange300: '#ff9f96',
    orange400: '#ff7766',
    orange500: '#ff4500',
    orange600: '#cb3500',
    orange700: '#9c2600',
    orange800: '#6c1800',
    orange900: '#420b00',
    orange950: '#2d0500',

    dark50: '#f1f1f1',
    dark100: '#e2e2e2',
    dark200: '#c4c4c4',
    dark300: '#a8a8a8',
    dark400: '#8b8b8b',
    dark500: '#727272',
    dark600: '#595959',
    dark700: '#404040',
    dark800: '#2a2a2a',
    dark900: '#141414',
    dark950: '#0b0b0b',
  },
};

export default theme;
