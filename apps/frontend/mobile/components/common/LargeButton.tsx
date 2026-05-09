import { ReactNode } from 'react';
import { Card, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import { CustomTheme } from '../../theme';
import { Text } from '../../customText';

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
        <View style={styles.titleContainer}>
          <Text
            variant="headlineMedium"
            style={{ color: theme.colors.onSecondary }}
          >
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
      marginInline: 8,
      backgroundColor: theme.colors.secondary,
      boxShadow: 'rgba(222, 226, 230, 0.25) 1px 3px 17px -1px',
      padding: 16,
      borderColor: theme.colors.onSecondary,
      borderWidth: 1,
      height: 80,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    cardContent: {
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });
