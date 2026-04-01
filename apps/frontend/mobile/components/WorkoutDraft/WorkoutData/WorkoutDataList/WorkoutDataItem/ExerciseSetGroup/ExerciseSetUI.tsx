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
      }}
    >
      <Text
        style={{
          color: theme.colors.light,
          fontWeight: 800,
          // textAlign: 'center',
        }}
      >
        {exerciseName}
      </Text>
      {children}
    </View>
  );
}
