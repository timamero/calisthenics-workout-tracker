import { View, Text } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import { signOut } from '@cwt/auth';

import { supabase } from '../services/supabaseClient';

export default function SettingsScreen() {
  const theme = useTheme();

  const handleLogOut = async () => {
    await signOut(supabase);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
      }}
    >
      <Text>Settings Screen</Text>
      <Text>This page will contain the app settings.</Text>
      <Button
        mode="outlined"
        textColor={theme.colors.outline}
        onPress={() => handleLogOut()}
      >
        Log out
      </Button>
    </View>
  );
}
