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
  Container,
} from '@mantine/core';
import { Link, useNavigate } from '@tanstack/react-router';

import { siteContent } from '@cwt/content';
import { useAuthLogin } from '@cwt/hooks';
import { useAuthStore } from '@cwt/state/stores';

import { supabase } from '../../services/supabaseClient';
import { useDefaultSize } from '../../hooks';

import DefaultLoader from '../../components/common/DefaultLoader';

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

  // --- Helper Components ---
  const defaultSize = useDefaultSize();

  if (loading || user) {
    return <DefaultLoader />;
  }

  return (
    <Container py="xl">
      <Stack align="center" w="100%" gap={0}>
        <Title
          order={1}
          mb="md"
          fz={{ base: 'h3', md: 'h2' }}
          lh="xxs"
          ta="center"
          style={(theme) => ({
            letterSpacing: theme.other.letterSpacing.tight,
          })}
        >
          {siteContent().loginHeading}
        </Title>
        <Text fw={500} fz={{ defaultSize }} c="dark.3" mt={-12} ta="center">
          {siteContent().loginSubtext}
        </Text>
      </Stack>
      <Box maw={400} mx="auto" mt="lg">
        <form onSubmit={auth.handleSubmit}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            size={defaultSize}
            mb="md"
            error={auth.errors.email?.message}
            {...auth.register('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            size={defaultSize}
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
              size={defaultSize}
              variant="transparent"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="filled"
              size={defaultSize}
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
