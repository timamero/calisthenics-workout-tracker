import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function LibraryScreen() {
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
      <Text>Library Screen</Text>
      <Text>
        This page will be the hub for exercises, progressions and progression
        exercises.
      </Text>
    </View>
  );
}
