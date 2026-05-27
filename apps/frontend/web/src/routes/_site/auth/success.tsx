import { createFileRoute, Link } from '@tanstack/react-router';
import { Title, Text, Container, Stack, Button } from '@mantine/core';

import { useAuthStore } from '@cwt/state/stores';

import { useDefaultSize } from '../../../hooks';

export const Route = createFileRoute('/_site/auth/success')({
  component: SuccessView,
});

function SuccessView() {
  const user = useAuthStore((state) => state.user);
  const defaultSize = useDefaultSize();

  if (user && !user.user_metadata.email_verified) {
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
            Check your inbox
          </Title>
          <Text fw={500} fz={defaultSize} c="dark.3" mt={-12} ta="center">
            We've sent a confirmation link to {user.email}. Click the link in
            that email to verify your account and get started.
          </Text>
        </Stack>
      </Container>
    );
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
          The message has expired
        </Title>
        <Stack align="center" mt="lg">
          <Button
            component={Link}
            to="/auth/login"
            type="button"
            size={defaultSize}
            variant="transparent"
          >
            Go to login
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
