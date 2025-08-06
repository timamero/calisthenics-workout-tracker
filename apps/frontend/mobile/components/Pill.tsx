import { Text, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { CustomTheme } from '../theme';

interface PillProps {
  textColor: string;
  backgroundColor: string;
  children: string;
}

export default function Pill({
  textColor,
  backgroundColor,
  children,
}: PillProps) {
  const theme = useTheme() as CustomTheme;
  const baseStyles = getBaseStyles(theme);

  const colorStyle = { color: textColor };
  const backgroundColorStyle = { backgroundColor: backgroundColor };
  const combinedStyles = {
    ...colorStyle,
    ...backgroundColorStyle,
    ...baseStyles,
  };

  const pillStyles = StyleSheet.create({
    pill: combinedStyles,
  });

  return (
    <Text variant="bodySmall" style={pillStyles.pill}>
      {children}
    </Text>
  );
}

const getBaseStyles = (theme: CustomTheme) => {
  return {
    paddingHorizontal: 12,
    paddingVertical: 4,
    // backgroundColor: theme.colors.blue,
    borderRadius: 12,
    textTransform: 'uppercase' as 'uppercase',
  };
};
