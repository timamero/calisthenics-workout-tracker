import { Link } from '@tanstack/react-router';
import {
  // Container,
  Stack,
  Group,
  Box,
  Text,
  Title,
  Badge,
  Paper,
  // SimpleGrid,
  // Divider,
  // Alert,
  // ThemeIcon,
  Button,
  useMatches,
} from '@mantine/core';

// import {
//   IoInformationCircleOutline,
//   IoSwapVertical,
//   IoTimeOutline,
//   IoServerOutline,
//   IoLayersOutline,
// } from 'react-icons/io5';

import { useDefaultSize } from '../../../hooks';

function PhysicsCallout() {
  const lines = [
    { eq: 'τ = r × F', label: 'torque = moment arm × force' },
    { eq: 'F = mg', label: 'force = mass × gravity' },
    { eq: 'You = F', label: 'you are the load' },
  ];

  const alignValue = useMatches({ base: 'flex-start', xs: 'flex-end' });
  return (
    <Stack gap="sm" align={alignValue}>
      {lines.map(({ eq, label }) => (
        <Box key={eq} ta={{ base: 'left', xs: 'right' }}>
          <Text
            ff="monospace"
            fz="xsplus"
            fw={600}
            c="dark.4"
            lh="xxs"
            style={(theme) => ({
              letterSpacing: theme.other.letterSpacing.wider,
            })}
          >
            {eq}
          </Text>
          <Text
            fz="xxs"
            fw={400}
            c="dark.3"
            lh="xs"
            style={(theme) => ({
              letterSpacing: theme.other.letterSpacing.wide,
            })}
          >
            {label}
          </Text>
        </Box>
      ))}
    </Stack>
  );
}

export default function Hero() {
  return (
    <Paper withBorder radius="lg" p="xl" mb="xl">
      <Stack gap="lg">
        <Group justify="flex-end" align="center" wrap="wrap" gap="sm">
          <Group gap="xs" wrap="wrap">
            <Badge
              ff="monospace"
              color="violet.9"
              bg="violet.0"
              variant="light"
              size={useDefaultSize()}
              radius="xl"
            >
              Early Access — v0.1.0-alpha.1
            </Badge>
            <Badge
              ff="monospace"
              color="dark.4"
              variant="light"
              size={useDefaultSize()}
              radius="xl"
            >
              Calisthenics
            </Badge>
            <Badge
              ff="monospace"
              color="dark.4"
              variant="light"
              size={useDefaultSize()}
              radius="xl"
            >
              Bodyweight
            </Badge>
          </Group>
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
              Torque.
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
          <PhysicsCallout />
        </Group>

        {/* Intro */}
        <Text fz="sm" c="dark.3" lh="xxl" maw={520} fw={300}>
          Calisthenics is physics made personal. Every pull-up, dip, and push-up
          is your body generating rotational force —{' '}
          <Text component="span" fw={500} c="var(--mantine-color-text)" inherit>
            torque
          </Text>{' '}
          — against gravity, with nothing but your own mass as the load. Torque
          is the app built for that. Log your workouts, track your sessions, and
          build a training history from day one. No barbell. No membership. Just
          force.
        </Text>
        <Group align="center" justify="flex-start" gap="md" w="100%">
          <Button
            component={Link}
            to="/signup"
            variant="filled"
            size={useDefaultSize()}
            radius="md"
          >
            Sign Up
          </Button>
          <Button
            component={Link}
            to="/login"
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
