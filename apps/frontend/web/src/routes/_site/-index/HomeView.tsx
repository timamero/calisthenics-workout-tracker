import { Link } from '@tanstack/react-router';
import {
  Container,
  Stack,
  Group,
  Box,
  Text,
  Title,
  Badge,
  Paper,
  SimpleGrid,
  Divider,
  Alert,
  ThemeIcon,
  Button,
  useMatches,
} from '@mantine/core';

import {
  IoInformationCircleOutline,
  IoSwapVertical,
  IoTimeOutline,
  IoServerOutline,
  IoLayersOutline,
} from 'react-icons/io5';

import { useDefaultSize } from '../../../hooks';

import Hero from './Hero';

// ─── Feature card ────────────────────────────────────────────────────────────

interface FeatureCardProps {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Paper
      withBorder
      radius="md"
      p="md"
      h="100%"
      style={{ border: '1px solid var(--mantine-color-lime-2)' }}
    >
      <Stack gap={8}>
        <ThemeIcon variant="light" color="lime" size="lg" radius="md">
          <Icon size={18} />
        </ThemeIcon>
        <Text fw={500} fz="sm">
          {title}
        </Text>
        <Text fz="xsplus" c="dark.3" lh="lg">
          {description}
        </Text>
      </Stack>
    </Paper>
  );
}

// ─── Roadmap card ────────────────────────────────────────────────────────────

function RoadmapCard({
  version,
  title,
  description,
  isCurrent,
}: {
  version: string;
  title: string;
  description: string;
  isCurrent: boolean;
}) {
  return (
    <Paper
      withBorder
      radius="md"
      p="md"
      h="100%"
      style={
        isCurrent
          ? { borderWidth: 2, borderColor: 'var(--mantine-color-lime-2)' }
          : {}
      }
    >
      <Stack gap={6}>
        {isCurrent ? (
          <Badge
            color="dark"
            bg="lime.2"
            variant="light"
            size="xs"
            radius="xl"
            w="fit-content"
          >
            Now — {version}
          </Badge>
        ) : (
          <Text
            fz="xxs"
            fw={500}
            tt="uppercase"
            c="dark.3"
            style={(theme) => ({
              letterSpacing: theme.other.letterSpacing.wider,
            })}
          >
            Coming — {version}
          </Text>
        )}
        <Text fw={500} fz="sm">
          {title}
        </Text>
        <Text fz="xs" c="dark.3" lh="lg">
          {description}
        </Text>
      </Stack>
    </Paper>
  );
}

// ─── Stat card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  value: string;
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <Paper radius="md" p="md" bg="lime.0">
      <Text
        fz="xxl"
        fw={700}
        lh="xxs"
        mb={4}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
      </Text>
      <Text fz="xs" c="dark.3" lh="xs">
        {label}
      </Text>
    </Paper>
  );
}

// ─── Main landing page ───────────────────────────────────────────────────────

