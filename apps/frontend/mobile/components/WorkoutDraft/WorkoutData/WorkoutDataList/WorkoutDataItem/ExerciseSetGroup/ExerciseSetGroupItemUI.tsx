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
        paddingInline: 16,
        paddingBlock: 16,
        marginBlock: 8,
        marginInline: 4,
        borderWidth: 1,
        borderColor: theme.colors.dark200,
        backgroundColor: theme.colors.dark900,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        <Text
          style={{
            color: theme.colors.dark200,
            fontWeight: 600,
          }}
        >
          Set {setNumber}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            // alignItems: 'center',
            // justifyContent: 'space-between',
          }}
        >
          {children}
        </View>
      </View>
    </View>
  );
}
