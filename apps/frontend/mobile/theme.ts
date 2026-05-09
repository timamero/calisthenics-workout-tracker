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
    // grey: string;
    // darkGrey: string;
    // orange1: string;
    // light: string;

    // errorLight: string;

    // orange50: string;
    // orange100: string;
    // orange200: string;
    // orange300: string;
    // orange400: string;
    // orange500: string;
    // orange600: string;
    // orange700: string;
    // orange800: string;
    // orange900: string;
    // orange950: string;

    // dark50: string;
    // dark100: string;
    // dark200: string;
    // dark300: string;
    // dark400: string;
    // dark500: string;
    // dark600: string;
    // dark700: string;
    // dark800: string;
    // dark900: string;
    // dark950: string;

    // Color shades (mantine colors to match web)
    white: string;

    dark0: string;
    dark1: string;
    dark2: string;
    dark3: string;
    dark4: string;
    dark5: string;
    dark6: string;
    dark7: string;
    dark8: string;
    dark9: string;

    gray0: string;
    gray1: string;
    gray2: string;
    gray3: string;
    gray4: string;
    gray5: string;
    gray6: string;
    gray7: string;
    gray8: string;
    gray9: string;

    lime0: string;
    lime1: string;
    lime2: string;
    lime3: string;
    lime4: string;
    lime5: string;
    lime6: string;
    lime7: string;
    lime8: string;
    lime9: string;

    teal0: string;
    teal1: string;
    teal2: string;
    teal3: string;
    teal4: string;
    teal5: string;
    teal6: string;
    teal7: string;
    teal8: string;
    teal9: string;

    violet0: string;
    violet1: string;
    violet2: string;
    violet3: string;
    violet4: string;
    violet5: string;
    violet6: string;
    violet7: string;
    violet8: string;
    violet9: string;

    red0: string;
    red1: string;
    red2: string;
    red3: string;
    red4: string;
    red5: string;
    red6: string;
    red7: string;
    red8: string;
    red9: string;
  };
};

const fontConfig = {
  default: {
    fontFamily: Platform.select({
      web: 'Manrope-Regular, source-sans-pro, sans-serif',
      ios: 'Manrope-Regular',
      android: 'Manrope-Regular',
      default: 'sans-serif',
    }),
    letterSpacing: 0,
    fontSize: 16,
    lineHeight: 24,
  },
  headlineLarge: {
    fontFamily: Platform.select({
      web: 'ElmsSans-Bold, source-sans-pro, sans-serif',
      ios: 'ElmsSans-Bold',
      android: 'ElmsSans-Bold',
      default: 'sans-serif',
    }),
    fontSize: 26,
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: Platform.select({
      web: 'ElmsSans-Bold, source-sans-pro, sans-serif',
      ios: 'ElmsSans-Bold',
      android: 'ElmsSans-Bold',
      default: 'sans-serif',
    }),
    fontSize: 20,
    letterSpacing: 0,
    lineHeight: 28,
  },
  bodyLarge: {
    fontFamily: Platform.select({
      web: 'Manrope-Regular, source-sans-pro, sans-serif',
      ios: 'Manrope-Regular',
      android: 'Manrope-Regular',
      default: 'sans-serif',
    }),
    fontSize: 18,
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: Platform.select({
      web: 'Manrope-Regular, source-sans-pro, sans-serif',
      ios: 'Manrope-Regular',
      android: 'Manrope-Regular',
      default: 'sans-serif',
    }),
    fontSize: 12,
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: Platform.select({
      web: 'SourceCodePro-Bold, ui-monospace, monospace',
      ios: 'MSourceCodePro-Bold',
      android: 'SourceCodePro-Bold',
      default: 'monospace',
    }),
    fontSize: 11,
    letterSpacing: 0.4,
    lineHeight: 16,
  },
} as const;

