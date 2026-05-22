import { View } from 'react-native';
import { useTheme, ActivityIndicator } from 'react-native-paper';

import { loaderContent } from '@cwt/content';

import { Text } from '../customText';
import { CustomTheme } from '../theme';

export default function DefaultLoaderScreen() {
  const theme = useTheme() as CustomTheme;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        backgroundColor: theme.colors.background,
      }}
    >
      <ActivityIndicator animating={true} color={theme.colors.lime4} />
      <Text
        variant="headlineSmall"
        style={{ color: theme.colors.onBackground }}
      >
        {loaderContent().loadingAppMessage}
      </Text>
    </View>
  );
}
