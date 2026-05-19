import { StyleSheet } from 'react-native';

import { CustomTheme } from '../theme';

export const globalStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      gap: 16,
      paddingHorizontal: 32,
      paddingTop: 32,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      backgroundColor: theme.colors.background,
    },
  });
