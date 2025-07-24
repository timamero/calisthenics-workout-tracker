import { View } from 'react-native';
import { useTheme, TextInput, Text, Button } from 'react-native-paper';

export default function SignupScreen() {
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
      <Text variant="displaySmall">Sign Up</Text>
      <TextInput label="Email" />
      <TextInput label="Password" />
      <TextInput label="Confirm Password" />
      <Button
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={() => console.log('Press to Sign Up')}
      >
        Sign Up
      </Button>
    </View>
  );
}
