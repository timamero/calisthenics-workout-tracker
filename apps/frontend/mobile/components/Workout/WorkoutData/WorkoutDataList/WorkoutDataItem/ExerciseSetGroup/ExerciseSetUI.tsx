import type { ReactNode } from 'react';
import { useTheme, Divider } from 'react-native-paper';
import { View } from 'react-native';

import { Text } from '../../../../../../customText';
import { CustomTheme } from '../../../../../../theme';

interface ExerciseSetUIProps {
  exerciseName: string;
  isLast: boolean;
  children: ReactNode;
}

export default function ExerciseSetUI({
  exerciseName,
  isLast,
  children,
}: ExerciseSetUIProps) {
  const theme = useTheme() as CustomTheme;
  return (
    <View>
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
      {!isLast && (
        <View style={{ marginInline: 32 }}>
          <Divider
            theme={{ colors: { outlineVariant: theme.colors.violet2 } }}
          />
        </View>
      )}
    </View>
  );
}
