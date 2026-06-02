import { Link } from '@tanstack/react-router';
import {
  Paper,
  Group,
  Box,
  Text,
  Title,
  Stack,
  Button,
  Alert,
  useMatches,
} from '@mantine/core';

import { IoInformationCircleOutline } from 'react-icons/io5';

import { useDefaultSize } from '../../../hooks';

export default function CallsToAction() {
  const smallFontSize = { base: 'xxs', md: 'xs' };
  const ctaTitleFontSize = { base: 'h3', md: 'h1' };
  const ctaAlignValue = useMatches({ base: 'flex-start', sm: 'flex-end' });
  const ctaWrapValue = useMatches({
    base: 'wrap',
    md: 'nowrap',
  }) as React.ComponentProps<typeof Group>['wrap'];

  return (
    <>
      <Paper withBorder radius="lg" p="xl" mb="xl">
        <Group
          justify="space-between"
          align="center"
          wrap={ctaWrapValue}
          gap="lg"
        >
          <Box maw={{ base: 420, md: 460 }}>
            <Title
              order={2}
              fz={ctaTitleFontSize}
              lh="xxs"
              mb="sm"
              style={(theme) => ({
                letterSpacing: theme.other.letterSpacing.tightest,
              })}
            >
              Your body is already the machine. Start using it.
            </Title>
            <Text fz="xsplus" c="dark.3" lh="lg" fw={300}>
              The Torque web app is free and ready to go — no download needed.
              Just open it and start logging.
            </Text>
          </Box>
          <Stack
            gap="xs"
            align={ctaAlignValue}
            w={{ base: '100%', sm: 'auto' }}
          >
            <Text
              fz={smallFontSize}
              fw={500}
              tt="uppercase"
              c="dark.3"
              style={(theme) => ({
                letterSpacing: theme.other.letterSpacing.wider,
              })}
            >
              Sign up or log in
            </Text>
            <Group
              align="center"
              justify="flex-start"
              gap="md"
              w="100%"
              wrap="nowrap"
            >
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
        </Group>
      </Paper>
      <Paper
        withBorder
        radius="lg"
        p="xl"
        style={{ border: '1px solid var(--mantine-color-violet-2)' }}
      >
        <Group
          justify="space-between"
          align="center"
          wrap={ctaWrapValue}
          gap="lg"
        >
          <Box maw={{ base: 420, md: 460 }}>
            <Title
              order={2}
              fz={ctaTitleFontSize}
              lh="xxs"
              mb="sm"
              style={(theme) => ({
                letterSpacing: theme.other.letterSpacing.tightest,
              })}
            >
              Want the mobile app?
            </Title>
            <Text fz="xsplus" c="dark.3" lh="lg" fw={300}>
              The Android app is currently in invite-only testing. To request
              access, send us an email and we'll add you to the list.
            </Text>
          </Box>
          <Stack
            gap="xs"
            align={ctaAlignValue}
            w={{ base: '100%', sm: 'auto' }}
          >
            <Text
              fz={smallFontSize}
              fw={500}
              tt="uppercase"
              c="dark.3"
              style={(theme) => ({
                letterSpacing: theme.other.letterSpacing.wider,
              })}
            >
              Request access at
            </Text>
            <Text
              fz="xs"
              fw={600}
              c="dark.3"
              style={(theme) => ({
                letterSpacing: theme.other.letterSpacing.wider,
              })}
            >
              info@torquefit.app
            </Text>
          </Stack>
        </Group>
      </Paper>
      <Alert
        icon={<IoInformationCircleOutline size={18} />}
        color="violet.9"
        bg="violet.0"
        radius="md"
        mb="xl"
      >
        <Text fz="xsplus" lh="xl">
          The mobile app is currently in internal testing. Invited users only.
          iOS availability coming in a future release.
        </Text>
      </Alert>
    </>
  );
}
