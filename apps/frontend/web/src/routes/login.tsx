import { createFileRoute } from '@tanstack/react-router';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  Title,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signIn } from '@cwt/auth/signIn';
import { AuthSchema, type Auth } from '@cwt/schema/forms';

import { supabase } from '../services/supabaseClient';

export const Route = createFileRoute('/login')({
  component: LoginView,
});

function LoginView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = async ({ email, password }: Auth) => {
    const user = await signIn(supabase, email, password);
    console.log('User:', user);
  };

  return (
    <Box maw={400} mx="auto" mt="xl">
      <Title order={2} mb="md">
        Log In
      </Title>
      <form onSubmit={handleSubmit((d) => handleSignIn(d))}>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          size="md"
          mb="md"
          error={errors?.email?.message}
          {...register('email')}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          size="md"
          mb="md"
          error={errors?.password?.message}
          {...register('password')}
        />
        <Group mt="md" right="0">
          <Button type="submit" size="md">
            Log In
          </Button>
        </Group>
      </form>
    </Box>
  );
}
