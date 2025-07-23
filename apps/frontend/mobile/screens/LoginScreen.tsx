import { View, Button } from 'react-native';
import { useTheme, TextInput, Text } from 'react-native-paper';

export default function LoginScreen() {
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
      <Text variant="displayLarge">Log In</Text>
      <TextInput label="Email" />
      <TextInput label="Email" />
      <Button
        title="Log In"
        onPress={() => console.log('Navigate to Log In')}
      />
    </View>
  );
}
