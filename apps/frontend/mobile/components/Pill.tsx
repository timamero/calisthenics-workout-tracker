import { Text, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { CustomTheme } from '../theme';

interface PillProps {
  children: string;
}

export default function Pill({ children }: PillProps) {
  const theme = useTheme() as CustomTheme;
  const styles = getStyles(theme);

  return (
    <Text variant="bodySmall" style={styles.pill}>
      {children}
    </Text>
  );
}

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    pill: {
      paddingInline: 12,
      paddingBlock: 4,
      backgroundColor: theme.colors.blue,
      borderRadius: 12,
      color: 'white',
      textTransform: 'uppercase',
    },
  });
