import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Text } from '../../../../../../customText';
import { CustomTheme } from '../../../../../../theme';

interface ExerciseSetGroupItemUIProps {
  setNumber: number;
  children: ReactNode;
}

export default function ExerciseSetGroupItemUI({
  setNumber,
  children,
}: ExerciseSetGroupItemUIProps) {
  const theme = useTheme() as CustomTheme;

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text
        variant="bodySmall"
        style={{
          color: theme.colors.light,
          fontWeight: 600,
        }}
      >
        Set {setNumber}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {children}
      </View>
    </View>
  );
}
