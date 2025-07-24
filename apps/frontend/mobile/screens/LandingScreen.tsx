import { View } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';

export default function LandingScreen() {
  const theme = useTheme();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 16,
        paddingHorizontal: 16,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="displaySmall">Sign Up or Log In</Text>
      <Button
        mode="contained"
        buttonColor="tomato"
        onPress={() => console.log('Navigate to Sign Up')}
      >
        Sign Up
      </Button>
      <Button
        mode="outlined"
        textColor={theme.colors.outline}
        onPress={() => console.log('Navigate to Log In')}
      >
        Log In
      </Button>
    </View>
  );
}
