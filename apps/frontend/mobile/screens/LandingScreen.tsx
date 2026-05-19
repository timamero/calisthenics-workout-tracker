import { View } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { CustomTheme } from '../theme';

export default function LandingScreen() {
  const theme = useTheme() as CustomTheme;
  const navigation = useNavigation<any>();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 16,
        paddingHorizontal: 16,
        paddingBlock: 16,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingHorizontal: 16,
          paddingBlock: 16,
        }}
      >
        <Text
          variant="headlineLarge"
          style={{ color: theme.colors.onBackground }}
        >
          Torque
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
          <Text
            style={{
              color: theme.colors.dark2,
              fontFamily: 'Manrope-Bold',
              textTransform: 'uppercase',
              fontSize: 20,
              lineHeight: 22,
              letterSpacing: 0.64,
            }}
          >
            Generate force.
          </Text>
          <Text
            style={{
              color: theme.colors.onBackground,
              fontFamily: 'Manrope-Bold',
              textTransform: 'uppercase',
              fontSize: 20,
              lineHeight: 22,
              letterSpacing: 0.64,
            }}
          >
            Anywhere.
          </Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            paddingHorizontal: 16,
            paddingBlock: 16,
            justifyContent: 'center',
            transform: 'translateY(-40px)',
          }}
        >
          <Text
            variant="headlineMedium"
            style={{ color: theme.colors.onBackground }}
          >
            Sign Up or Log In
          </Text>
          <Button
            mode="contained"
            buttonColor={theme.colors.primary}
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
      </View>
    </View>
  );
}
