import { View } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';

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
      <Text variant="displayLarge">Sign Up or Log In</Text>
      <Button
        mode="contained"
        buttonColor="tomato"
        onPress={() => console.log('Navigate to Sign Up')}
      >
        Sign Up
      </Button>
      <Button
        mode="outlined"
        buttonColor="tomato"
        textColor={theme.colors.outline}
        onPress={() => console.log('Navigate to Log In')}
      >
        Log In
      </Button>
    </View>
  );
}
