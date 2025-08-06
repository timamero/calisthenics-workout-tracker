import { Text, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import { CustomTheme } from '../theme';

interface PillProps {
  textColor: string;
  backgroundColor: string;
  borderColor?: string;
  children: string;
}

export default function Pill({
  textColor,
  backgroundColor,
  borderColor,
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
  };

  const styles = StyleSheet.create({
    pill: combinedPillStyles,
    container: combinedContainerStyles,
  });

  return (
    <View style={styles.container}>
      <Text variant="bodySmall" style={styles.pill}>
        {children}
      </Text>
    </View>
  );
}

const getPillBaseStyles = (theme: CustomTheme) => {
  return {
    fontSize: 11,
    fontWeight: '700' as '700',
    textTransform: 'uppercase' as 'uppercase',
  };
};

const getContainerBaseStyles = (theme: CustomTheme) => {
  return {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  };
};