export default function HomeView() {
  const smallFontSize = { base: 'xxs', md: 'xs' };
  const title2FontSize = { base: 'h2', md: 'display_xs' };
  const ctaTitleFontSize = { base: 'h3', md: 'h1' };
  const ctaAlignValue = useMatches({ base: 'flex-start', sm: 'flex-end' });
  const ctaWrapValue = useMatches({
    base: 'wrap',
    md: 'nowrap',
  }) as React.ComponentProps<typeof Group>['wrap'];

  const features = [
    {
      icon: IoServerOutline,
      title: 'Exercise library',
      description:
        '100+ predefined calisthenics exercises — push-ups, pull-ups, dips, squats, core work, and handstand progressions — searchable and ready to log.',
    },
    {
      icon: IoLayersOutline,
      title: 'Workout builder',
      description:
        'Build sessions with exercises, sets, reps, and timed holds. Organise with sections, supersets, and custom ordering.',
    },
    {
      icon: IoSwapVertical,
      title: 'Set progressions',
      description:
        "Track challenge and assist progressions — weighted vests, resistance bands, elevation changes — to log how you're making exercises harder or easier over time.",
    },
    {
      icon: IoTimeOutline,
      title: 'Workout history',
      description:
        'A chronological logbook of your completed sessions. Tap any past workout to review exactly what you did.',
    },
  ];

  const roadmap = [
    {
      version: 'alpha.1',
      title: 'Core logging',
      description:
        'Exercise library, workout builder, set progressions, supersets, and workout history.',
      isCurrent: true,
    },
    {
      version: 'alpha.2',
      title: 'Progressions library',
      description:
        'Predefined skill progressions — pull-up, pistol squat, front lever — with structured exercise paths. Plus onboarding, profile, and a calendar logbook view.',
      isCurrent: false,
    },
    {
      version: 'alpha.3',
      title: 'Progression tracking',
      description:
        "See your progress through each skill progression — completed steps, current exercises, and how far you've come.",
      isCurrent: false,
    },
    {
      version: 'alpha.4',
      title: 'AI workout generator',
      description:
        'Personalised workouts generated from your goals, fitness level, and available equipment — powered by AI.',
      isCurrent: false,
    },
  ];

  return (
    <Container size="md" pt="xl" pb="md">
      <Stack gap="xl">
        <Hero />

        {/* ── Alpha notice ─────────────────────────────────────────────── */}
        <Alert
          icon={<IoInformationCircleOutline size={18} />}
          color="violet.9"
          bg="violet.0"
          radius="md"
          mb="xl"
          title="This is an early alpha release."
        >
          <Text fz="xsplus" lh="xxl">
            You may encounter bugs, and workout data may not carry over between
            future releases if breaking changes are required. Your feedback
            during this phase directly shapes what Torque becomes — thank you
            for being part of it.
          </Text>
        </Alert>

        {/* ── What's in alpha.1 ────────────────────────────────────────── */}
        <Stack gap="md" mb="xl">
          <Box>
            <Text
              fz={smallFontSize}
              fw={500}
              tt="uppercase"
              c="dark.3"
              mb={6}
              style={(theme) => ({
                letterSpacing: theme.other.letterSpacing.widest,
              })}
            >
              What's in alpha.1
            </Text>
            <Title
              order={2}
              fz={title2FontSize}
              lh="xxs"
              style={(theme) => ({
                letterSpacing: theme.other.letterSpacing.tight,
              })}
            >
              Everything you need to start training
            </Title>
          </Box>
          <Text fz="sm" c="dark.3" lh="xxl" fw={300}>
            The first release focuses on the fundamentals — a solid exercise
            library, a flexible workout builder, and a logbook to track your
            sessions. The tools that matter most when you're getting started.
          </Text>
          <SimpleGrid cols={{ base: 1, xs: 2, sm: 4 }} spacing="sm">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </SimpleGrid>
        </Stack>

        <Divider />

        {/* ── The foundation ───────────────────────────────────────────── */}
        <Stack gap="md" mb="xl">
          <Box>
            <Text
              fz={smallFontSize}
              fw={500}
              tt="uppercase"
              c="dark.3"
              mb={6}
              style={(theme) => ({
                letterSpacing: theme.other.letterSpacing.widest,
              })}
            >
              The foundation
            </Text>
            <Title
              order={2}
              fz={title2FontSize}
              lh="xss"
              style={(theme) => ({
                letterSpacing: theme.other.letterSpacing.tight,
              })}
            >
              The most accessible gym ever built
            </Title>
          </Box>
          <Text fz="sm" c="dark.3" lh="xxl" fw={300}>
            A floor. A pull-up bar. A park bench. That's your gym — free, open
            24 hours, and never crowded.{' '}
            <Text
              component="span"
              fw={500}
              c="var(--mantine-color-text)"
              inherit
            >
              Bodyweight training works because physics doesn't care where you
              are.
            </Text>{' '}
            Gravity applies the same force whether you're in a boutique studio
            or your living room at 6am. Torque helps you harness that force and
            build a real training record from the ground up.
          </Text>
          <SimpleGrid cols={{ base: 1, xs: 3 }} spacing="sm">
            <StatCard
              value="0"
              label="Equipment required to start training today"
            />
            <StatCard
              value="100+"
              label="Exercises across push, pull, core, and legs"
            />
            <StatCard
              value="∞"
              label="Locations you can train — floor optional"
            />
          </SimpleGrid>
        </Stack>

        <Divider />

        {/* ── Roadmap ──────────────────────────────────────────────────── */}
        <Stack gap="md" mb="xl">
          <Box>
            <Text
              fz={smallFontSize}
              fw={500}
              tt="uppercase"
              c="dark.3"
              mb={6}
              style={(theme) => ({
                letterSpacing: theme.other.letterSpacing.widest,
              })}
            >
              What's coming
            </Text>
            <Title
              order={2}
              fz={title2FontSize}
              lh="xxs"
              style={(theme) => ({
                letterSpacing: theme.other.letterSpacing.tight,
              })}
            >
              The roadmap
            </Title>
          </Box>
          <Text fz="sm" c="dark.3" lh="xxl" fw={300}>
            Alpha.1 is the starting line. Here's where Torque is headed.
          </Text>
          <SimpleGrid cols={{ base: 1, xs: 2, sm: 4 }} spacing="sm">
            {roadmap.map((r) => (
              <RoadmapCard key={r.version} {...r} />
            ))}
          </SimpleGrid>
        </Stack>

        <Divider />

        {/* ── CTA ──────────────────────────────────────────────────────── */}
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
                info@torquefit.com
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

        <Divider />

        <Group>
          <Text
            fz={smallFontSize}
            fw={500}
            c="dark.3"
            style={(theme) => ({
              letterSpacing: theme.other.letterSpacing.wider,
            })}
          >
            &copy;{`${new Date().getFullYear()} Anne Camero Digital Studio`}
          </Text>
        </Group>
      </Stack>
    </Container>
  );
}
