import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  Title,
  Text,
  Stack,
  Loader,
  Container,
} from '@mantine/core';
import { Link, useNavigate } from '@tanstack/react-router';

import { useAuthLogin } from '@cwt/hooks';
import { useAuthStore } from '@cwt/state/stores';

import { supabase } from '../../services/supabaseClient';

export const Route = createFileRoute('/_site/login')({
  component: LoginView,
});

function LoginView() {
  // --- UI Hooks ---
  const navigate = useNavigate();

  // --- Logic Hooks ---
  const auth = useAuthLogin(supabase);
  const user = useAuthStore((state) => state.user);

  // --- Local State ---
  const [loading, setLoading] = useState(true);

  // --- Handlers ---
  const handleSubmitClick = () => {
    if (auth.authError) {
      auth.clearError();
    }
  };

  // --- Effects ---
  useEffect(() => {
    if (user) {
      navigate({
        to: '/dashboard',
      });
    }
    setLoading(false);
  }, [user, navigate]);

  if (loading || user) {
    return (
      <Stack align="center" justify="center" h="100vh">
        <Stack align="center">
          <Text ff="heading" fz="xl" fw={700}>
            Welcome back! Fetching your data now…
          </Text>
        </Stack>

        <Stack mt={40}>
          <Loader color="lime" />;
        </Stack>
      </Stack>
    );
  }

  return (
    <Container py="xl">
      <Stack align="center" w="100%">
        <Title
          order={1}
          mb="md"
          fz={{ base: 'h3', md: 'h2' }}
          style={(theme) => ({
            letterSpacing: theme.other.letterSpacing.tight,
            textAlign: 'center',
          })}
        >
          Every session counts. Pick up where you left off.
        </Title>
      </Stack>
      <Box maw={400} mx="auto" mt="lg">
        <form onSubmit={auth.handleSubmit}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            size="md"
            mb="md"
            error={auth.errors.email?.message}
            {...auth.register('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            size="md"
            mb="md"
            error={auth.errors.password?.message}
            {...auth.register('password')}
          />
          {auth.authError && <Text c="red">{auth.authError}</Text>}
          <Group mt="lg" justify="flex-end">
            <Button
              component={Link}
              to="/"
              type="button"
              size="md"
              variant="transparent"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="filled"
              size="md"
              onClick={handleSubmitClick}
              disabled={
                auth.isLoading || auth.errors.email || auth.errors.password
                  ? true
                  : false
              }
            >
              Log In
            </Button>
          </Group>
        </form>
      </Box>
    </Container>
  );
}
