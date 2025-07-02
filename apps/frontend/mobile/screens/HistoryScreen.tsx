import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function HistoryScreen() {
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
      <Text>History Screen</Text>
      <Text>This page will display the user&apos;s past workout logs.</Text>
    </View>
  );
}
