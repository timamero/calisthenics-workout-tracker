import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Mode } from '@cwt/schema/workouts';
import { emptyWorkoutPlaceholderContent } from '@cwt/content';

import { CustomTheme } from '../../../theme';
import { Text } from '../../../customText';

export default function EmptyWorkoutPlaceholder({ mode }: { mode: Mode }) {
  const theme = useTheme() as CustomTheme;

  return (
    <View
      style={{
        borderColor: theme.colors.grey,
        borderWidth: 2,
        borderStyle: 'dashed',
        display: 'flex',
        alignItems: 'center',
        marginInline: 20,
        padding: 16,
        gap: 16,
      }}
    >
      <Text
        variant="bodyLarge"
        style={{
          color: theme.colors.light,
          fontWeight: 800,
          textAlign: 'center',
        }}
      >
        {emptyWorkoutPlaceholderContent(mode).heading}
      </Text>
      <Text style={{ color: theme.colors.light, textAlign: 'center' }}>
        {emptyWorkoutPlaceholderContent(mode).message}
      </Text>
    </View>
  );
}
