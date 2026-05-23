import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Text } from '../../../../../../customText';
import { CustomTheme } from '../../../../../../theme';

interface ExerciseSetGroupItemUIProps {
  setsLength: number;
  setNumber: number;
  children: ReactNode;
}

export default function ExerciseSetGroupItemUI({
  setsLength,
  setNumber,
  children,
}: ExerciseSetGroupItemUIProps) {
  const theme = useTheme() as CustomTheme;
  return (
    <View
      style={{
        width: 320,
        paddingTop: 8,
        margin: 0,
        borderWidth: 0,
        borderBottomWidth: setsLength === setNumber ? 0 : 1,
        borderColor: theme.colors.gray3,
        borderRadius: 0,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        <Text
          variant="titleMedium"
          style={{
            color: theme.colors.onBackground,
          }}
        >
          Set {setNumber}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {children}
        </View>
      </View>
    </View>
  );
}
