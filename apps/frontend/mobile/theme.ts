import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export type CustomTheme = typeof DefaultTheme & {
  colors: typeof DefaultTheme.colors & {
    blue: string;
  };
};

const theme: CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rbg(255, 99, 71)', // tomato
    secondary: 'rgb(219, 100, 50)',
    background: 'rgb(255, 255, 255)',
    blue: 'rgb(34, 139, 230)',
  },
};

export default theme;
