import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme, TextInput, Text, Button } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { siteContent } from '@cwt/content';
import { useAuthLoginMobile } from '@cwt/hooks';

import { CustomTheme } from '../theme';
import { supabase } from '../services/supabaseClient';

export default function LoginScreen() {
  // --- UI Hooks ---
  const theme = useTheme() as CustomTheme;

  // --- Logic Hooks ---
  const auth = useAuthLoginMobile(supabase);

  // --- Local State ---
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  // --- Handlers ---
  const handleSubmitPress = (e: React.BaseSyntheticEvent) => {
    if (auth.authError) {
      auth.clearError();
    }

    auth.handleSubmit(e);
  };

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
        <Text variant="headlineMedium">{siteContent().loginHeading}</Text>
        <Text variant="bodyLarge">{siteContent().loginSubtext}</Text>
      </View>
      <Controller
        control={auth.control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={typeof auth.errors.email?.message === 'string'}
          />
        )}
        name="email"
      />
      {auth.errors.email && (
        <Text style={{ color: theme.colors.error }}>
          {auth.errors.email?.message}
        </Text>
      )}
      <Controller
        control={auth.control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
            right={
              <TextInput.Icon
                icon={isPasswordVisible ? 'eye' : 'eye-off'}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            }
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={!isPasswordVisible}
            error={typeof auth.errors.password?.message === 'string'}
          />
        )}
        name="password"
      />
      {auth.errors.password && (
        <Text style={{ color: theme.colors.error }}>
          {auth.errors.password?.message}
        </Text>
      )}
      {auth.authError && (
        <Text style={{ color: theme.colors.error }}>{auth.authError}</Text>
      )}
      <Button
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={handleSubmitPress}
        disabled={
          auth.isLoading || auth.errors.email || auth.errors.password
            ? true
            : false
        }
      >
        Log In
      </Button>
    </View>
  );
}
