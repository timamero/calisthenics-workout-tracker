import { View } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function LandingScreen() {
  const theme = useTheme();
  const navigation = useNavigation<any>();

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
        onPress={() => navigation.navigate('Signup')}
      >
        Sign Up
      </Button>
      <Button
        mode="outlined"
        textColor={theme.colors.outline}
        onPress={() => navigation.navigate('Login')}
      >
        Log In
      </Button>
    </View>
  );
}
