import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

// eslint-disable-next-line import/no-unresolved
import { signOut } from '@cwt/auth/signOut';
import { useAuthStore } from '@cwt/state/auth';
import { getProtectedData } from '@cwt/api/protectedData';

import { supabase } from '../services/supabaseClient';

export default function SettingsScreen() {
  const theme = useTheme();
  const session = useAuthStore((state) => state.session);

  const handleLogOut = async () => {
    await signOut(supabase);
  };

  useEffect(() => {
    console.log('Fetching data from protected route in settings...');
    const baseUrl = 'http://192.168.1.12:8000';

    const asyncFetchProtectedData = async () => {
      if (session) {
        await getProtectedData(baseUrl, session.access_token);
      }
    };
    asyncFetchProtectedData();
  }, [session]);

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
