import { ReactNode } from 'react';
import { Card, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import { CustomTheme } from '../../theme';
import { Text } from '../../customText';

interface CardButtonProps {
  children: ReactNode;
}

export default function CardButton({ children }: CardButtonProps) {
  const theme = useTheme() as CustomTheme;
  const styles = getStyles(theme);

  return (
    <Card style={styles.card} onPress={() => console.log('clicked on card')}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.titleContainer}>
          <Text variant="headlineMedium" style={{ color: theme.colors.light }}>
            {children}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    card: {
      marginBlock: 12,
      marginInline: 36,
      backgroundColor: theme.colors.background,
      boxShadow:
        'rgba(222, 226, 230, 0.05) 0px 1px 3px 0px, rgba(222, 226, 230, 0.05) 0px 28px 23px -7px, rgba(222, 226, 230, 0.04) 0px 12px 12px -7px',
      padding: 16,
      borderColor: theme.colors.light,
      borderWidth: 1,
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
