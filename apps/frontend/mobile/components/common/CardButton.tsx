import { ReactNode } from 'react';
import { Card, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { CustomTheme } from '../../theme';

interface CardButtonProps {
  children: ReactNode;
}

export default function CardButton({ children }: CardButtonProps) {
  const theme = useTheme() as CustomTheme;
  const styles = getStyles(theme);

  return (
    <Card style={styles.card} onPress={() => console.log('clicked on card')}>
      <Card.Content style={styles.cardContent}>{children}</Card.Content>
    </Card>
  );
}

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    card: {
      marginBlock: 12,
      marginInline: 8,
      backgroundColor: theme.colors.background,
      boxShadow: 'rgba(222, 226, 230, 0.25) 1px 3px 17px -1px',
      padding: 16,
      borderColor: theme.colors.light,
      borderWidth: 1,
      minWidth: 160,
      minHeight: 160,
      height: 'auto',
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
