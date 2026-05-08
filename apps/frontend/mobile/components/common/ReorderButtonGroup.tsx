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
          icon="chevron-up-circle-outline"
          iconColor={theme.colors.tertiary}
          size={24}
          style={{ margin: 0, height: 32, width: 32 }}
        />
      )}
      {!isLast && (
        <IconButton
          onPress={handleDownPress}
          icon="chevron-down-circle-outline"
          iconColor={theme.colors.tertiary}
          size={24}
          style={{ margin: 0, height: 32, width: 32 }}
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
      gap: 2,
    },
  });
