import type { ReactNode } from 'react';
import { useTheme } from 'react-native-paper';
import { View } from 'react-native';

import { Text } from '../../../../../../customText';
import { CustomTheme } from '../../../../../../theme';

interface ExerciseSetUIProps {
  exerciseName: string;
  children: ReactNode;
}

export default function ExerciseSetUI({
  exerciseName,
  children,
}: ExerciseSetUIProps) {
  const theme = useTheme() as CustomTheme;
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <Text
        variant="headlineSmall"
        style={{
          color: theme.colors.onBackground,
          // fontWeight: 800,
          textAlign: 'center',
        }}
      >
        {exerciseName}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        {children}
      </View>
    </View>
  );
}
