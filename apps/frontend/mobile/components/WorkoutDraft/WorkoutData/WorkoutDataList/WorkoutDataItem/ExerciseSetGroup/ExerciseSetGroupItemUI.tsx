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
        paddingInline: 8,
        paddingBlock: 8,
        // marginBlock: 32,
        // marginInline: 4,
        margin: 0,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: theme.colors.gray3,
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
          variant="headlineSmall"
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
