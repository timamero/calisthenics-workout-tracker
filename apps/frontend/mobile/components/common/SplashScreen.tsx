import { View, Text } from 'react-native';
import { useTheme, ActivityIndicator } from 'react-native-paper';

export default function SplashScreen() {
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
      <Text>Checking Credentials</Text>
      <ActivityIndicator animating={true} color={theme.colors.primary} />
    </View>
  );
}
