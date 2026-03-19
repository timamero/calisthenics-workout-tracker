import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme, TextInput, Text, Button } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { useAuthSignUpMobile } from '@cwt/hooks';

import { CustomTheme } from '../theme';

import { supabase } from '../services/supabaseClient';

export default function SignupScreen() {
  const theme = useTheme() as CustomTheme;

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const auth = useAuthSignUpMobile(supabase);

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
        Sign Up
      </Text>
      <Controller
        control={auth.control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType="email-address"
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
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            }
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={!isPasswordVisible}
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
      <Controller
        control={auth.control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Confirm Password"
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
              />
            }
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={!isConfirmPasswordVisible}
            error={typeof auth.errors?.confirmPassword?.message === 'string'}
          />
        )}
        name="confirmPassword"
      />
      {auth.errors.confirmPassword && (
        <Text style={{ color: theme.colors.errorLight }}>
          {auth.errors?.confirmPassword?.message}
        </Text>
      )}
      <Button
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={auth.handleSubmit}
      >
        Sign Up
      </Button>
    </View>
  );
}
