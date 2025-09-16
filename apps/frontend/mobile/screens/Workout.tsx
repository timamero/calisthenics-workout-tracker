import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { CustomTheme } from '../theme';
import { Text } from '../customText';

export default function WorkoutScreen() {
  const theme = useTheme() as CustomTheme;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="headlineLarge" style={{ color: theme.colors.light }}>
        Workout Page
      </Text>
    </View>
  );
}
