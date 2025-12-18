import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '../../../../../../customText';

interface ExerciseSetUIProps {
  exerciseName: string;
  children: ReactNode;
}

export default function ExerciseSetUI({
  exerciseName,
  children,
}: ExerciseSetUIProps) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text>{exerciseName}</Text>
      {children}
    </View>
  );
}
