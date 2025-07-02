import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function UserScreen() {
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
      <Text>User Profile Screen</Text>
      <Text>This page will display user information.</Text>
    </View>
  );
}
