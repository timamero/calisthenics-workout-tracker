import { Text, useTheme } from 'react-native-paper';
// import { View } from 'react-native';

import { CustomTheme } from '../theme';

interface PillProps {
  children: string;
}

export default function Pill({ children }: PillProps) {
  const { colors } = useTheme() as CustomTheme;
  return (
    <Text
      variant="bodySmall"
      style={{
        paddingInline: 12,
        paddingBlock: 4,
        backgroundColor: colors.blue,
        borderRadius: 12,
        color: 'white',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Text>
  );
}
