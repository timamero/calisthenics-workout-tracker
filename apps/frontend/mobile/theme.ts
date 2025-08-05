import {
  MD3LightTheme as DefaultTheme,
  configureFonts,
} from 'react-native-paper';
import { Platform } from 'react-native';

export type CustomTheme = typeof DefaultTheme & {
  colors: typeof DefaultTheme.colors & {
    blue: string;
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
} as const;

const theme: CustomTheme = {
  ...DefaultTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...DefaultTheme.colors,
    primary: 'rbg(255, 99, 71)', // tomato
    secondary: 'rgb(219, 100, 50)',
    background: 'rgb(255, 255, 255)',
    blue: 'rgb(34, 139, 230)',
  },
};

export default theme;
