import { View } from 'react-native';
import { useTheme, TextInput, Text, Button } from 'react-native-paper';

export default function LoginScreen() {
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
      <Text variant="displayLarge">Log In</Text>
      <TextInput label="Email" />
      <TextInput label="Password" />
      <Button
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={() => console.log('Navigate to Log In')}
      >
        Log In
      </Button>
    </View>
  );
}
