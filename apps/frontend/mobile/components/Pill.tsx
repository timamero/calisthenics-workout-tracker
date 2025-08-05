import { Text, useTheme } from 'react-native-paper';
// import { View } from 'react-native';

import { CustomTheme } from '../theme';

export enum sizeTypes {
  sm = 'sm',
  lg = 'lg',
}

interface PillProps {
  children: string;
  size?: sizeTypes;
}

export default function Pill({ size = sizeTypes.sm, children }: PillProps) {
  const { colors } = useTheme() as CustomTheme;

  const textSize = size === sizeTypes.sm ? 12 : 14;
  return (
    <Text
      style={{
        paddingInline: 12,
        paddingBlock: 4,
        backgroundColor: colors.blue,
        borderRadius: 12,
        fontSize: textSize,
        color: 'white',
      }}
    >
      {children}
    </Text>
  );
}
