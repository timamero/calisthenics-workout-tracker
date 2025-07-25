import { View } from 'react-native';
import { useTheme, TextInput, Text, Button } from 'react-native-paper';
import { supabase } from '../services/supabaseClient';
import React, { useState } from 'react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 16,
        paddingHorizontal: 16,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="displaySmall">Log In</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={() => console.log('Navigate to Log In')}
      >
        Log In
      </Button>
    </View>
  );
}
