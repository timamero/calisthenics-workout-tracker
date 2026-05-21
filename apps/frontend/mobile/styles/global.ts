import { StyleSheet } from 'react-native';

import { CustomTheme } from '../theme';

export const globalStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      paddingInline: 24,
      paddingBlock: 24,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      backgroundColor: theme.colors.background,
    },
  });
