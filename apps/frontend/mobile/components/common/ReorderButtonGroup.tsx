import { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

import { WorkoutDataItemContext } from '@cwt/context';

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

  const parentType = useContext(WorkoutDataItemContext)?.parentType;

  const appliedColor =
    parentType === 'superset'
      ? theme.colors.violet4
      : parentType === 'section'
        ? theme.colors.dark2
        : theme.colors.primary;

  return (
    <View style={styles.buttonGroup}>
      {!isFirst && (
        <IconButton
          onPress={() => handleUpPress()}
          icon={parentType === 'superset' ? 'chevron-up' : 'chevron-up-circle'}
          iconColor={appliedColor}
          size={24}
          style={{ margin: 0, height: 32, width: 32 }}
        />
      )}
      {!isLast && (
        <IconButton
          onPress={handleDownPress}
          icon={
            parentType === 'superset' ? 'chevron-down' : 'chevron-down-circle'
          }
          iconColor={appliedColor}
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
