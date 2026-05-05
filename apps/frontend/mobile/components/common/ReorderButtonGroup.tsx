import { View, StyleSheet } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

import { CustomTheme } from '../../theme';

interface ReorderButtonProps {
  isFirst: boolean;
  isLast: boolean;
  handleUpPress: () => void;
  handleDownPress: () => void;
}

export default function ReorderButtonGroup({
  isFirst = false,
  isLast = false,
  handleUpPress,
  handleDownPress,
}: ReorderButtonProps) {
  const theme = useTheme() as CustomTheme;
  const styles = getStyles(theme);

  return (
    <View style={styles.buttonGroup}>
      {!isFirst && (
        <IconButton
          onPress={() => handleUpPress()}
          icon="arrow-up"
          iconColor={theme.colors.onBackground}
          size={16}
          style={{ margin: 0 }}
        />
      )}
      {!isLast && (
        <IconButton
          onPress={handleDownPress}
          icon="arrow-down"
          iconColor={theme.colors.onBackground}
          size={16}
          style={{ margin: 0 }}
        />
      )}
    </View>
  );
}

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },
  });