const theme: CustomTheme = {
  ...DefaultTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...DefaultTheme.colors,
    primary: '#242424', // dark.7
    onPrimary: '#F5F5F5', // white
    primaryContainer: '#e9fac8', // lime.1
    onPrimaryContainer: '#242424', // dark.7

    secondary: '#d8f5a2', // lime.2
    onSecondary: '#242424', // dark.7
    secondaryContainer: '#e9ecef', // gray.2
    onSecondaryContainer: '#424242', // dark.4

    tertiary: '#5f3dc4', // violet.9
    onTertiary: '#f8f9fa', // gray.0
    tertiaryContainer: '#b197fc', // violet.3
    onTertiaryContainer: '#141414', // dark.9
    error: '#C92A2A', // red.9
    onError: '#f8f9fa', // gray.0
    errorContainer: '#fff5f5', // red.1
    onErrorContainer: '#C92A2A', // red.9
    background: '#F5F5F5', // white
    onBackground: '#242424', // dark.7
    surface: '#F5F5F5', // white
    onSurface: '#242424', // dark.7
    surfaceVariant: '#E9ECEF', // gray.2
    onSurfaceVariant: '#424242', // dark.4
    outline: '#424242', // dark.4
    outlineVariant: '#E9ECEF', // gray.2
    shadow: '#141414', // dark.9
    scrim: '#141414', // dark.9
    inverseSurface: '#424242', // dark.4
    inverseOnSurface: '#E9ECEF', // gray.2
    inversePrimary: '#f4fce3', // lime.0
    elevation: {
      // tints of white
      level0: 'transparent',
      level1: '#FBFBFB',
      level2: '#F6F6F6',
      level3: '#F2F2F2',
      level4: '#EEEEEE',
      level5: '#E9E9E9',
    },
    surfaceDisabled: '#E9ECEF', // gray.2
    onSurfaceDisabled: '#828282', // dark.2
    backdrop: '#E9ECEF', // gray.2

    // Semantic colors
    beginnerPillColor: 'rgb(34, 139, 230)',
    intermediatePillColor: 'rgb(250, 176, 5)',
    advancedPillColor: 'rgb(250, 82, 82)',
    musclePillColor: 'rgb(190, 75, 219)', // mantine: grape.6
    musclePillBgColor: 'rgb(248 240 252)', // mantine: grape.0
    // grey: 'rgb(206 212 218)',
    // darkGrey: 'rgb(33 37 41)', // mantine: gray.9
    // orange1: 'rgb(255 232 204)', // mantine: orange.1
    // light: 'rgb(255 244 230)', // mantine: orange.0

    // errorLight: '#FFA07A',

    // orange50: '#fff0ef',
    // orange100: '#ffe1df',
    // orange200: '#ffbfba',
    // orange300: '#ff9f96',
    // orange400: '#ff7766',
    // orange500: '#ff4500',
    // orange600: '#cb3500',
    // orange700: '#9c2600',
    // orange800: '#6c1800',
    // orange900: '#420b00',
    // orange950: '#2d0500',

    // dark50: '#f1f1f1',
    // dark100: '#e2e2e2',
    // dark200: '#c4c4c4',
    // dark300: '#a8a8a8',
    // dark400: '#8b8b8b',
    // dark500: '#727272',
    // dark600: '#595959',
    // dark700: '#404040',
    // dark800: '#2a2a2a',
    // dark900: '#141414',
    // dark950: '#0b0b0b',

    // Color shades (mantine colors to match web)
    // white: '#FAF9F6',
    white: '#F5F5F5',

    dark0: '#C9C9C9',
    dark1: '#b8b8b8',
    dark2: '#828282',
    dark3: '#696969',
    dark4: '#424242',
    dark5: '#3b3b3b',
    dark6: '#2E2E2E',
    dark7: '#242424',
    dark8: '#1f1f1f',
    dark9: '#141414',

    gray0: '#f8f9fa',
    gray1: '#f1f3f5',
    gray2: '#e9ecef',
    gray3: '#dee2e6',
    gray4: '#ced4da',
    gray5: '#adb5bd',
    gray6: '#868e96',
    gray7: '#495057',
    gray8: '#343a40',
    gray9: '#212529',

    lime0: '#f4fce3',
    lime1: '#e9fac8',
    lime2: '#d8f5a2',
    lime3: '#c0eb75',
    lime4: '#a9e34b',
    lime5: '#94d82d',
    lime6: '#82c91e',
    lime7: '#74b816',
    lime8: '#66a80f',
    lime9: '#5c940d',

    teal0: '#e6fcf5',
    teal1: '#c3fae8',
    teal2: '#96f2d7',
    teal3: '#63e6be',
    teal4: '#38d9a9',
    teal5: '#20c997',
    teal6: '#12b886',
    teal7: '#0ca678',
    teal8: '#099268',
    teal9: '#087f5b',

    violet0: '#f3f0ff',
    violet1: '#e5dbff',
    violet2: '#d0bfff',
    violet3: '#b197fc',
    violet4: '#9775fa',
    violet5: '#845ef7',
    violet6: '#7950f2',
    violet7: '#7048e8',
    violet8: '#6741d9',
    violet9: '#5f3dc4',

    red0: '#fff5f5',
    red1: '#ffe3e3',
    red2: '#ffc9c9',
    red3: '#ffa8a8',
    red4: '#ff8787',
    red5: '#ff6b6b',
    red6: '#fa5252',
    red7: '#f03e3e',
    red8: '#e03131',
    red9: '#c92a2a',
  },
};

export default theme;
