import { ReactNode } from 'react';
import { Card, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import { CustomTheme } from '../../theme';

interface LargeButtonProps {
  handlePress: () => void;
  children: ReactNode;
}

export default function LargeButton({
  handlePress,
  children,
}: LargeButtonProps) {
  const theme = useTheme() as CustomTheme;
  const styles = getStyles(theme);

  return (
    <Card style={styles.card} onPress={() => handlePress()}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.contentContainer}>{children}</View>
      </Card.Content>
    </Card>
  );
}

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.primaryContainer,
      boxShadow: 'rgba(222, 226, 230, 0.25) 1px 3px 17px -1px',
      paddingInline: 16,
      paddingBlock: 32,
      borderColor: theme.colors.onPrimaryContainer,
      borderWidth: 1,
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    cardContent: {
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
