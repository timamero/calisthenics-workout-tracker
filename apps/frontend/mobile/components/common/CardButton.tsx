import { ReactNode } from 'react';
import { Card, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { CustomTheme } from '../../theme';

interface CardButtonProps {
  handlePress: () => void;
  children: ReactNode;
}

export default function CardButton({ handlePress, children }: CardButtonProps) {
  const theme = useTheme() as CustomTheme;
  const styles = getStyles(theme);

  return (
    <Card style={styles.card} onPress={() => handlePress()}>
      <Card.Content style={styles.cardContent}>{children}</Card.Content>
    </Card>
  );
}

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.elevation.level3,
      paddingBlock: 12,
      paddingInline: 16,
      borderColor: theme.colors.gray3,
      borderWidth: 1,
      width: '100%',
    },
    cardContent: {
      paddingHorizontal: 0,
      paddingVertical: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: 12,
    },
  });
