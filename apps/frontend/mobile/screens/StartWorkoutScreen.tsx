import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function StartWorkoutScreen() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
      }}
    >
      <Text>Start Workout Screen</Text>
      <Text>
        This page is the starting point for a workout. The user will be able to
        start from a blank slate or start a workout from a template.
      </Text>
    </View>
  );
}
