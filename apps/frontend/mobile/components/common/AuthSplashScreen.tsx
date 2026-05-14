import { View } from 'react-native';
import { useTheme, ActivityIndicator } from 'react-native-paper';

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';

export default function AuthSplashScreen() {
  const theme = useTheme() as CustomTheme;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text style={{ color: theme.colors.onBackground }}>
        Checking Credentials
      </Text>
      <ActivityIndicator animating={true} color={theme.colors.primary} />
    </View>
  );
}
