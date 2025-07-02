import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function SettingsScreen() {
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
      <Text>Settings Screen</Text>
      <Text>This page will contain the app settings.</Text>
    </View>
  );
}
