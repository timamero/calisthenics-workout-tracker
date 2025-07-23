import { View, Text, Button } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function LandingScreen() {
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
      <Text>Sign Up or Log In</Text>
      <Button
        title="Sign Up"
        onPress={() => console.log('Navigate to Sign Up')}
      />
      <Button
        title="Log In"
        onPress={() => console.log('Navigate to Log In')}
      />
    </View>
  );
}
