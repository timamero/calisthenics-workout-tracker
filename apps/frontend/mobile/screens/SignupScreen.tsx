import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme, TextInput, Text } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@cwt/state/stores';

import { siteContent } from '@cwt/content';
import { useAuthSignUpMobile } from '@cwt/hooks';

import { CustomTheme } from '../theme';
import { globalStyles } from '../styles/global';
import { supabase } from '../services/supabaseClient';

import CustomButton from '../components/common/CustomButton';

export default function SignupScreen() {
  // --- UI Hooks ---
  const navigation = useNavigation<any>();
  const theme = useTheme() as CustomTheme;

  // --- Logic Hooks ---
  const user = useAuthStore((state) => state.user);
  const auth = useAuthSignUpMobile(supabase);

  // --- Local State ---
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  // --- Styles ---
  const styles = globalStyles(theme);

  // --- Handlers ---
  const handleSubmitPress = (e: React.BaseSyntheticEvent) => {
    if (auth.authError) {
      auth.clearError();
    }

    auth.handleSubmit(e);
  };

  useEffect(() => {
    if (user) {
      navigation.navigate('Success');
    }
  }, [user, navigation]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ ...styles.container, gap: 16 }}
      >
        <View style={{ paddingBottom: 16 }}>
          <Text variant="headlineMedium">{siteContent().signupHeading}</Text>
          <Text variant="bodyLarge">{siteContent().signupSubtext}</Text>
        </View>
        <Controller
          control={auth.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Username"
              onBlur={onBlur}
              onChangeText={onChange}
              autoCapitalize="none"
              value={value}
              error={typeof auth.errors.username?.message === 'string'}
            />
          )}
          name="username"
        />
        {auth.errors.username && (
          <Text style={{ color: theme.colors.error }}>
            {auth.errors.username?.message}
          </Text>
        )}
        <Controller
          control={auth.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="First Name"
              onBlur={onBlur}
              onChangeText={onChange}
              autoCapitalize="words"
              value={value}
              error={typeof auth.errors.firstName?.message === 'string'}
            />
          )}
          name="firstName"
        />
        {auth.errors.firstName && (
          <Text style={{ color: theme.colors.error }}>
            {auth.errors.firstName?.message}
          </Text>
        )}
        <Controller
          control={auth.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Last Name"
              onBlur={onBlur}
              onChangeText={onChange}
              autoCapitalize="words"
              value={value}
              error={typeof auth.errors.lastName?.message === 'string'}
            />
          )}
          name="lastName"
        />
        {auth.errors.lastName && (
          <Text style={{ color: theme.colors.error }}>
            {auth.errors.lastName?.message}
          </Text>
        )}
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
              autoCapitalize="none"
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
        <Controller
          control={auth.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Confirm Password"
              right={
                <TextInput.Icon
                  icon={isConfirmPasswordVisible ? 'eye' : 'eye-off'}
                  onPress={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                />
              }
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              secureTextEntry={!isConfirmPasswordVisible}
              error={typeof auth.errors.confirmPassword?.message === 'string'}
            />
          )}
          name="confirmPassword"
        />
        {auth.errors.confirmPassword && (
          <Text style={{ color: theme.colors.error }}>
            {auth.errors.confirmPassword?.message}
          </Text>
        )}
        {auth.authError && (
          <Text style={{ color: theme.colors.error }}>{auth.authError}</Text>
        )}
        <View style={{ paddingBottom: 120 }}>
          <CustomButton
            mode="contained"
            onPress={handleSubmitPress}
            disabled={
              auth.isLoading ||
              auth.errors.email ||
              auth.errors.password ||
              auth.errors.confirmPassword
                ? true
                : false
            }
          >
            Sign Up
          </CustomButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
