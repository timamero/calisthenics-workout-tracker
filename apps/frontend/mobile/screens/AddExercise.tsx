import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function AddExerciseScreen() {
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
      <Text>Add Exercise Screen</Text>
      <Text>This page will display the Add Exercise content.</Text>
    </View>
  );
}
