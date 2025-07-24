import { View } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';

export default function OnboardingComplete() {
  const theme = useTheme();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 16,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="displayLarge">Welcome User!</Text>
      <Text
        variant="bodyLarge"
        style={{ textAlign: 'center', marginBottom: 16 }}
      >
        Congratulations! Your profile is set up.
      </Text>
      <Button
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={() => console.log('Go to Dashboard')}
      >
        Log In
      </Button>
    </View>
  );
}
