import React from 'react';
import { View } from 'react-native';
import { useTheme, TextInput, Text, Button } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { useAuthLoginMobile } from '@cwt/hooks';

import { CustomTheme } from '../theme';
import { supabase } from '../services/supabaseClient';

export default function LoginScreen() {
  const theme = useTheme() as CustomTheme;

  const auth = useAuthLoginMobile(supabase);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 16,
        paddingHorizontal: 16,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="displaySmall" style={{ color: theme.colors.light }}>
        Log In
      </Text>
      <Controller
        control={auth.control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={typeof auth.errors?.email?.message === 'string'}
          />
        )}
        name="email"
      />
      {auth.errors.email && (
        <Text style={{ color: theme.colors.errorLight }}>
          {auth.errors?.email?.message}
        </Text>
      )}
      <Controller
        control={auth.control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            error={typeof auth.errors?.password?.message === 'string'}
          />
        )}
        name="password"
      />
      {auth.errors.password && (
        <Text style={{ color: theme.colors.errorLight }}>
          {auth.errors?.password?.message}
        </Text>
      )}
      <Button
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={auth.handleSubmit}
      >
        Log In
      </Button>
    </View>
  );
}
