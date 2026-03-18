import React from 'react';
import { View } from 'react-native';
import { useTheme, TextInput, Text, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createUser } from '@cwt/auth/createUser';
import { AuthSignUpSchema, type AuthSignUp } from '@cwt/schema/forms';

import { CustomTheme } from '../theme';

import { supabase } from '../services/supabaseClient';

export default function SignupScreen() {
  const theme = useTheme() as CustomTheme;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSignUp>({
    resolver: zodResolver(AuthSignUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignUp = async ({
    email,
    password,
  }: Pick<AuthSignUp, 'email' | 'password'>) => {
    const user = await createUser(supabase, email, password);
    console.log('User:', user);
  };

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
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType="email-address"
            value={value}
            error={typeof errors?.email?.message === 'string'}
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text style={{ color: theme.colors.errorLight }}>
          {errors?.email?.message}
        </Text>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            error={typeof errors?.password?.message === 'string'}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={{ color: theme.colors.errorLight }}>
          {errors?.password?.message}
        </Text>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Confirm Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            error={typeof errors?.confirmPassword?.message === 'string'}
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && (
        <Text style={{ color: theme.colors.errorLight }}>
          {errors?.confirmPassword?.message}
        </Text>
      )}
      <Button
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={handleSubmit((d) => handleSignUp(d))}
      >
        Sign Up
      </Button>
    </View>
  );
}
