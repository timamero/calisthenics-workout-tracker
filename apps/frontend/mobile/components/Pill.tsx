import { Text, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import { CustomTheme } from '../theme';

interface PillProps {
  textColor: string;
  backgroundColor: string;
  borderColor?: string;
  size?: 'sm' | 'lg';
  borderRadius?: number;
  children: string;
}

export default function Pill({
  textColor,
  backgroundColor,
  borderColor,
  size = 'sm',
  borderRadius = 20,
  children,
}: PillProps) {
  const theme = useTheme() as CustomTheme;
  const basePillStyles = getPillBaseStyles(theme);
  const baseContainerStyles = getContainerBaseStyles(theme);

  const colorStyle = { color: textColor };
  const backgroundColorStyle = { backgroundColor: backgroundColor };
  const borderStyle = borderColor
    ? { borderColor: borderColor, borderWidth: 1 }
    : {};
  const combinedPillStyles = {
    ...colorStyle,
    ...basePillStyles,
  };
  const combinedContainerStyles = {
    ...borderStyle,
    ...backgroundColorStyle,
    ...baseContainerStyles,
    borderRadius: borderRadius,
  };

  const styles = StyleSheet.create({
    pill: combinedPillStyles,
    container: combinedContainerStyles,
  });

  return (
    <View style={styles.container}>
      <Text
        variant={size === 'sm' ? 'labelSmall' : 'labelLarge'}
        style={styles.pill}
      >
        {children}
      </Text>
    </View>
  );
}

const getPillBaseStyles = (theme: CustomTheme) => {
  return {
    textTransform: 'uppercase' as 'uppercase',
  };
};

const getContainerBaseStyles = (theme: CustomTheme) => {
  return {
    paddingHorizontal: 12,
    paddingVertical: 4,
  };
};
