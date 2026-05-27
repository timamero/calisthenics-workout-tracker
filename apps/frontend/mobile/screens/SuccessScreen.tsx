import { View } from 'react-native';
import { useTheme, Text, ActivityIndicator } from 'react-native-paper';

import { useAuthStore } from '@cwt/state/stores';

import { CustomTheme } from '../theme';
import CustomButton from '../components/common/CustomButton';

export default function SuccessScreen() {
  // --- UI Hooks ---
  const theme = useTheme() as CustomTheme;

  // --- Logic Hooks ---
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 16,
        paddingHorizontal: 32,
        paddingTop: 32,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={{ paddingBottom: 16 }}>
        {user && !user.user_metadata.email_verified && !loading ? (
          <>
            <Text variant="headlineMedium">Check your inbox</Text>
            <Text variant="bodyLarge">
              We&apos;ve sent a confirmation link to {user.email}. Click the
              link in that email to verify your account and get started.
            </Text>
          </>
        ) : loading ? (
          <ActivityIndicator animating={true} color={theme.colors.lime4} />
        ) : (
          <>
            <Text variant="headlineMedium">The message has expired</Text>
            <CustomButton onPress={() => console.log('pressed go to login')}>
              Go to login
            </CustomButton>
          </>
        )}
      </View>
    </View>
  );
}
