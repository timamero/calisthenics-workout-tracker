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
        // paddingInline: 8,
        width: 320,
        paddingTop: 8,
        // marginBlock: 32,
        // marginInline: 4,
        margin: 0,
        borderWidth: 0,
        borderBottomWidth: setsLength === setNumber ? 0 : 1,
        borderColor: theme.colors.dark1,
        // backgroundColor: theme.colors.violet9,
        borderRadius: 0,
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
          variant="titleLarge"
          style={{
            color: theme.colors.onBackground,
            // fontWeight: 600,
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
