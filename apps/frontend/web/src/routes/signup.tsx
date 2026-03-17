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

import { createUser } from '@cwt/auth/createUser';
import { AuthSignUpSchema, type AuthSignUp } from '@cwt/schema/forms';

import { supabase } from '../services/supabaseClient';

export const Route = createFileRoute('/signup')({
  component: SignUpView,
});

function SignUpView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSignUp>({
    resolver: zodResolver(AuthSignUpSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSignUp = async ({
    email,
    password,
  }: Pick<AuthSignUp, 'email' | 'password'>) => {
    const user = createUser(supabase, email, password);
    console.log('User:', user);
  };
  return (
    <Box maw={400} mx="auto" mt="xl">
      <Title order={2} mb="md">
        Create A New Account
      </Title>
      <form onSubmit={handleSubmit((d) => handleSignUp(d))}>
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
        <PasswordInput
          label="Confirm Password"
          placeholder="Enter your password"
          size="md"
          mb="md"
          error={errors?.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Group mt="md" right="0">
          <Button type="submit" size="md">
            Sign Up
          </Button>
          <Button type="button" size="md" variant="subtle">
            Back
          </Button>
        </Group>
      </form>
    </Box>
  );
}
