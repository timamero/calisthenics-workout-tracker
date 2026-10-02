import { Link } from '@tanstack/react-router';
import {
  Stack,
  Group,
  Box,
  Text,
  Title,
  Badge,
  Paper,
  Button,
} from '@mantine/core';

import { useDefaultSize } from '../../../hooks';

export default function Hero() {
  return (
    <Paper
      withBorder
      radius="lg"
      p="xl"
      mb="xl"
      bg="radial-gradient(circle at 50% 50%, var(--mantine-color-lime-0), var(--mantine-color-elevation-3) 100%)"
    >
      <Stack gap="lg">
        <Group justify="flex-end" align="center" wrap="wrap" gap="sm">
          <Badge
            ff="monospace"
            color="violet.9"
            bg="transparent"
            variant="light"
            size={useDefaultSize()}
            radius="xl"
          >
            Early Access — v0.1.0-alpha.4
          </Badge>
        </Group>

        {/* Wordmark + physics */}
        <Group align="flex-end" justify="space-between" gap="xl" wrap="wrap">
          <Box>
            <Title
              order={1}
              fz={{
                base: 'display_md',
                sm: 'display_lg',
              }}
              lh="xxs"
              mb={8}
              style={(theme) => ({
                letterSpacing: theme.other.letterSpacing.tight,
              })}
            >
              Torque Fit.
            </Title>
            <Text
              fz={{ base: 'xl', sm: 'xxl' }}
              fw={700}
              tt="uppercase"
              c="dark.2"
              style={(theme) => ({
                letterSpacing: theme.other.letterSpacing.wide,
              })}
            >
              Generate force.{' '}
              <Text component="span" c="var(--mantine-color-text)" inherit>
                Anywhere.
              </Text>
            </Text>
          </Box>
        </Group>

        {/* Intro */}
        <Text fz="sm" c="dark.3" lh="xxl" maw={520} fw={300}>
          Calisthenics is physics made personal. Every pull-up, dip, and push-up
          is your body generating force —{' '}
          <Text component="span" fw={500} c="var(--mantine-color-text)" inherit>
            torque
          </Text>{' '}
          — against gravity, with nothing but your own mass as the load. Torque
          Fit is the app built for that. Log your workouts, track your sessions,
          and build a training history from day one. No barbell. No machines.
          Just force.
        </Text>
        <Group align="center" justify="flex-start" gap="md" w="100%">
          <Button
            component={Link}
            to="/auth/signup"
            variant="filled"
            size={useDefaultSize()}
            radius="md"
          >
            Sign Up
          </Button>
          <Button
            component={Link}
            to="/auth/login"
            variant="outline"
            size={useDefaultSize()}
            radius="md"
          >
            Log In
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
